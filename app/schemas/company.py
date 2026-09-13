from datetime import datetime

from pydantic import BaseModel, ConfigDict, HttpUrl


class CompanyCreate(BaseModel):
    name: str
    description: str | None = None
    website: HttpUrl | None = None


class CompanyResponse(BaseModel):
    id: int
    name: str
    description: str | None
    website: str | None
    owner_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)