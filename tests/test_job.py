def test_recruiter_can_create_job(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Job Recruiter",
            "email": "jobrecruiter@devhire.com",
            "password": "StrongPassword123",
        },
    )

    from app.db.database import SessionLocal
    from app.models.user import User

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == "jobrecruiter@devhire.com"
    ).first()

    user.role = "recruiter"
    user_id = user.id

    db.commit()
    db.close()

    login_response = client.post(
        "/auth/login",
        json={
            "email": "jobrecruiter@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    company_response = client.post(
        "/companies",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "name": "DevHire Jobs",
            "description": "Hiring platform company",
        },
    )

    assert company_response.status_code == 201

    response = client.post(
        "/jobs",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "title": "Python Backend Developer",
            "description": "Build scalable backend APIs",
            "location": "Remote",
            "employment_type": "full-time",
            "experience_level": "mid",
            "required_skills": "Python, FastAPI, PostgreSQL, Docker",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["title"] == "Python Backend Developer"
    assert data["company_id"] == company_response.json()["id"]
    assert data["created_by"] == user_id
    assert data["is_active"] is True


def test_candidate_cannot_create_job(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Job Candidate",
            "email": "jobcandidate@devhire.com",
            "password": "StrongPassword123",
        },
    )

    login_response = client.post(
        "/auth/login",
        json={
            "email": "jobcandidate@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.post(
        "/jobs",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "title": "Backend Developer",
            "description": "Backend role",
            "location": "Remote",
            "employment_type": "full-time",
            "experience_level": "junior",
            "required_skills": "Python, FastAPI",
        },
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Insufficient permissions"


def test_authenticated_user_can_list_jobs(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Job List User",
            "email": "joblist@devhire.com",
            "password": "StrongPassword123",
        },
    )

    login_response = client.post(
        "/auth/login",
        json={
            "email": "joblist@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/jobs",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_job_by_id(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Get Job Recruiter",
            "email": "getjob@devhire.com",
            "password": "StrongPassword123",
        },
    )

    from app.db.database import SessionLocal
    from app.models.user import User

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == "getjob@devhire.com"
    ).first()

    user.role = "recruiter"

    db.commit()
    db.close()

    login_response = client.post(
        "/auth/login",
        json={
            "email": "getjob@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    client.post(
        "/companies",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "name": "Get Job Company",
            "description": "Company for job lookup",
        },
    )

    job_response = client.post(
        "/jobs",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "title": "FastAPI Developer",
            "description": "Develop APIs",
            "location": "Remote",
            "employment_type": "full-time",
            "experience_level": "mid",
            "required_skills": "Python, FastAPI",
        },
    )

    job_id = job_response.json()["id"]

    response = client.get(
        f"/jobs/{job_id}",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200
    assert response.json()["id"] == job_id


def test_get_nonexistent_job(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Missing Job User",
            "email": "missingjob@devhire.com",
            "password": "StrongPassword123",
        },
    )

    login_response = client.post(
        "/auth/login",
        json={
            "email": "missingjob@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/jobs/999999",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Job not found"