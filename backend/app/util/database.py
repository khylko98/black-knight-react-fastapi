from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from decouple import Config, RepositoryEnv
import os


cwd = os.getcwd()

DOTENV_FILE = f"{cwd}/resources/.env"

# Get DB url from file .env
DATABASE_URL = Config(RepositoryEnv(DOTENV_FILE)).get('database_url')

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
