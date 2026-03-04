from __future__ import annotations

# TODO: Import pytest
# TODO: Import TestClient fixtures from conftest


def test_register_success(client):
    """
    POST /api/auth/register with valid new user data.
    Expect: HTTP 200, response contains id, email, first_name, last_name, is_admin=False.
    """
    pass


def test_register_duplicate_email(client, sample_user):
    """
    POST /api/auth/register with an email that already exists in the database.
    Expect: HTTP 400 with detail "Email already registered".
    """
    pass


def test_login_success(client, sample_user):
    """
    POST /api/auth/login with correct credentials.
    Expect: HTTP 200, response contains access_token and token_type="bearer".
    """
    pass


def test_login_invalid_password(client, sample_user):
    """
    POST /api/auth/login with the correct email but wrong password.
    Expect: HTTP 401 with detail "Invalid email or password".
    """
    pass


def test_login_nonexistent_user(client):
    """
    POST /api/auth/login with an email that has never been registered.
    Expect: HTTP 401 with detail "Invalid email or password".
    """
    pass
