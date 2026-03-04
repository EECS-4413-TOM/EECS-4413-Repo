from __future__ import annotations

# TODO: Import the standard alembic env boilerplate:
#   from alembic import context
#   from sqlalchemy import engine_from_config, pool

# TODO: Import Base from app.database
# TODO: Import all models from app.models (to register them with Base.metadata)
# TODO: Import settings from app.config


# TODO: Set target_metadata so Alembic can detect model changes
# target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """
    Run migrations in 'offline' mode (generates SQL script without connecting).
    Use the DATABASE_URL from settings as the literal URL.
    """
    pass


def run_migrations_online() -> None:
    """
    Run migrations in 'online' mode (connects to the real database and applies changes).

    Steps:
    1. Build the engine using settings.DATABASE_URL
    2. Create a connection and begin a transaction
    3. Configure the alembic context with the connection and target_metadata
    4. Run context.run_migrations()
    """
    pass


# TODO: Call the appropriate function based on context.is_offline_mode()
# if context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()
