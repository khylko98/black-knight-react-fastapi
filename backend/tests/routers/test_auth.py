from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)

API_URL = "/api/v1"


def test_registration_error():
    response = client.post(f"{API_URL}/registration", json={"password": ""})
    assert response.json().get("access_token") is None
    assert response.json().get("detail") is not None


def test_login_error():
    response = client.post(f"{API_URL}/login", json={"username": ""})
    assert response.json().get("access_token") is None
    assert response.json().get("detail") is not None


def test_registration_success():
    response = client.post(
        f"{API_URL}/registration", json={"username": "username", "password": "password"}
    )
    assert response.json().get("access_token") is not None


def test_login_success():
    response = client.post(
        f"{API_URL}/login", json={"username": "username", "password": "password"}
    )
    assert response.json().get("access_token") is not None
