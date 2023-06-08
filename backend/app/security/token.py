from jose import JWTError, jwt
from ..util.config import secret_key, algorithm
import time


def generate_access_token(username: str) -> str:
    expire = time.time() + 1440
    to_encode = {"sub": username, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt


def verify_access_token(access_token: str) -> bool:
    try:
        decoded_token = jwt.decode(access_token, secret_key, algorithms=[algorithm])
        return decoded_token["exp"] >= time.time()
    except JWTError:
        return False
