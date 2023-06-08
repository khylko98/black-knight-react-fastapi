from sqlalchemy.orm import Session
from ..util.hashing import Hash
from ..model.user import User
from ..schema.user import UserSchema
from fastapi import HTTPException, status


def registration(db: Session, user: UserSchema) -> User:
    user_already_present = db.query(User).filter(User.username == user.username).first()
    
    if user_already_present:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="User with this username already exists"
        )
    
    hashed_password = Hash.bcrypt(user.password)
    new_user = User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def login(db: Session, user: UserSchema) -> User:
    existing_user = db.query(User).filter(User.username == user.username).first()
    
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User with this username not found"
        )
    
    if not Hash.verify(user.password, existing_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect password"
        )
    
    return existing_user
