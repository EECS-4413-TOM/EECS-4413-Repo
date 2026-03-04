from __future__ import annotations

# TODO: Import pytest
# TODO: Import TestClient fixtures from conftest
# TODO: Seed test items via ItemRepository or direct DB insert in fixtures


def test_list_items(client):
    """
    GET /api/catalog with no filters.
    Expect: HTTP 200, returns a list (may be empty if no items seeded).
    """
    pass


def test_filter_by_category(client):
    """
    GET /api/catalog?category=Electronics (after seeding an Electronics item).
    Expect: HTTP 200, all returned items have category="Electronics".
    """
    pass


def test_filter_by_brand(client):
    """
    GET /api/catalog?brand=Apple (after seeding an Apple item).
    Expect: HTTP 200, all returned items have brand="Apple".
    """
    pass


def test_search_by_keyword(client):
    """
    GET /api/catalog?search=laptop (after seeding an item with "laptop" in name).
    Expect: HTTP 200, results include the seeded laptop item.
    """
    pass


def test_sort_by_price_asc(client):
    """
    GET /api/catalog?sort_by=price&order=asc (after seeding multiple items).
    Expect: HTTP 200, prices are in ascending order.
    """
    pass


def test_sort_by_name_desc(client):
    """
    GET /api/catalog?sort_by=name&order=desc (after seeding multiple items).
    Expect: HTTP 200, names are in reverse alphabetical order.
    """
    pass


def test_get_item_by_id(client):
    """
    GET /api/catalog/{id} with a valid item ID.
    Expect: HTTP 200, returns the correct item with all fields.
    """
    pass


def test_get_item_not_found(client):
    """
    GET /api/catalog/99999 where item 99999 does not exist.
    Expect: HTTP 404 with detail "Item not found".
    """
    pass
