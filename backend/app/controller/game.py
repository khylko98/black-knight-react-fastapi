from fastapi import APIRouter, Depends, status
from ..security.auth import Auth
from ..util.json import read_JSON
from ..util.config import url_path
import os


router = APIRouter(tags=['game'])

cwd = os.getcwd()


@router.get(
    f'{url_path}/prologue', 
    dependencies=[Depends(Auth())], 
    status_code=status.HTTP_200_OK
)
async def prologue() -> dict:
    """
    GET /prologue

    Endpoint for retrieving the prologue. 
    Requires authentication. 
    Returns a JSON response containing the prologue data.

    - Endpoint: /prologue
    - HTTP Method: GET
    - Response Status Code: 200 OK
    - Dependencies: Auth() - authentication dependency
    - Return Type: dict
    """
    path = f"{cwd}/resources/static/prologue.json"
    name = "Prologue"
    response = read_JSON(path, name)
    return response


@router.get(
    f'{url_path}/chapters', 
    dependencies=[Depends(Auth())],
    status_code=status.HTTP_200_OK
)
async def chapters(chapter: str, part: str) -> dict:
    """
    GET /chapters

    Endpoint for retrieving chapters. 
    Requires authentication. 
    Accepts query parameters `chapter` and `part` to specify the desired chapter 
    and part. 
    Returns a JSON response containing the chapter data.

    - Endpoint: /chapters
    - HTTP Method: GET
    - Response Status Code: 200 OK
    - Dependencies: Auth() - authentication dependency
    - Query Parameters:
        - chapter: str - the chapter number
        - part: str - the part number
    - Return Type: dict
    """
    path = f"{cwd}/resources/static/chapter-{chapter}-{part}.json"
    name = f"Chapter-{chapter}-{part}"
    response = read_JSON(path, name)
    return response


@router.get(
    f'{url_path}/epilogue', 
    dependencies=[Depends(Auth())],
    status_code=status.HTTP_200_OK
)
async def epilogue() -> dict:
    """
    GET /epilogue

    Endpoint for retrieving the epilogue. 
    Requires authentication. 
    Returns a JSON response containing the epilogue data.

    - Endpoint: /epilogue
    - HTTP Method: GET
    - Response Status Code: 200 OK
    - Dependencies: Auth() - authentication dependency
    - Return Type: dict
    """
    path = f"{cwd}/resources/static/epilogue.json"
    name = "Epilogue"
    response = read_JSON(path, name)
    return response
