def test_add_delete_get_friends(client,
                                test_user, user_token_headers,
                                test_superuser, superuser_token_headers):
    # Add one friend.
    response = client.post("api/v1/friends/" + test_superuser.email, headers=user_token_headers)
    assert response.status_code == 200

    # Check friend added.
    response = client.get("/api/v1/friends", headers=user_token_headers)
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": test_superuser.id,
            "email": test_superuser.email,
            "is_active": test_superuser.is_active,
            "is_superuser": test_superuser.is_superuser,
        }
    ]

    # Check friend friendship is not bidirectional.
    response = client.get("/api/v1/friends", headers=superuser_token_headers)
    assert response.status_code == 200
    assert response.json() == []

    # Check superuser received contact request.
    response = client.get("/api/v1/friends_of", headers=superuser_token_headers)
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": test_user.id,
            "email": test_user.email,
            "is_active": test_user.is_active,
            "is_superuser": test_user.is_superuser,
            "first_name": test_user.first_name,
            "last_name": test_user.last_name,
        }
    ]

    # Delete the friend.
    response = client.delete("api/v1/friends/" + test_superuser.email, headers=user_token_headers)
    assert response.status_code == 200

    # Check friend deleted.
    response = client.get("/api/v1/friends", headers=user_token_headers)
    assert response.status_code == 200
    assert response.json() == []

def test_add_friend_not_found(client, user_token_headers):
    # Try to add a friend.
    random_email = "girejige@greoijgiore.com"
    response = client.post("api/v1/friends/" + random_email, headers=user_token_headers)
    assert response.status_code == 404

def test_add_existent_friend(client, user_token_headers, test_superuser):
    # Add one friend.
    response = client.post("api/v1/friends/" + test_superuser.email, headers=user_token_headers)
    assert response.status_code == 200

    # Try to add same friend again.
    response = client.post("api/v1/friends/" + test_superuser.email, headers=user_token_headers)
    assert response.status_code == 403


def test_delete_friend_not_found(client, user_token_headers):
    # Try to add a friend.
    random_email = "girejige@greoijgiore.com"
    response = client.delete("api/v1/friends/" + random_email, headers=user_token_headers)
    assert response.status_code == 404

def test_delete_not_existent_friend(client, user_token_headers, test_superuser):
    # Delete superuser friend without having him.
    response = client.delete("api/v1/friends/" + test_superuser.email, headers=user_token_headers)
    assert response.status_code == 403
