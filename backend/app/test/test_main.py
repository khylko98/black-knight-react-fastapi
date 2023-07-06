from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


# Auth Testing
def test_registration_error():
    response = client.post(
        "/api/v1/registration", 
        json={"password": ""}
    )
    access_token = response.json().get("access_token")
    assert access_token == None
    detail = response.json().get("detail")
    assert detail != None

def test_login_error():
    response = client.post(
        "/api/v1/login", 
        json={"username": ""}
    )
    access_token = response.json().get("access_token")
    assert access_token == None
    detail = response.json().get("detail")
    assert detail != None

def test_registration_success():
    response = client.post(
        "/api/v1/registration", 
        json={"username": "username", "password": "password"}
    )
    access_token = response.json().get("access_token")
    assert access_token

def test_login_success():
    response = client.post(
        "/api/v1/login", 
        json={"username": "username", "password": "password"}
    )
    access_token = response.json().get("access_token")
    assert access_token


# Game Testing
def test_prologue_success():
    response = client.post(
        "/api/v1/login", 
        json={"username": "username", "password": "password"}
    )
    access_token = response.json().get("access_token")
    assert access_token
    response = client.get(
        "/api/v1/prologue",
        headers= {
            "Authorization": "Bearer " + access_token
        }
    )
    assert response.status_code == 200
    assert response.json().get("mainText") != None

def test_chapters_success():
    response = client.post(
        "/api/v1/login", 
        json={"username": "username", "password": "password"}
    )
    access_token = response.json().get("access_token")
    assert access_token
    response = client.get(
        "/api/v1/chapters?chapter=1&part=1",
        headers= {
            "Authorization": "Bearer " + access_token
        }
    )
    assert response.status_code == 200
    assert response.json().get("mainText") != None
    assert response.json().get("swordOption") != None
    assert response.json().get("swordOptionResult") != None
    assert response.json().get("talkOption") != None
    assert response.json().get("talkOptionResult") != None

def test_epilogue_success():
    response = client.post(
        "/api/v1/login", 
        json={"username": "username", "password": "password"}
    )
    access_token = response.json().get("access_token")
    assert access_token
    response = client.get(
        "/api/v1/epilogue",
        headers= {
            "Authorization": "Bearer " + access_token
        }
    )
    assert response.status_code == 200
    assert response.json().get("mainText") != None
    