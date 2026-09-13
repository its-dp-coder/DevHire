from sqlalchemy.orm import Session

from app.models.application import Application


def get_application_by_id(
    db: Session,
    application_id: int,
) -> Application | None:
    return (
        db.query(Application)
        .filter(Application.id == application_id)
        .first()
    )


def get_application_by_candidate_and_job(
    db: Session,
    candidate_id: int,
    job_id: int,
) -> Application | None:
    return (
        db.query(Application)
        .filter(
            Application.candidate_id == candidate_id,
            Application.job_id == job_id,
        )
        .first()
    )


def create_application(
    db: Session,
    application: Application,
) -> Application:
    db.add(application)
    db.commit()
    db.refresh(application)

    return application


def get_candidate_applications(
    db: Session,
    candidate_id: int,
) -> list[Application]:
    return (
        db.query(Application)
        .filter(Application.candidate_id == candidate_id)
        .order_by(Application.created_at.desc())
        .all()
    )


def get_job_applications(
    db: Session,
    job_id: int,
) -> list[Application]:
    return (
        db.query(Application)
        .filter(Application.job_id == job_id)
        .order_by(Application.created_at.desc())
        .all()
    )

def update_application_status(
    db: Session,
    application: Application,
    status: str,
) -> Application:
    application.status = status

    db.commit()
    db.refresh(application)

    return application