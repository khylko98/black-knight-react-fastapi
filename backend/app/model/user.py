from ..util.database import Base
from sqlalchemy import Column, BIGINT, VARCHAR


# Model for save users to DB
class User(Base):
    __tablename__ = 'users'

    id = Column(
        BIGINT,
        primary_key=True, 
        autoincrement=True, 
        nullable=False)
    
    username = Column(
        VARCHAR(30),
        unique=True,
        nullable=False)
    
    password = Column(
        VARCHAR, 
        nullable=False)
