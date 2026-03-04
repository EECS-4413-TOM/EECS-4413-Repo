from __future__ import annotations

# TODO: Import pytest
# TODO: Import TestClient, auth_headers, sample_user fixtures from conftest
# TODO: Seed test items with sufficient inventory via fixture


def test_checkout_success(client, auth_headers):
    """
    Add item to cart, then POST /api/orders/checkout with valid payment info.
    Expect: HTTP 200, response is a valid OrderResponse with items and total.
    Cart should be empty after checkout.
    """
    pass


def test_checkout_empty_cart(client, auth_headers):
    """
    POST /api/orders/checkout without adding anything to the cart first.
    Expect: HTTP 400 "Cart is empty".
    """
    pass


def test_checkout_insufficient_inventory(client, auth_headers):
    """
    Add an item to cart with quantity greater than its available inventory.
    POST /api/orders/checkout.
    Expect: HTTP 400 "Insufficient inventory for ...".
    """
    pass


def test_checkout_payment_denied(client, auth_headers):
    """
    Force the 3rd checkout request (when PaymentService denies it).
    Expect: HTTP 402 "Credit Card Authorization Failed."

    Hint: Make two prior successful checkouts first to exhaust the counter,
    or mock/reset PaymentService._request_count to 2 before the test.
    """
    pass


def test_get_order_history(client, auth_headers):
    """
    Complete a checkout, then GET /api/orders.
    Expect: HTTP 200, list contains the completed order.
    """
    pass


def test_inventory_decreases_after_checkout(client, auth_headers):
    """
    Record item.quantity before checkout.
    Complete a checkout with quantity=N.
    GET /api/catalog/{item_id} and verify item.quantity decreased by N.
    """
    pass
