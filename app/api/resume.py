from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.permissions import require_role
from app.db.database import get_db
from app.models.user import User
from app.schemas.resume import ResumeResponse
from app.services.resume_service import (
    create_candidate_resume,
    get_candidate_resume,
    get_candidate_resumes,
)


router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"],
)


UPLOAD_DIR = Path("uploads/resumes")
UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
}


@router.post(
    "",
    response_model=ResumeResponse,
    status_code=status.HTTP_201_CREATED,
)
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    extension = Path(file.filename or "").suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and DOCX resumes are allowed",
        )

    file_name = f"{uuid4().hex}{extension}"
    file_path = UPLOAD_DIR / file_name

    with file_path.open("wb") as buffer:
        buffer.write(file.file.read())

    file_url = f"/uploads/resumes/{file_name}"

    return create_candidate_resume(
        db,
        current_user.id,
        file.filename or file_name,
        file_url,
        file.content_type or "",
    )


@router.get(
    "",
    response_model=list[ResumeResponse],
)
def get_my_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    return get_candidate_resumes(
        db,
        current_user.id,
    )


@router.get(
    "/{resume_id}",
    response_model=ResumeResponse,
)
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("candidate")(current_user)

    return get_candidate_resume(
        db,
        resume_id,
        current_user.id,
    )