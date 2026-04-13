from __future__ import annotations

import pytest


def seed_item(client):
    return 94  # mock item_id


def test_get_empty_cart(client, auth_headers):
    res = client.get("/api/cart", headers=auth_headers)

    assert res.status_code == 200
    assert res.json()["items"] == []


def test_add_item_to_cart(client, auth_headers):
    item_id = seed_item(client)

    res = client.post("/api/cart/items", json={
        "item_id": item_id,
        "quantity": 1
    }, headers=auth_headers)

    assert res.status_code == 200
    assert len(res.json()["items"]) == 1


def test_add_same_item_increments_quantity(client, auth_headers):
    item_id = seed_item(client)

    client.post("/api/cart/items", json={"item_id": item_id, "quantity": 1}, headers=auth_headers)
    res = client.post("/api/cart/items", json={"item_id": item_id, "quantity": 2}, headers=auth_headers)

    assert res.status_code == 200
    assert res.json()["items"][0]["quantity"] == 3


def test_update_cart_item_quantity(client, auth_headers):
    item_id = seed_item(client)

    client.post("/api/cart/items", json={"item_id": item_id, "quantity": 1}, headers=auth_headers)

    res = client.put(f"/api/cart/items/{item_id}", json={"quantity": 5}, headers=auth_headers)

    assert res.status_code == 200
    assert res.json()["items"][0]["quantity"] == 5


def test_remove_item_from_cart(client, auth_headers):
    item_id = seed_item(client)

    client.post("/api/cart/items", json={"item_id": item_id, "quantity": 1}, headers=auth_headers)

    res = client.delete(f"/api/cart/items/{item_id}", headers=auth_headers)

    assert res.status_code == 200
    assert res.json()["items"] == []


def test_cart_requires_auth(client):
    res = client.get("/api/cart")

    assert res.status_code == 401