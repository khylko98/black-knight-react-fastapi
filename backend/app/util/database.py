from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .config import database_url


engine = create_engine(database_url)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


# Get a connection to the database using a local session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
