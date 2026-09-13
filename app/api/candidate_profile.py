from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.permissions import require_role
from app.db.database import get_db
from app.models.user import User
from app.schemas.candidate_profile import (
    CandidateProfileCreate,
    CandidateProfileResponse,
)
from app.services.candidate_profile_service import (
    create_candidate_profile,
    get_candidate_profile,
    update_candidate_profile,
)


router = APIRouter(
    prefix="/candidate-profile",
    tags=["Candidate Profile"],
)


@router.post(
    "",
    response_model=CandidateProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_profile(
    profile_data: CandidateProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    return create_candidate_profile(
        db,
        profile_data,
        current_user.id,
    )


@router.get(
    "",
    response_model=CandidateProfileResponse,
)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    return get_candidate_profile(
        db,
        current_user.id,
    )


@router.put(
    "",
    response_model=CandidateProfileResponse,
)
def update_profile(
    profile_data: CandidateProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    return update_candidate_profile(
        db,
        current_user.id,
        profile_data,
    )