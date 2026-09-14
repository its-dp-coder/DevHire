from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProfileViewResponse(BaseModel):
    id: int
    candidate_id: int
    recruiter_id: int
    viewed_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProfileViewCountResponse(BaseModel):
    profile_views: int