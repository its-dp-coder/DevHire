from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.permissions import require_role
from app.db.database import get_db
from app.models.user import User
from app.schemas.job import JobCreate, JobResponse
from app.services.job_service import (
    create_job_for_recruiter,
    get_job,
    list_company_jobs,
    list_jobs,
)


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
)


@router.post(
    "",
    response_model=JobResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_job(
    job_data: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("recruiter")(current_user)

    return create_job_for_recruiter(
        db,
        job_data,
        current_user.id,
    )


@router.get(
    "",
    response_model=list[JobResponse],
)
def get_all_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return list_jobs(db)


@router.get(
    "/{job_id}",
    response_model=JobResponse,
)
def get_job_by_id(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_job(db, job_id)


@router.get(
    "/company/{company_id}",
    response_model=list[JobResponse],
)
def get_jobs_for_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return list_company_jobs(db, company_id)