from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.permissions import require_role
from app.db.database import get_db
from app.models.user import User
from app.schemas.company import CompanyCreate, CompanyResponse
from app.services.company_service import (
    create_company_for_user,
    list_companies,
)


router = APIRouter(
    prefix="/companies",
    tags=["Companies"],
)


@router.post(
    "",
    response_model=CompanyResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_company(
    company_data: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_role("recruiter")(current_user)

    return create_company_for_user(
        db,
        company_data,
        current_user.id,
    )


@router.get(
    "",
    response_model=list[CompanyResponse],
)
def get_all_companies(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return list_companies(db)