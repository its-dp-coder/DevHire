from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.profile_view import ProfileView


def create_profile_view(
    db: Session,
    candidate_id: int,
    recruiter_id: int,
) -> ProfileView:
    profile_view = ProfileView(
        candidate_id=candidate_id,
        recruiter_id=recruiter_id,
    )

    db.add(profile_view)
    db.commit()
    db.refresh(profile_view)

    return profile_view


def count_candidate_profile_views(
    db: Session,
    candidate_id: int,
) -> int:
    return (
        db.query(func.count(ProfileView.id))
        .filter(ProfileView.candidate_id == candidate_id)
        .scalar()
        or 0
    )