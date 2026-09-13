from datetime import datetime

from pydantic import BaseModel, ConfigDict


class JobCreate(BaseModel):
    title: str
    description: str
    location: str | None = None
    employment_type: str
    experience_level: str
    required_skills: str


class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str | None
    employment_type: str
    experience_level: str
    required_skills: str
    company_id: int
    created_by: int
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)