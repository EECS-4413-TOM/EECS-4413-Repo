from __future__ import annotations

# TODO: Import Session from sqlalchemy.orm
# TODO: Import User from app.models.user
# TODO: Import BaseRepository from app.repositories.base_repository


class UserRepository:
    """
    DAO for the User model.
    Inherits generic CRUD from BaseRepository[User].
    """

    def __init__(self, db):
        """
        Call super().__init__(User, db) to bind model and session.
        """
        pass

    def get_by_email(self, email: str):
        """
        Find a user by their email address.
        Used during login and registration duplicate checks.
        Returns User if found, None otherwise.
        """
        pass
