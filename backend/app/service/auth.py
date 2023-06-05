from sqlalchemy.orm import Session
from ..util.hashing import Hash
from ..model.user import User
from ..schema.user import UserSchema
from fastapi import HTTPException, status


def registration(db: Session, user: UserSchema) -> User:
    # Check users with this username on DB
    user_already_present = db.query(User).filter(
        User.username.like(user.username)).first()
    
    if user_already_present:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"User with this username already created")
    else:
        new_user = User(**user.dict())
        # Hashing password before saving user in DB
        hashed_password = Hash.bcrypt(new_user.password)
        new_user.password = hashed_password
        # Add new user to DB
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

def login(db: Session, user: UserSchema) -> User:
    # Check users with this username on DB
    get_user_by_username = db.query(User).filter(
        user.username == User.username).first()
    
    if not get_user_by_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"User with this username not found")
    
    verificated = Hash.verify(user.password, get_user_by_username.password)
    
    if not verificated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Incorrect password")
    
    return get_user_by_username
