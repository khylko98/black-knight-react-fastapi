from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from ..schema.user import UserSchema
from ..schema.token import TokenSchema
from ..util.database import get_db
from ..service import auth
from ..security.token import generate_access_token
from ..util.config import url_path


router = APIRouter(tags=['user'])


@router.post(f'{url_path}/registration')
async def registration(
    reg: UserSchema = Body(...),
    db: Session = Depends(get_db)
) -> TokenSchema:
    user_registered = auth.registration(db, reg)
    access_token = generate_access_token(user_registered.username)
    return TokenSchema(access_token=access_token)


@router.post(f'{url_path}/login')
async def login(
    log: UserSchema = Body(...),
    db: Session = Depends(get_db)
) -> TokenSchema:
    user_logged = auth.login(db, log)
    access_token = generate_access_token(user_logged.username)
    return TokenSchema(access_token=access_token)
