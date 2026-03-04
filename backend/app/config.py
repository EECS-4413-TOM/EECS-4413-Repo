from __future__ import annotations

# TODO: Import BaseSettings from pydantic_settings


class Settings:
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

    # TODO: Declare fields with types and defaults
    # DATABASE_URL: str = "postgresql://estore_user:changeme@localhost:5432/estore"
    # JWT_SECRET: str = "changeme-to-a-random-secret-key"
    # JWT_ALGORITHM: str = "HS256"
    # ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # TODO: Add inner Config class to load from .env file
    # class Config:
    #     env_file = ".env"

    pass


# TODO: Export a module-level singleton
# settings = Settings()
