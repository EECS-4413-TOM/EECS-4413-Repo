from __future__ import annotations

from pydantic_settings import BaseSettings
from pathlib import Path

_ROOT = Path(__file__).parent.parent.parent




class Settings(BaseSettings):
    """
    Application configuration loaded from environment variables / .env file.
    Uses pydantic-settings BaseSettings so all fields are validated on startup.

    Fields:
      DATABASE_URL              — full PostgreSQL connection string
                                  e.g. "postgresql://user:pass@db:5432/estore"
      JWT_SECRET                — secret key for signing JWT tokens (keep private)
      JWT_ALGORITHM             — signing algorithm, default "HS256"
      ACCESS_TOKEN_EXPIRE_MINUTES — token lifetime in minutes, default 60

    Usage:
      from app.config import settings
      settings.DATABASE_URL
    """


    DATABASE_URL: str = ""
    SUPABASE_DIRECT_URL: str = ""

    JWT_SECRET: str = ""
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    TWITCH_CLIENT_ID: str = ""
    TWITCH_CLIENT_SECRET: str = ""

    class Config:
        env_file = str(_ROOT / ".env")
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()
