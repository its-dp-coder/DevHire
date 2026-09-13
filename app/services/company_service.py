from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.company import Company
from app.repositories.company_repository import (
    create_company,
    get_companies,
    get_company_by_name,
)
from app.schemas.company import CompanyCreate


def create_company_for_user(
    db: Session,
    company_data: CompanyCreate,
    owner_id: int,
) -> Company:
    existing_company = get_company_by_name(
        db,
        company_data.name,
    )

    if existing_company:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Company already exists",
        )

    company = Company(
        name=company_data.name,
        description=company_data.description,
        website=(
            str(company_data.website)
            if company_data.website
            else None
        ),
        owner_id=owner_id,
    )

    return create_company(db, company)


def list_companies(
    db: Session,
) -> list[Company]:
    return get_companies(db)