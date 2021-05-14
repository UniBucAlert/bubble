from app.core import security

# Monkey patch function we can use to shave a second off our tests by skipping the password hashing check
def verify_password_mock(first: str, second: str):
    return True


def test_login(client, test_user, monkeypatch):
    # Patch the test to skip password hashing check for speed
    monkeypatch.setattr(security, "verify_password", verify_password_mock)

    response = client.post(
        "/api/token",
        data={"username": test_user.email, "password": "nottheactualpass"},
    )
    assert response.status_code == 200


def test_signup(client, monkeypatch):
    def get_password_hash_mock(first: str, second: str):
        return True

    monkeypatch.setattr(security, "get_password_hash", get_password_hash_mock)

    response = client.post(
        "/api/signup",
        data={
            "username": "some@email.com",
            "first_name": "Name",
            "last_name": "Surname", 
            "password": "randompassword"
        },
    )
    assert response.status_code == 200


def test_resignup(client, test_user, monkeypatch):
    # Patch the test to skip password hashing check for speed
    monkeypatch.setattr(security, "verify_password", verify_password_mock)
    print(test_user.email, test_user.first_name, test_user.last_name,)

    response = client.post(
        "/api/signup",
        data={
            "username": test_user.email,
            "first_name": test_user.first_name,
            "last_name": test_user.last_name,
            "password": "password_hashing_is_skipped_via_monkey_patch",
        },
    )
    assert response.status_code == 409


def test_wrong_password(
    client, test_db, test_user, test_password, monkeypatch
):
    def verify_password_failed_mock(first: str, second: str):
        return False

    monkeypatch.setattr(
        security, "verify_password", verify_password_failed_mock
    )

    response = client.post(
        "/api/token", data={"username": test_user.email, "password": "wrong"}
    )
    assert response.status_code == 401


def test_wrong_login(client, test_db, test_user, test_password):
    response = client.post(
        "/api/token", data={"username": "fakeuser", "password": test_password}
    )
    assert response.status_code == 401
