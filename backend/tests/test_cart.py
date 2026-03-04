from __future__ import annotations

# TODO: Import pytest
# TODO: Import TestClient, auth_headers, sample_user fixtures from conftest
# TODO: Seed test items via fixture or direct insert


def test_get_empty_cart(client, auth_headers):
    """
    GET /api/cart for a freshly registered user.
    Expect: HTTP 200, cart has an empty items list.
    """
    pass


def test_add_item_to_cart(client, auth_headers):
    """
    POST /api/cart/items with a valid item_id and quantity=1.
    Expect: HTTP 200, cart items list contains the added product.
    """
    pass


def test_add_same_item_increments_quantity(client, auth_headers):
    """
    POST /api/cart/items for the same item_id twice.
    Expect: HTTP 200, the item's quantity in the cart equals the sum of both additions.
    """
    pass


def test_update_cart_item_quantity(client, auth_headers):
    """
    PUT /api/cart/items/{item_id} with a new quantity value.
    Expect: HTTP 200, the item's quantity in the cart equals the new value.
    """
    pass


def test_remove_item_from_cart(client, auth_headers):
    """
    DELETE /api/cart/items/{item_id} for an item that is in the cart.
    Expect: HTTP 200, the item no longer appears in the cart items list.
    """
    pass


def test_cart_requires_auth(client):
    """
    GET /api/cart with no Authorization header.
    Expect: HTTP 401 (unauthorized).
    """
    pass
