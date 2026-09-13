def test_recruiter_can_create_company(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Recruiter User",
            "email": "recruiter@devhire.com",
            "password": "StrongPassword123",
        },
    )

    from app.db.database import SessionLocal
    from app.models.user import User

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == "recruiter@devhire.com"
    ).first()

    user.role = "recruiter"
    user_id = user.id

    db.commit()
    db.close()

    login_response = client.post(
        "/auth/login",
        json={
            "email": "recruiter@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.post(
        "/companies",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "name": "DevHire Technologies",
            "description": "Technology company",
            "website": "https://devhire.example.com",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "DevHire Technologies"
    assert data["owner_id"] == user_id


def test_candidate_cannot_create_company(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Candidate User",
            "email": "companycandidate@devhire.com",
            "password": "StrongPassword123",
        },
    )

    login_response = client.post(
        "/auth/login",
        json={
            "email": "companycandidate@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.post(
        "/companies",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "name": "Candidate Company",
            "description": "Should not be created",
        },
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Insufficient permissions"


def test_authenticated_user_can_list_companies(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "List User",
            "email": "listuser@devhire.com",
            "password": "StrongPassword123",
        },
    )

    login_response = client.post(
        "/auth/login",
        json={
            "email": "listuser@devhire.com",
            "password": "StrongPassword123",
        },
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/companies",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200
    assert isinstance(response.json(), list)