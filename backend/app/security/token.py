from jose import JWTError, jwt
from decouple import Config, RepositoryEnv
import time
import os


cwd = os.getcwd()

DOTENV_FILE = f"{cwd}/resources/.env"

# Security params
SECRET_KEY = Config(RepositoryEnv(DOTENV_FILE)).get("secret_key")
ALGORITHM = Config(RepositoryEnv(DOTENV_FILE)).get("algorithm")


def generate_access_token(username: str):
    # Get time from now to now + 1440 minutes
    expire = time.time() + 1440
    # Set dict to send to encoder
    to_encode = {
        "sub": username,
        "exp": expire
    }
    encoded_jwt = jwt.encode(
        to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(access_token: str):
    try:
        # Decoded token by token, key and algorithm
        decoded_token = jwt.decode(
            access_token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check expire of token
        if decoded_token["exp"] >= time.time():
            return decoded_token
        else:
            return None
    except JWTError:
        return None
    