from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.permissions import require_role
from app.db.database import get_db
from app.models.candidate_profile import CandidateProfile
from app.models.user import User
from app.services.profile_view_service import record_profile_view

router = APIRouter(
    prefix="/recruiter/candidates",
    tags=["Recruiter Candidates"],
)


@router.get("/{candidate_id}")
def get_candidate_for_recruiter(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("recruiter")(current_user)

    profile = (
        db.query(CandidateProfile)
        .filter(CandidateProfile.user_id == candidate_id)
        .first()
    )

    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found",
        )

    candidate = (
        db.query(User)
        .filter(
            User.id == candidate_id,
            User.role == "candidate",
        )
        .first()
    )

    if candidate is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found",
        )

    record_profile_view(
        db=db,
        candidate_id=candidate_id,
        recruiter_id=current_user.id,
    )

    return {
        "candidate": {
            "id": candidate.id,
            "full_name": candidate.full_name,
            "email": candidate.email,
        },
        "profile": {
            "id": profile.id,
            "user_id": profile.user_id,
            "headline": profile.headline,
            "bio": profile.bio,
            "skills": profile.skills,
            "experience_years": profile.experience_years,
            "education": profile.education,
            "location": profile.location,
            "resume_url": profile.resume_url,
        },
    }