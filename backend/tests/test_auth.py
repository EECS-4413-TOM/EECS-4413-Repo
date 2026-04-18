from __future__ import annotations

import pytest


def test_register_success(client):
    res = client.post(
        "/api/auth/register",
        json={
            "email": "new@example.com",
            "password": "password123",
            "first_name": "New",
            "last_name": "User",
            "address": {
                "street": "1 New St",
                "city": "Toronto",
                "province": "ON",
                "country": "CA",
                "zip": "M5V1A1",
                "phone": "4165550100",
            },
        },
    )

    assert res.status_code == 200
    data = res.json()
    assert data["email"] == "new@example.com"
    assert data["is_admin"] is False
    assert data.get("address_id") is not None


def test_register_duplicate_email(client, sample_user):
    client.post("/api/auth/register", json=sample_user)

    res = client.post("/api/auth/register", json=sample_user)

    assert res.status_code == 400
    assert res.json()["detail"] == "Email already registered"


def test_login_success(client, sample_user):
    client.post("/api/auth/register", json=sample_user)

    res = client.post(
        "/api/auth/login",
        json={"email": sample_user["email"], "password": sample_user["password"]},
    )

    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_password(client, sample_user):
    client.post("/api/auth/register", json=sample_user)

    res = client.post(
        "/api/auth/login",
        json={"email": sample_user["email"], "password": "wrongpassword"},
    )

    assert res.status_code == 401


def test_login_nonexistent_user(client):
    res = client.post(
        "/api/auth/login",
        json={"email": "noone@example.com", "password": "password123"},
    )

    assert res.status_code == 401
