def test_recruiter_can_create_company(client):
    register_response = client.post(
        "/auth/register",
        json={
            "full_name": "Recruiter User",
            "email": "recruiter@devhire.com",
            "password": "StrongPassword123",
            "role": "recruiter",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "recruiter@devhire.com",
            "password": "StrongPassword123",
        },
    )

    assert login_response.status_code == 200

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
    assert data["description"] == "Technology company"
    assert data["website"] == "https://devhire.example.com/"
    assert data["owner_id"] == 1


def test_candidate_cannot_create_company(client):
    register_response = client.post(
        "/auth/register",
        json={
            "full_name": "Candidate User",
            "email": "companycandidate@devhire.com",
            "password": "StrongPassword123",
            "role": "candidate",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "companycandidate@devhire.com",
            "password": "StrongPassword123",
        },
    )

    assert login_response.status_code == 200

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
    register_response = client.post(
        "/auth/register",
        json={
            "full_name": "List User",
            "email": "listuser@devhire.com",
            "password": "StrongPassword123",
            "role": "candidate",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "listuser@devhire.com",
            "password": "StrongPassword123",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    response = client.get(
        "/companies",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200
    assert isinstance(response.json(), list)