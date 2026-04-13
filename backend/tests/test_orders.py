from __future__ import annotations

import pytest


def seed_item():
    return 1


def test_checkout_empty_cart(client, auth_headers):
    res = client.post(
        "/api/orders/checkout",
        json={
            "shipping_address": "123 Test St",
            "credit_card_number": "4111111111111111",
        },
        headers=auth_headers,
    )

    assert res.status_code == 400


def test_checkout_success(client, auth_headers):
    item_id = seed_item()

    client.post(
        "/api/cart/items",
        json={"item_id": item_id, "quantity": 1},
        headers=auth_headers,
    )

    res = client.post(
        "/api/orders/checkout",
        json={
            "shipping_address": "123 Test St",
            "credit_card_number": "4111111111111111",
        },
        headers=auth_headers,
    )

    assert res.status_code == 200


def test_checkout_payment_denied(client, auth_headers):
    item_id = seed_item()

    # Force counter
    from app.services.payment_service import PaymentService

    PaymentService._request_count = 2

    client.post(
        "/api/cart/items",
        json={"item_id": item_id, "quantity": 1},
        headers=auth_headers,
    )

    res = client.post(
        "/api/orders/checkout",
        json={
            "shipping_address": "123 Test St",
            "credit_card_number": "4111111111111111",
        },
        headers=auth_headers,
    )

    assert res.status_code == 402


def test_get_order_history(client, auth_headers):
    item_id = seed_item()

    client.post(
        "/api/cart/items",
        json={"item_id": item_id, "quantity": 1},
        headers=auth_headers,
    )

    client.post(
        "/api/orders/checkout",
        json={
            "shipping_address": "123 Test St",
            "credit_card_number": "4111111111111111",
        },
        headers=auth_headers,
    )

    res = client.get("/api/orders", headers=auth_headers)

    assert res.status_code == 200
    assert len(res.json()) >= 1
