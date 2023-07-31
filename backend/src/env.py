import os

from dotenv import load_dotenv


# Load all environments from .env
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM_TYPE = os.getenv("ALGORITHM_TYPE")

API_URL = os.getenv("API_URL")

FRONTEND_URL = os.getenv("FRONTEND_URL")
