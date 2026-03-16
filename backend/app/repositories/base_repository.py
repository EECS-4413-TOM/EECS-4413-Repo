from __future__ import annotations

from sqlalchemy.orm import Session

# TODO: Import Generic, TypeVar, Type from typing
# TODO: Import Session from sqlalchemy.orm
# TODO: Import Base from app.database

# ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository:
    """
    Generic DAO base class providing common CRUD operations.
    All domain repositories extend this class, passing their specific model type.

    Usage example:
        class UserRepository(BaseRepository[User]):
            def __init__(self, db: Session):
                super().__init__(User, db)
    """
    def __init__(self, model, db: Session):
        """
        Store the SQLAlchemy model class and the active DB session.
        Both are used by every inherited method.
        """
        self.model = model
        self.db = db

    def get_by_id(self, id: int):
        """
        Look up a single record by primary key.
        Returns the model instance, or None if not found.
        """
        return self.db.query(self.model).filter(self.model.id == id).first()

    def get_all(self, skip: int = 0, limit: int = 100):
        """
        Return a paginated list of all records for this model.
        skip — number of records to skip (for pagination offset)
        limit — max number of records to return
        """
        return self.db.query(self.model).offset(skip).limit(limit).all()

    def create(self, obj):
        """
        Persist a new model instance to the database.
        Steps: db.add(obj) → db.commit() → db.refresh(obj) → return obj
        """
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def update(self, obj):
        """
        Commit changes to an already-attached model instance.
        The caller mutates the object's fields before calling this.
        Steps: db.commit() → db.refresh(obj) → return obj
        """
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def delete(self, obj) -> None:
        """
        Remove a model instance from the database permanently.
        Steps: db.delete(obj) → db.commit()
        """
        self.db.delete(obj)
        self.db.commit()
