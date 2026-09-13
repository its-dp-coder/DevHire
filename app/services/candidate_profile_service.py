from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.candidate_profile import CandidateProfile
from app.repositories.candidate_profile_repository import (
    create_profile,
    get_profile_by_user_id,
    update_profile,
)
from app.schemas.candidate_profile import CandidateProfileCreate


def create_candidate_profile(
    db: Session,
    profile_data: CandidateProfileCreate,
    user_id: int,
) -> CandidateProfile:
    existing_profile = get_profile_by_user_id(
        db,
        user_id,
    )

    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Candidate profile already exists",
        )

    profile = CandidateProfile(
        user_id=user_id,
        headline=profile_data.headline,
        bio=profile_data.bio,
        skills=profile_data.skills,
        experience_years=profile_data.experience_years,
        education=profile_data.education,
        location=profile_data.location,
        resume_url=profile_data.resume_url,
    )

    return create_profile(db, profile)


def get_candidate_profile(
    db: Session,
    user_id: int,
) -> CandidateProfile:
    profile = get_profile_by_user_id(
        db,
        user_id,
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found",
        )

    return profile


def update_candidate_profile(
    db: Session,
    user_id: int,
    profile_data: CandidateProfileCreate,
) -> CandidateProfile:
    profile = get_candidate_profile(
        db,
        user_id,
    )

    data = profile_data.model_dump(
        exclude_unset=True,
    )

    return update_profile(
        db,
        profile,
        data,
    )