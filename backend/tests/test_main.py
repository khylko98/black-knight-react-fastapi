from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_root_succes():
    response = client.get("/", follow_redirects=False)
    assert response.status_code == 307
    assert response.headers["location"] == f"/api/v1/login"
