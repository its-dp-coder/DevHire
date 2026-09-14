def create_recruiter_and_job(client):
    register_response = client.post(
        "/auth/register",
        json={
            "full_name": "Application Recruiter",
            "email": "application.recruiter@devhire.com",
            "password": "StrongPassword123",
            "role": "recruiter",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "application.recruiter@devhire.com",
            "password": "StrongPassword123",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    company_response = client.post(
        "/companies",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "Application Company",
            "description": "Hiring company",
        },
    )

    assert company_response.status_code == 201

    job_response = client.post(
        "/jobs",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "title": "Python Developer",
            "description": "Backend development",
            "location": "Remote",
            "employment_type": "full-time",
            "experience_level": "mid",
            "required_skills": "Python, FastAPI, PostgreSQL",
        },
    )

    assert job_response.status_code == 201

    return token, job_response.json()["id"]


def create_candidate(client):
    register_response = client.post(
        "/auth/register",
        json={
            "full_name": "Application Candidate",
            "email": "application.candidate@devhire.com",
            "password": "StrongPassword123",
            "role": "candidate",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "application.candidate@devhire.com",
            "password": "StrongPassword123",
        },
    )

    assert login_response.status_code == 200

    return login_response.json()["access_token"]


def test_candidate_can_apply_for_job(client):
    recruiter_token, job_id = create_recruiter_and_job(client)
    candidate_token = create_candidate(client)

    response = client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "I am interested in this role.",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["job_id"] == job_id
    assert data["status"] == "applied"
    assert data["cover_letter"] == "I am interested in this role."


def test_candidate_cannot_apply_twice(client):
    recruiter_token, job_id = create_recruiter_and_job(client)
    candidate_token = create_candidate(client)

    first_response = client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "First application.",
        },
    )

    assert first_response.status_code == 201

    second_response = client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "Second application.",
        },
    )

    assert second_response.status_code == 400
    assert second_response.json()["detail"] == "Already applied for this job"


def test_recruiter_cannot_apply_for_job(client):
    recruiter_token, job_id = create_recruiter_and_job(client)

    response = client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {recruiter_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "Recruiter application.",
        },
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Insufficient permissions"


def test_candidate_can_view_own_applications(client):
    recruiter_token, job_id = create_recruiter_and_job(client)
    candidate_token = create_candidate(client)

    client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "My application.",
        },
    )

    response = client.get(
        "/applications/my",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
    )

    assert response.status_code == 200

    applications = response.json()

    assert any(
        application["job_id"] == job_id
        for application in applications
    )


def test_recruiter_can_view_job_applications(client):
    recruiter_token, job_id = create_recruiter_and_job(client)
    candidate_token = create_candidate(client)

    client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "Please consider my application.",
        },
    )

    response = client.get(
        f"/applications/job/{job_id}",
        headers={
            "Authorization": f"Bearer {recruiter_token}",
        },
    )

    assert response.status_code == 200

    applications = response.json()

    assert any(
        application["job_id"] == job_id
        for application in applications
    )


def test_recruiter_can_update_application_status(client):
    recruiter_token, job_id = create_recruiter_and_job(client)
    candidate_token = create_candidate(client)

    application_response = client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "I would love to join your team.",
        },
    )

    assert application_response.status_code == 201

    application_id = application_response.json()["id"]

    response = client.patch(
        f"/applications/{application_id}/status",
        headers={
            "Authorization": f"Bearer {recruiter_token}",
        },
        json={
            "status": "shortlisted",
        },
    )

    assert response.status_code == 200
    assert response.json()["status"] == "shortlisted"


def test_invalid_application_status_rejected(client):
    recruiter_token, job_id = create_recruiter_and_job(client)
    candidate_token = create_candidate(client)

    application_response = client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": job_id,
            "cover_letter": "Application.",
        },
    )

    assert application_response.status_code == 201

    application_id = application_response.json()["id"]

    response = client.patch(
        f"/applications/{application_id}/status",
        headers={
            "Authorization": f"Bearer {recruiter_token}",
        },
        json={
            "status": "random_status",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid application status"


def test_application_for_nonexistent_job_rejected(client):
    candidate_token = create_candidate(client)

    response = client.post(
        "/applications",
        headers={
            "Authorization": f"Bearer {candidate_token}",
        },
        json={
            "job_id": 999999,
            "cover_letter": "Application.",
        },
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Active job not found"