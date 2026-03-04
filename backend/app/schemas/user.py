from __future__ import annotations

# TODO: Import BaseModel from pydantic
# TODO: Import EmailStr from pydantic


class UserCreate:
    """
    Request body for POST /api/auth/register.
    All fields are required.
    """

    # TODO: Declare fields
    # email       — EmailStr, not null
    # password    — str, not null  (plain text; will be hashed in AuthService)
    # first_name  — str, not null
    # last_name   — str, not null

    pass


class UserLogin:
    """
    Request body for POST /api/auth/login.
    """

    # TODO: Declare fields
    # email    — EmailStr, not null
    # password — str, not null

    pass


class UserUpdate:
    """
    Request body for PUT /api/users/me.
    All fields optional — only provided fields are updated.
    """

    # TODO: Declare fields (all optional)
    # first_name — str | None = None
    # last_name  — str | None = None
    # email      — EmailStr | None = None

    pass


class UserResponse:
    """
    Response body returned when a user is read.
    Never exposes hashed_password.
    Requires model_config = {"from_attributes": True} for ORM serialization.
    """

    # TODO: Declare fields
    # id        — int
    # email     — str
    # first_name — str
    # last_name  — str
    # is_admin  — bool

    pass


class Token:
    """
    Response body returned after a successful login.
    The client must store access_token and send it as
    'Authorization: Bearer <token>' on protected routes.
    """

    # TODO: Declare fields
    # access_token — str
    # token_type   — str, default "bearer"

    pass
