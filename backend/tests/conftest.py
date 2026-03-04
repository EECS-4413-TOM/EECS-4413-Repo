from __future__ import annotations

# TODO: Import pytest
# TODO: Import create_engine from sqlalchemy
# TODO: Import sessionmaker from sqlalchemy.orm
# TODO: Import TestClient from fastapi.testclient
# TODO: Import app from app.main
# TODO: Import Base from app.database
# TODO: Import get_db from app.dependencies


# TODO: Create a test-only SQLite in-memory engine
# TEST_DATABASE_URL = "sqlite:///./test.db"
# test_engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
# TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    """
    Pytest fixture (or dependency override) that yields a test DB session.
    Used to replace the real get_db dependency in all test routes.
    Ensures tests use an isolated database that is reset between runs.
    """
    pass


def client():
    """
    Pytest fixture that provides a configured FastAPI TestClient.

    Steps:
    1. Create all tables on the test engine: Base.metadata.create_all(test_engine)
    2. Override app.dependency_overrides[get_db] = override_get_db
    3. yield TestClient(app)
    4. Drop all tables after the test: Base.metadata.drop_all(test_engine)
    """
    pass


def sample_user():
    """
    Pytest fixture that returns a dict with test user credentials.
    Used to seed a registered user for tests that require authentication.
    Example: {"email": "test@example.com", "password": "password123", ...}
    """
    pass


def auth_headers(client, sample_user):
    """
    Pytest fixture that registers and logs in sample_user,
    then returns the Authorization header dict for authenticated requests.
    Example: {"Authorization": "Bearer <token>"}
    """
    pass
