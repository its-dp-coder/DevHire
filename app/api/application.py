from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.permissions import require_role
from app.db.database import get_db
from app.models.user import User
from app.schemas.application import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationStatusUpdate,
)
from app.services.application_service import (
    apply_for_job,
    list_candidate_applications,
    list_job_applications,
    list_recruiter_applications,
    update_status,
)


router = APIRouter(
    prefix="/applications",
    tags=["Applications"],
)


@router.post(
    "",
    response_model=ApplicationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_application(
    application_data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    return apply_for_job(
        db,
        application_data,
        current_user.id,
    )


@router.get(
    "/my",
    response_model=list[ApplicationResponse],
)
def get_my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    return list_candidate_applications(
        db,
        current_user.id,
    )


@router.get(
    "/recruiter",
    response_model=list[ApplicationResponse],
)
def get_recruiter_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("recruiter")(current_user)

    return list_recruiter_applications(
        db,
        current_user.id,
    )


@router.get(
    "/job/{job_id}",
    response_model=list[ApplicationResponse],
)
def get_applications_for_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("recruiter")(current_user)

    return list_job_applications(
        db,
        job_id,
    )


@router.patch(
    "/{application_id}/status",
    response_model=ApplicationResponse,
)
def update_application_status(
    application_id: int,
    status_data: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("recruiter")(current_user)

    return update_status(
        db,
        application_id,
        current_user.id,
        status_data.status,
    )