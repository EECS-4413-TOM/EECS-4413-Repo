from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.address import Address
from app.repositories.base_repository import BaseRepository


class AddressRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(Address, db)
