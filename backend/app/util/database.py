from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .config import DATABASE_URL


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind = engine)

Base = declarative_base()


# Get connection to DB by local session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
