from __future__ import annotations

import pytest


def test_list_items(client):
    res = client.get("/api/catalog")

    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_filter_by_category(client):
    res = client.get("/api/catalog?category=Electronics")

    assert res.status_code == 200


def test_filter_by_brand(client):
    res = client.get("/api/catalog?brand=Apple")

    assert res.status_code == 200


def test_search_by_keyword(client):
    res = client.get("/api/catalog?search=laptop")

    assert res.status_code == 200


def test_sort_by_price_asc(client):
    res = client.get("/api/catalog?sort_by=price&order=asc")

    assert res.status_code == 200


def test_sort_by_name_desc(client):
    res = client.get("/api/catalog?sort_by=name&order=desc")

    assert res.status_code == 200


def test_get_item_by_id(client):
    res = client.get("/api/catalog/1")

    assert res.status_code in [200, 404]


def test_get_item_not_found(client):
    res = client.get("/api/catalog/99999")

    assert res.status_code == 404
