from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.db.database import Base


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
        index=True,
    )

    headline: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    bio: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    skills: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    experience_years: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    education: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    location: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    resume_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        onupdate=func.now(),
        nullable=True,
    )

    user = relationship(
        "User",
        backref="candidate_profile",
    )