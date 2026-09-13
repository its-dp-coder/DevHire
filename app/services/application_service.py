from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.application import Application
from app.models.job import Job
from app.repositories.application_repository import (
    create_application,
    get_application_by_candidate_and_job,
    get_application_by_id,
    get_candidate_applications,
    get_job_applications,
    update_application_status,
)
from app.schemas.application import ApplicationCreate
from app.workers import enqueue_application_notification


def apply_for_job(
    db: Session,
    application_data: ApplicationCreate,
    candidate_id: int,
) -> Application:
    job = (
        db.query(Job)
        .filter(
            Job.id == application_data.job_id,
            Job.is_active.is_(True),
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Active job not found",
        )

    existing_application = (
        get_application_by_candidate_and_job(
            db,
            candidate_id,
            application_data.job_id,
        )
    )

    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already applied for this job",
        )

    application = Application(
        job_id=application_data.job_id,
        candidate_id=candidate_id,
        cover_letter=application_data.cover_letter,
        status="applied",
    )

    application = create_application(
        db,
        application,
    )

    enqueue_application_notification(
        application.id,
    )

    return application


def list_candidate_applications(
    db: Session,
    candidate_id: int,
) -> list[Application]:
    return get_candidate_applications(
        db,
        candidate_id,
    )


def list_job_applications(
    db: Session,
    job_id: int,
) -> list[Application]:
    return get_job_applications(
        db,
        job_id,
    )


def update_status(
    db: Session,
    application_id: int,
    recruiter_id: int,
    new_status: str,
) -> Application:
    allowed_statuses = {
        "applied",
        "reviewing",
        "shortlisted",
        "rejected",
        "hired",
    }

    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application status",
        )

    application = get_application_by_id(
        db,
        application_id,
    )

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

    if application.job.created_by != recruiter_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not manage this application",
        )

    return update_application_status(
        db,
        application,
        new_status,
    )