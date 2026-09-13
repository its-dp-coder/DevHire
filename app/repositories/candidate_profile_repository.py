from sqlalchemy.orm import Session

from app.models.candidate_profile import CandidateProfile


def get_profile_by_user_id(
    db: Session,
    user_id: int,
) -> CandidateProfile | None:
    return (
        db.query(CandidateProfile)
        .filter(CandidateProfile.user_id == user_id)
        .first()
    )


def create_profile(
    db: Session,
    profile: CandidateProfile,
) -> CandidateProfile:
    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


def update_profile(
    db: Session,
    profile: CandidateProfile,
    data: dict,
) -> CandidateProfile:
    for field, value in data.items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)

    return profile