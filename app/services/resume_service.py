from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.repositories.resume_repository import (
    create_resume,
    get_resume_by_id,
    get_resumes_by_candidate,
)


ALLOWED_RESUME_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


def create_candidate_resume(
    db: Session,
    candidate_id: int,
    file_name: str,
    file_url: str,
    file_type: str,
) -> Resume:
    if file_type not in ALLOWED_RESUME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and DOCX resumes are allowed",
        )

    resume = Resume(
        candidate_id=candidate_id,
        file_name=file_name,
        file_url=file_url,
        file_type=file_type,
    )

    return create_resume(db, resume)


def get_candidate_resumes(
    db: Session,
    candidate_id: int,
) -> list[Resume]:
    return get_resumes_by_candidate(
        db,
        candidate_id,
    )


def get_candidate_resume(
    db: Session,
    resume_id: int,
    candidate_id: int,
) -> Resume:
    resume = get_resume_by_id(
        db,
        resume_id,
    )

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found",
        )

    if resume.candidate_id != candidate_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this resume",
        )

    return resume