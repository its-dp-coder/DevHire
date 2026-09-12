def test_register_user(client):
    response = client.post(
        "/auth/register",
        json={
            "full_name": "Test Candidate",
            "email": "candidate@example.com",
            "password": "StrongPassword123",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["full_name"] == "Test Candidate"
    assert data["email"] == "candidate@example.com"
    assert data["role"] == "candidate"
    assert "id" in data
    assert "created_at" in data
    assert "password" not in data
    assert "password_hash" not in data


def test_register_duplicate_email(client):
    user = {
        "full_name": "Test Candidate",
        "email": "duplicate@example.com",
        "password": "StrongPassword123",
    }

    first_response = client.post(
        "/auth/register",
        json=user,
    )

    second_response = client.post(
        "/auth/register",
        json=user,
    )

    assert first_response.status_code == 201
    assert second_response.status_code == 400
    assert second_response.json()["detail"] == "Email already registered"


def test_login_user(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Login Candidate",
            "email": "login@example.com",
            "password": "StrongPassword123",
        },
    )

    response = client.post(
        "/auth/login",
        json={
            "email": "login@example.com",
            "password": "StrongPassword123",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Wrong Password",
            "email": "wrong@example.com",
            "password": "StrongPassword123",
        },
    )

    response = client.post(
        "/auth/login",
        json={
            "email": "wrong@example.com",
            "password": "WrongPassword123",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"