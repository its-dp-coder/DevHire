from sqlalchemy.orm import Session

from app.repositories.profile_view_repository import (
    count_candidate_profile_views,
    create_profile_view,
)


def record_profile_view(
    db: Session,
    candidate_id: int,
    recruiter_id: int,
):
    return create_profile_view(
        db=db,
        candidate_id=candidate_id,
        recruiter_id=recruiter_id,
    )


def get_candidate_profile_view_count(
    db: Session,
    candidate_id: int,
) -> int:
    return count_candidate_profile_views(
        db=db,
        candidate_id=candidate_id,
    )