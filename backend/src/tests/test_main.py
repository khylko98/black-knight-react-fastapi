from fastapi.testclient import TestClient
from src.main import app
import pytest

client = TestClient(app)

@pytest.fixture
def access_token():
    response = client.post(
        "/api/v1/login",
        json={"username": "username", "password": "password"}
    )
    return response.json().get("access_token")

def assert_main_text_exists(response):
    assert response.status_code == 200
    assert response.json().get("mainText") is not None

def test_registration_error():
    response = client.post(
        "/api/v1/registration",
        json={"password": ""}
    )
    assert response.json().get("access_token") is None
    assert response.json().get("detail") is not None

def test_login_error():
    response = client.post(
        "/api/v1/login",
        json={"username": ""}
    )
    assert response.json().get("access_token") is None
    assert response.json().get("detail") is not None

def test_registration_success():
    response = client.post(
        "/api/v1/registration",
        json={"username": "username", "password": "password"}
    )
    assert response.json().get("access_token") is not None

def test_login_success():
    response = client.post(
        "/api/v1/login",
        json={"username": "username", "password": "password"}
    )
    assert response.json().get("access_token") is not None

def test_prologue_success(access_token):
    response = client.get(
        "/api/v1/prologue",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert_main_text_exists(response)

def test_chapters_success(access_token):
    response = client.get(
        "/api/v1/chapters?chapter=1&part=1",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert_main_text_exists(response)
    assert response.json().get("swordOption") is not None
    assert response.json().get("swordOptionResult") is not None
    assert response.json().get("talkOption") is not None
    assert response.json().get("talkOptionResult") is not None

def test_epilogue_success(access_token):
    response = client.get(
        "/api/v1/epilogue",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert_main_text_exists(response)
