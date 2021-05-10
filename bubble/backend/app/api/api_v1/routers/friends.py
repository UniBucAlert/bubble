from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status, Response
from datetime import timedelta
import typing as t

from app.db import models
from app.db.session import get_db
from app.core import security
from app.db.schemas import UserCreate, UserEdit, User, UserOut
from app.core.auth import authenticate_user, sign_up_new_user
from app.core.auth import get_current_active_user, get_current_active_superuser

from app.db.crud import get_friends, add_friend, get_user_by_email

friends_router = r = APIRouter()


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
