from fastapi import APIRouter, Depends
from fastapi import Depends
from ..security.auth import Auth
from ..util.json import read_JSON
from ..util.config import URL_PATH
import os


router = APIRouter(tags = ['game'])

cwd = os.getcwd()


@router.get(f'{URL_PATH}/prologue', dependencies = [Depends(Auth())])
async def prologue():
    path = f"{cwd}/resources/static/prologue.json"
    name = "Prologue"
    response = read_JSON(path, name)
    return response

@router.get(f'{URL_PATH}/chapters', dependencies = [Depends(Auth())])
async def prologue(chapter: str, part: str):
    path = f"{cwd}/resources/static/chapter-{chapter}-{part}.json"
    name = f"Chapter-{chapter}-{part}"
    response = read_JSON(path, name)
    return response

@router.get(f'{URL_PATH}/epilogue', dependencies = [Depends(Auth())])
async def epilogue():
    path = f"{cwd}/resources/static/epilogue.json"
    name = "Epilogue"
    response = read_JSON(path, name)
    return response
