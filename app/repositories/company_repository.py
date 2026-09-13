from sqlalchemy.orm import Session

from app.models.company import Company


def get_company_by_id(
    db: Session,
    company_id: int,
) -> Company | None:
    return (
        db.query(Company)
        .filter(Company.id == company_id)
        .first()
    )


def get_company_by_name(
    db: Session,
    name: str,
) -> Company | None:
    return (
        db.query(Company)
        .filter(Company.name == name)
        .first()
    )


def create_company(
    db: Session,
    company: Company,
) -> Company:
    db.add(company)
    db.commit()
    db.refresh(company)

    return company


def get_companies(
    db: Session,
) -> list[Company]:
    return (
        db.query(Company)
        .order_by(Company.created_at.desc())
        .all()
    )