from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.schemas.profile_view import ProfileViewCountResponse
from app.services.profile_view_service import get_candidate_profile_view_count

router = APIRouter(
    prefix="/profile-views",
    tags=["Profile Views"],
)


@router.get(
    "/count",
    response_model=ProfileViewCountResponse,
)
def get_profile_view_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "candidate":
        from fastapi import HTTPException, status

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Candidate access required",
        )

    count = get_candidate_profile_view_count(
        db=db,
        candidate_id=current_user.id,
    )

    return {
        "profile_views": count,
    }