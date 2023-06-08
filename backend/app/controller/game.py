from fastapi import APIRouter, Depends
from ..security.auth import Auth
from ..util.json import read_JSON
from ..util.config import url_path
import os


router = APIRouter(tags=['game'])

cwd = os.getcwd()


@router.get(f'{url_path}/prologue', dependencies=[Depends(Auth())])
async def prologue() -> dict:
    path = f"{cwd}/resources/static/prologue.json"
    name = "Prologue"
    response = read_JSON(path, name)
    return response


@router.get(f'{url_path}/chapters', dependencies=[Depends(Auth())])
async def chapters(chapter: str, part: str) -> dict:
    path = f"{cwd}/resources/static/chapter-{chapter}-{part}.json"
    name = f"Chapter-{chapter}-{part}"
    response = read_JSON(path, name)
    return response


@router.get(f'{url_path}/epilogue', dependencies=[Depends(Auth())])
async def epilogue() -> dict:
    path = f"{cwd}/resources/static/epilogue.json"
    name = "Epilogue"
    response = read_JSON(path, name)
    return response
