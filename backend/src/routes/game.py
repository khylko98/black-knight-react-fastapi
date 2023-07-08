from fastapi import APIRouter, Depends, status
from ..config.env import url_path
from ..security.auth import Auth
from ..util.json_reader import read_JSON
import os

game = APIRouter(tags=['game'])

cwd = os.getcwd()

@game.get(
    f'{url_path}/prologue',
    dependencies=[Depends(Auth())],
    status_code=status.HTTP_200_OK,
    summary="Retrieve Prologue",
    description="Retrieve the prologue data.",
    responses={
        status.HTTP_200_OK: {
            "description": "Prologue data retrieved successfully",
            "content": {"application/json": {"example": {"mainText": ["..."]}}}
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Unauthorized access",
            "content": {"application/json": {"example": {"detail": "Authentication required"}}}
        }
    }
)
async def prologue() -> dict:
    """
    Retrieve the prologue data.

    :return: Dictionary containing prologue data.
    :rtype: dict
    :raises HTTPException 401: If authentication fails.
    """
    path = f"{cwd}/resources/static/prologue.json"
    name = "Prologue"
    response = read_JSON(path, name)
    return response

@game.get(
    f'{url_path}/chapters',
    dependencies=[Depends(Auth())],
    status_code=status.HTTP_200_OK,
    summary="Retrieve Chapter",
    description="Retrieve data for a specific chapter and part.",
    responses={
        status.HTTP_200_OK: {
            "description": "Chapter data retrieved successfully",
            "content": {"application/json": {"example": {"mainText": ["..."]}}}
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Unauthorized access",
            "content": {"application/json": {"example": {"detail": "Authentication required"}}}
        }
    }
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
    path = f"{cwd}/resources/static/chapter-{chapter}-{part}.json"
    name = f"Chapter-{chapter}-{part}"
    response = read_JSON(path, name)
    return response

@game.get(
    f'{url_path}/epilogue',
    dependencies=[Depends(Auth())],
    status_code=status.HTTP_200_OK,
    summary="Retrieve Epilogue",
    description="Retrieve the epilogue data.",
    responses={
        status.HTTP_200_OK: {
            "description": "Epilogue data retrieved successfully",
            "content": {"application/json": {"example": {"epilogue": {...}}}}
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Unauthorized access",
            "content": {"application/json": {"example": {"detail": "Authentication required"}}}
        }
    }
)
async def epilogue() -> dict:
    """
    Retrieve the epilogue data.

    :return: Dictionary containing epilogue data.
    :rtype: dict
    :raises HTTPException 401: If authentication fails.
    """
    path = f"{cwd}/resources/static/epilogue.json"
    name = "Epilogue"
    response = read_JSON(path, name)
    return response
