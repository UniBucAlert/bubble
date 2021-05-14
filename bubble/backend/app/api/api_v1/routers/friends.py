import typing as t

from fastapi import APIRouter, Depends, HTTPException, Response

from app.core.auth import get_current_active_user
from app.db import models
from app.db.crud import get_friends, get_contact_requests
from app.db.schemas import User
from app.db.session import get_db

friends_router = r = APIRouter()


@r.get("/contact_requests", response_model=t.List[User], response_model_exclude_none=True)
async def friends(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get current user's contact requests.
    """
    return get_contact_requests(db, current_user.id)


@r.get("/friends", response_model=t.List[User], response_model_exclude_none=True)
async def friends(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get current user's friends.
    """
    return get_friends(db, current_user.id)


@r.post("/friends/{user_email}")
async def add(
    response: Response,
    user_email: str,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Adds a friend to the current user.
    """
    friend = db.query(models.User).filter(models.User.email == user_email).first()
    if not friend:
        raise HTTPException(status_code=404, detail="User not found")

    if friend in current_user.friends:
        raise HTTPException(status_code=403, detail="User already has that friend")

    current_user.friends.append(friend)
    db.add(current_user)
    db.commit()

    return "Success"


@r.delete("/friends/{user_email}")
async def delete(
    response: Response,
    user_email: str,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Deletes a friend from the current user.
    """
    friend = db.query(models.User).filter(models.User.email == user_email).first()
    if not friend:
        raise HTTPException(status_code=404, detail="User not found")

    if friend not in current_user.friends:
        raise HTTPException(status_code=403, detail="User doesn't have that friend")

    current_user.friends.remove(friend)
    db.add(current_user)
    db.commit()

    return "Success"
