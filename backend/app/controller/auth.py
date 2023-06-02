from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from ..schema.user import UserSchema
from ..schema.token import TokenSchema
from ..util.database import get_db
from ..service import auth
from ..security.token import generate_access_token


router = APIRouter(tags = ['user'])


@router.post('/registration')
async def registration(reg: UserSchema = Body(...), 
                       db: Session = Depends(get_db)):
    user_registered = auth.registration(db, reg)
    access_token = generate_access_token(user_registered.username)
    return TokenSchema(access_token = access_token)
    
@router.post('/login')
async def registration(log: UserSchema = Body(...), 
                       db: Session = Depends(get_db)):
    user_loged = auth.login(db, log)
    access_token = generate_access_token(user_loged.username)
    return TokenSchema(access_token = access_token)
