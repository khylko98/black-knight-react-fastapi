from fastapi import APIRouter, Depends
from fastapi import Depends
from ..security.auth import Auth
from ..util.json import readJSON
import os


router = APIRouter(tags = ['game'])

cwd = os.getcwd()


@router.get("/prologue", dependencies = [Depends(Auth())])
async def prologue():
    path = f"{cwd}/resources/static/prologue.json"
    name = "Prologue"
    response = readJSON(path, name)
    return response

@router.get("/chapters", dependencies = [Depends(Auth())])
async def prologue(chapter: str, part: str):
    path = f"{cwd}/resources/static/chapter-{chapter}-{part}.json"
    name = f"Chapter-{chapter}-{part}"
    response = readJSON(path, name)
    return response

@router.get("/epilogue", dependencies = [Depends(Auth())])
async def epilogue():
    path = f"{cwd}/resources/static/epilogue.json"
    name = "Epilogue"
    response = readJSON(path, name)
    return response
