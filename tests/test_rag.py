import uuid

from app.models.candidate_profile import CandidateProfile
from app.models.company import Company
from app.models.job import Job
from app.models.user import User

from tests.conftest import TestingSessionLocal


def create_recruiter(client):
    email = f"rag-recruiter-{uuid.uuid4().hex}@example.com"

    response = client.post(
        "/auth/register",
        json={
            "full_name": "RAG Recruiter",
            "email": email,
            "password": "password123",
            "role": "recruiter",
        },
    )

    assert response.status_code == 201

    user_id = response.json()["id"]

    login_response = client.post(
        "/auth/login",
        json={
            "email": email,
            "password": "password123",
        },
    )

    assert login_response.status_code == 200

    return login_response.json()["access_token"], user_id


def create_candidate(client):
    email = f"rag-candidate-{uuid.uuid4().hex}@example.com"

    response = client.post(
        "/auth/register",
        json={
            "full_name": "Python Developer",
            "email": email,
            "password": "password123",
            "role": "candidate",
        },
    )

    assert response.status_code == 201

    user_id = response.json()["id"]

    db = TestingSessionLocal()

    try:
        profile = CandidateProfile(
            user_id=user_id,
            headline="Python Backend Developer",
            bio="Backend developer experienced with APIs and databases.",
            skills="Python, FastAPI, PostgreSQL, Redis",
            experience_years=3,
            education="B.Tech Computer Science",
            location="Delhi",
        )

        db.add(profile)
        db.commit()
    finally:
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


def test_ai_assistant_requires_authentication(client):
    response = client.post(
        "/ai/ask",
        json={"query": "Which jobs require Python?"},
    )

    assert response.status_code == 401


def test_ai_assistant_returns_relevant_job_context(client, monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "")

    token, recruiter_id = create_recruiter(client)

    db = TestingSessionLocal()

    try:
        company = Company(
            name=f"RAG Tech {uuid.uuid4().hex}",
            description="AI technology company",
            website="https://example.com",
            owner_id=recruiter_id,
        )

        db.add(company)
        db.commit()
        db.refresh(company)

        job = Job(
            title="Python Backend Developer",
            description="Build FastAPI backend services.",
            location="Remote",
            employment_type="full-time",
            experience_level="mid",
            required_skills="Python, FastAPI, PostgreSQL",
            company_id=company.id,
            created_by=recruiter_id,
            is_active=True,
        )

        db.add(job)
        db.commit()
    finally:
        db.close()

    response = client.post(
        "/ai/ask",
        headers={"Authorization": f"Bearer {token}"},
        json={"query": "Which jobs require Python?"},
    )

    assert response.status_code == 200

    data = response.json()

    assert "answer" in data
    assert "sources" in data
    assert len(data["sources"]) >= 1

    assert any(
        "Python Backend Developer" in source
        for source in data["sources"]
    )


def test_ai_assistant_returns_candidate_context(client, monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "")

    token = create_candidate(client)

    response = client.post(
        "/ai/ask",
        headers={"Authorization": f"Bearer {token}"},
        json={"query": "Which candidate has FastAPI skills?"},
    )

    assert response.status_code == 200

    data = response.json()

    assert "answer" in data
    assert "sources" in data
    assert len(data["sources"]) >= 1

    assert any(
        "FastAPI" in source
        for source in data["sources"]
    )


def test_ai_assistant_handles_no_relevant_context(client, monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "")

    token, _ = create_recruiter(client)

    response = client.post(
        "/ai/ask",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "query": "quantum underwater robots xyzunique"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["answer"] == (
        "I could not find relevant information in the hiring data."
    )

    assert data["sources"] == []