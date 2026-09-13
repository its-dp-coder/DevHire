from sqlalchemy.orm import Session

from app.models.resume import Resume


def create_resume(
    db: Session,
    resume: Resume,
) -> Resume:
    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume


def get_resume_by_id(
    db: Session,
    resume_id: int,
) -> Resume | None:
    return (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )


def get_resumes_by_candidate(
    db: Session,
    candidate_id: int,
) -> list[Resume]:
    return (
        db.query(Resume)
        .filter(Resume.candidate_id == candidate_id)
        .order_by(Resume.created_at.desc())
        .all()
    )