from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.company import Company
from app.models.job import Job
from app.repositories.job_repository import (
    create_job,
    get_job_by_id,
    get_jobs,
    get_jobs_by_company,
)
from app.schemas.job import JobCreate


def create_job_for_recruiter(
    db: Session,
    job_data: JobCreate,
    recruiter_id: int,
) -> Job:
    company = (
        db.query(Company)
        .filter(Company.owner_id == recruiter_id)
        .first()
    )

    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company not found",
        )

    job = Job(
        title=job_data.title,
        description=job_data.description,
        location=job_data.location,
        employment_type=job_data.employment_type,
        experience_level=job_data.experience_level,
        required_skills=job_data.required_skills,
        company_id=company.id,
        created_by=recruiter_id,
    )

    return create_job(db, job)


def get_job(
    db: Session,
    job_id: int,
) -> Job:
    job = get_job_by_id(db, job_id)

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )

    return job


def list_jobs(
    db: Session,
) -> list[Job]:
    return get_jobs(db)


def list_company_jobs(
    db: Session,
    company_id: int,
) -> list[Job]:
    return get_jobs_by_company(
        db,
        company_id,
    )