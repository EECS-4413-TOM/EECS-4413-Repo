from __future__ import annotations

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from app.main import app
from app.database import Base
from app.dependencies import get_db

# Test DB (SQLite file for stability)
TEST_DATABASE_URL = "sqlite:///./test.db"

test_engine = create_engine(
    TEST_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


# Override DB dependency
def override_get_db():
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client():
    # Create tables
    Base.metadata.create_all(bind=test_engine)

    # Override dependency
    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as c:
        yield c

    # Cleanup
    Base.metadata.drop_all(bind=test_engine)
    app.dependency_overrides.clear()


@pytest.fixture
def sample_user():
    return {
        "email": "test@example.com",
        "password": "password123",
        "first_name": "Test",
        "last_name": "User",
        "is_admin": False
    }


@pytest.fixture
def auth_headers(client, sample_user):
    # Register user
    client.post("/api/auth/register", json=sample_user)

    # Login
    res = client.post(
        "/api/auth/login",
        json={"email": sample_user["email"], "password": sample_user["password"]},
    )

    token = res.json()["access_token"]

    return {"Authorization": f"Bearer {token}"}
