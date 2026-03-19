from __future__ import annotations

from pydantic_settings import BaseSettings


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

    DATABASE_URL: str = "postgresql://estore_user:changeme@localhost:5432/estore"

    JWT_SECRET: str = "changeme-to-a-random-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env" #telling pydantic to load the environment variables from the .env file.
        extra = "ignore" #telling pydantic to ignore any environment variables that are not defined in the Settings class.

    


settings = Settings() #exporting a module-level singleton.
