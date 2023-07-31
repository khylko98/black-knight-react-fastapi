import os

from fastapi import APIRouter, Depends, status

from ..env import API_URL
from ..jwt.filter import JwtAuthFilter
from ..utils.json_reader import read_json


game = APIRouter(tags=["game"])

cwd = os.getcwd()


@game.get(
    f"{API_URL}/prologue",
    dependencies=[Depends(JwtAuthFilter())],
    status_code=status.HTTP_200_OK,
    summary="Retrieve Prologue",
    description="Retrieve the prologue data.",
    responses={
        status.HTTP_200_OK: {
            "description": "Prologue data retrieved successfully",
            "content": {"application/json": {"example": {"mainText": "[...]"}}},
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Unauthorized access",
            "content": {
                "application/json": {"example": {"detail": "Authentication required"}}
            },
        },
    },
)
async def prologue() -> dict:
    """
    Retrieve the prologue data.

    :return: Dictionary containing prologue data.
    :rtype: dict
    :raises HTTPException 401: If authentication fails.
    """
    path = f"{cwd}/res/prologue.json"
    name = "Prologue"
    response = await read_json(path, name)
    return response


@game.get(
    f"{API_URL}/chapters",
    dependencies=[Depends(JwtAuthFilter())],
    status_code=status.HTTP_200_OK,
    summary="Retrieve Chapter",
    description="Retrieve data for a specific chapter and part.",
    responses={
        status.HTTP_200_OK: {
            "description": "Chapter data retrieved successfully",
            "content": {
                "application/json": {
                    "example": {
                        "mainText": "[...]",
                        "talkOption": "[...]",
                        "talkOptionResult": "[...]",
                    }
                }
            },
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Unauthorized access",
            "content": {
                "application/json": {"example": {"detail": "Authentication required"}}
            },
        },
    },
)
async def chapters(chapter: str, part: str) -> dict:
    """
    Retrieve data for a specific chapter and part.

    :param chapter: Chapter identifier.
    :type chapter: str
    :param part: Part identifier.
    :type part: str
    :return: Dictionary containing chapter data.
    :rtype: dict
    :raises HTTPException 401: If authentication fails.
    """
    path = f"{cwd}/res/chapter-{chapter}-{part}.json"
    name = f"Chapter-{chapter}-{part}"
    response = await read_json(path, name)
    return response


@game.get(
    f"{API_URL}/epilogue",
    dependencies=[Depends(JwtAuthFilter())],
    status_code=status.HTTP_200_OK,
    summary="Retrieve Epilogue",
    description="Retrieve the epilogue data.",
    responses={
        status.HTTP_200_OK: {
            "description": "Epilogue data retrieved successfully",
            "content": {"application/json": {"example": {"epilogue": "[...]"}}},
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Unauthorized access",
            "content": {
                "application/json": {"example": {"detail": "Authentication required"}}
            },
        },
    },
)
async def epilogue() -> dict:
    """
    Retrieve the epilogue data.

    :return: Dictionary containing epilogue data.
    :rtype: dict
    :raises HTTPException 401: If authentication fails.
    """
    path = f"{cwd}/res/epilogue.json"
    name = "Epilogue"
    response = await read_json(path, name)
    return response
