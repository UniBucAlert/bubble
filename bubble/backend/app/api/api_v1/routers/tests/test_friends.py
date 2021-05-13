def test_add_delete_get_friends(client, test_db, test_user, user_token_headers, test_superuser):
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

    # Delete the friend.
    response = client.delete("api/v1/friends/" + test_superuser.email, headers=user_token_headers)
    assert response.status_code == 200

    # Check friend deleted.
    response = client.get("/api/v1/friends", headers=user_token_headers)
    assert response.status_code == 200
    assert response.json() == []
