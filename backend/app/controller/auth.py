from fastapi import APIRouter, Body, Depends, Response, status
from sqlalchemy.orm import Session
from ..schema.user import UserSchema
from ..schema.token import TokenSchema
from ..util.database import get_db
from ..service import auth
from ..security.token import generate_access_token
from ..util.config import url_path


router = APIRouter(tags=['user'])


@router.post(f'{url_path}/registration', status_code=status.HTTP_200_OK)
async def registration(
    reg: UserSchema = Body(...),
    db: Session = Depends(get_db)
) -> TokenSchema:
    """
    POST /registration

    Endpoint for user registration. 
    Expects a JSON request body with user registration data. 
    Upon successful registration, it generates an access token 
    and returns it as the response body.

    - Endpoint: /registration
    - HTTP Method: POST
    - Response Status Code: 200 OK
    - Request Body: JSON data conforming to UserSchema
    - Dependencies: db (Session), reg (UserSchema)
    - Return Type: TokenSchema
    """
    user_registered = auth.registration(db, reg)
    access_token = generate_access_token(user_registered.username)
    return TokenSchema(access_token=access_token)


@router.post(f'{url_path}/login', status_code=status.HTTP_200_OK)
async def login(
    log: UserSchema = Body(...),
    db: Session = Depends(get_db)
) -> TokenSchema:
    """
    POST /login

    Endpoint for user login. 
    Expects a JSON request body with user login credentials. 
    Upon successful login, it generates an access token 
    and returns it as the response body.

    - Endpoint: /login
    - HTTP Method: POST
    - Response Status Code: 200 OK
    - Request Body: JSON data conforming to UserSchema
    - Dependencies: db (Session), log (UserSchema)
    - Return Type: TokenSchema
    """
    user_logged = auth.login(db, log)
    access_token = generate_access_token(user_logged.username)
    return TokenSchema(access_token=access_token)
