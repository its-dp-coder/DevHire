from uuid import uuid4

from app.models.user import User


def register_user(client, email=None, role="candidate"):
    if email is None:
        email = f"{role}_{uuid4().hex}@example.com"

    response = client.post(
        "/auth/register",
        json={
            "full_name": f"Test {role}",
            "email": email,
            "password": "password123",
        },
    )

    assert response.status_code == 201

    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    from app.core.config import settings

    engine = create_engine(settings.test_database_url)
    SessionLocal = sessionmaker(bind=engine)

    db = SessionLocal()

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    user.role = role

    db.commit()
    db.close()

    login_response = client.post(
        "/auth/login",
        json={
            "email": email,
            "password": "password123",
        },
    )

    assert login_response.status_code == 200

    return login_response.json()["access_token"]


def create_recruiter_job(client):
    recruiter_token = register_user(
        client,
        role="recruiter",
    )

    company_response = client.post(
        "/companies",
        headers={
            "Authorization": f"Bearer {recruiter_token}",
        },
        json={
            "name": f"AI Matching Company {uuid4().hex}",
            "description": "Test company",
            "website": "https://example.com",
        },
    )

    assert company_response.status_code == 201

    company_id = company_response.json()["id"]

    job_response = client.post(
        "/jobs",
        headers={
            "Authorization": f"Bearer {recruiter_token}",
        },
        json={
            "title": "Python Backend Developer",
            "description": "Backend development role",
            "location": "Remote",
            "employment_type": "full-time",
            "experience_level": "mid",
            "required_skills": "Python, FastAPI, PostgreSQL, Redis",
            "company_id": company_id,
        },
    )

    assert job_response.status_code == 201

    return job_response.json()["id"]


def test_candidate_can_match_with_job(client):
    job_id = create_recruiter_job(client)

    candidate_token = register_user(
        client,
        role="candidate",
    )

    profile_response = client.post(
        "/candidate-profile",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "headline": "Python Developer",
            "bio": "Backend developer",
            "skills": "Python, FastAPI, PostgreSQL",
            "experience_years": 2,
            "education": "B.Tech",
            "location": "India",
        },
    )

    assert profile_response.status_code == 201

    response = client.get(
        f"/matching/jobs/{job_id}",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["match_score"] == 75.0

    assert set(data["matching_skills"]) == {
        "python",
        "fastapi",
        "postgresql",
    }


def test_candidate_without_profile_cannot_match(client):
    job_id = create_recruiter_job(client)

    candidate_token = register_user(
        client,
        role="candidate",
    )

    response = client.get(
        f"/matching/jobs/{job_id}",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
    )

    assert response.status_code == 404

    assert response.json()["detail"] == (
        "Candidate profile not found"
    )


def test_candidate_can_rank_jobs(client):
    recruiter_token = register_user(
        client,
        role="recruiter",
    )

    company_response = client.post(
        "/companies",
        headers={
            "Authorization": f"Bearer {recruiter_token}",
        },
        json={
            "name": f"Ranking Company {uuid4().hex}",
            "description": "Ranking test company",
            "website": "https://example.com",
        },
    )

    assert company_response.status_code == 201

    company_id = company_response.json()["id"]

    jobs = [
        {
            "title": f"Python Developer {uuid4().hex}",
            "description": "Python backend role",
            "location": "Remote",
            "employment_type": "full-time",
            "experience_level": "mid",
            "required_skills": "Python, FastAPI",
            "company_id": company_id,
        },
        {
            "title": f"Java Developer {uuid4().hex}",
            "description": "Java backend role",
            "location": "Remote",
            "employment_type": "full-time",
            "experience_level": "mid",
            "required_skills": "Java, Spring",
            "company_id": company_id,
        },
    ]

    for job in jobs:
        response = client.post(
            "/jobs",
            headers={
                "Authorization": f"Bearer {recruiter_token}",
            },
            json=job,
        )

        assert response.status_code == 201

    candidate_token = register_user(
        client,
        role="candidate",
    )

    profile_response = client.post(
        "/candidate-profile",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "headline": "Python Developer",
            "skills": "Python, FastAPI",
            "experience_years": 2,
        },
    )

    assert profile_response.status_code == 201

    response = client.get(
        "/matching/jobs",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) >= 2

    python_job = next(
        item
        for item in data
        if item["title"].startswith("Python Developer")
    )

    java_job = next(
        item
        for item in data
        if item["title"].startswith("Java Developer")
    )

    assert python_job["match_score"] == 100.0
    assert java_job["match_score"] == 0.0

    assert data.index(python_job) < data.index(java_job)


def test_matching_nonexistent_job_returns_404(client):
    candidate_token = register_user(
        client,
        role="candidate",
    )

    profile_response = client.post(
        "/candidate-profile",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "headline": "Developer",
            "skills": "Python",
            "experience_years": 1,
        },
    )

    assert profile_response.status_code == 201

    response = client.get(
        "/matching/jobs/999999",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
    )

    assert response.status_code == 404

    assert response.json()["detail"] == (
        "Active job not found"
    )