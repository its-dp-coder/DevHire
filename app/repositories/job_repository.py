from sqlalchemy.orm import Session

from app.models.job import Job


def get_job_by_id(
    db: Session,
    job_id: int,
) -> Job | None:
    return (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )


def create_job(
    db: Session,
    job: Job,
) -> Job:
    db.add(job)
    db.commit()
    db.refresh(job)

    return job


def get_jobs(
    db: Session,
) -> list[Job]:
    return (
        db.query(Job)
        .order_by(Job.created_at.desc())
        .all()
    )


def get_jobs_by_company(
    db: Session,
    company_id: int,
) -> list[Job]:
    return (
        db.query(Job)
        .filter(Job.company_id == company_id)
        .order_by(Job.created_at.desc())
        .all()
    )