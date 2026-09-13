from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CandidateProfileCreate(BaseModel):
    headline: str | None = None
    bio: str | None = None
    skills: str | None = None
    experience_years: int = Field(default=0, ge=0)
    education: str | None = None
    location: str | None = None
    resume_url: str | None = None


class CandidateProfileResponse(BaseModel):
    id: int
    user_id: int
    headline: str | None
    bio: str | None
    skills: str | None
    experience_years: int
    education: str | None
    location: str | None
    resume_url: str | None
    created_at: datetime
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)