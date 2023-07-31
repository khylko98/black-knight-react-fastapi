from fastapi import APIRouter, HTTPException, status

from ..model import User
from ..db import collection
from ..env import API_URL
from ..utils.password_hashing import Hash
from ..jwt.token import generate_token


auth = APIRouter(tags=["auth"])


@auth.post(
    f"{API_URL}/registration",
    status_code=status.HTTP_200_OK,
    summary="User Registration",
    description="Registers a new user.",
    responses={
        status.HTTP_200_OK: {
            "description": "Successful registration",
            "content": {"application/json": {"example": {"access_token": "..."}}},
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Bad request or user already exists",
            "content": {
                "application/json": {
                    "example": {"detail": "User with this username already exists"}
                }
            },
        },
    },
)
async def registration(user: User) -> dict:
    """
    Register a new user.

    :param user: User object containing username and password.
    :type user: User
    :return: Dictionary with the access token on successful registration.
    :rtype: dict
    :raises HTTPException 400: If the user already exists or registration fails.
    """
    username_already_exist = collection.find_one({"username": user.username})
    if username_already_exist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this username already exists",
        )
    hashed_password = Hash.bcrypt(user.password)
    user.password = hashed_password
    _id = collection.insert_one(dict(user))
    if _id:
        access_token = generate_token(user.username)
        return {"access_token": access_token}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User not created"
        )


@auth.post(
    f"{API_URL}/login",
    status_code=status.HTTP_200_OK,
    summary="User Login",
    description="Logs in a user.",
    responses={
        status.HTTP_200_OK: {
            "description": "Successful login",
            "content": {"application/json": {"example": {"access_token": "..."}}},
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Bad request or user not found",
            "content": {
                "application/json": {
                    "example": {"detail": "User with this username not found"}
                }
            },
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Unauthorized access",
            "content": {
                "application/json": {"example": {"detail": "Incorrect password"}}
            },
        },
    },
)
async def login(user: User) -> dict:
    """
    Logs in a user.

    :param user: User object containing username and password.
    :type user: User
    :return: Dictionary with the access token on successful login.
    :rtype: dict
    :raises HTTPException 400: If the user is not found.
    :raises HTTPException 401: If the password is incorrect.
    """
    username_already_exist = collection.find_one({"username": user.username})
    if not username_already_exist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this username not found",
        )
    if Hash.verify(user.password, username_already_exist["password"]):
        access_token = generate_token(user.username)
        return {"access_token": access_token}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password"
        )
