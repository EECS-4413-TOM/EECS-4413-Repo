from __future__ import annotations

from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.base_repository import BaseRepository


class UserRepository (BaseRepository):
    """
    DAO for the User model.
    Inherits generic CRUD from BaseRepository[User].
    """

    def __init__(self, db: Session):
        """
        Call super().__init__(User, db) to bind model and session.
        """
        super().__init__(User, db)

    def get_by_email(self, email: str):
        """
        Find a user by their email address.
        Used during login and registration duplicate checks.
        Returns User if found, None otherwise.
        """
        return self.db.query(User).filter(User.email == email).first() #query the database for the user with the given email address. No sql injection because we are using the sqlalchemy query builder.
