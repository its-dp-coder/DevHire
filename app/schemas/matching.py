from pydantic import BaseModel


class MatchingResponse(BaseModel):
    match_score: float
    matching_skills: list[str]


class RankedJobResponse(BaseModel):
    job_id: int
    title: str
    company_id: int
    match_score: float
    matching_skills: list[str]