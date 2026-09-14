def test_redis_health(client):
    response = client.get("/health/redis")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "ok"
    assert data["redis"] == "connected"