from jose import JWTError, jwt
from ..config.env import secret_key, algorithm_type
import time


def generate_access_token(username: str) -> str:
    expire = time.time() + 1440
    to_encode = {"sub": username, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm_type)
    return encoded_jwt


def verify_access_token(access_token: str) -> bool:
    try:
        decoded_token = jwt.decode(
            access_token, secret_key, algorithms=[algorithm_type]
        )
        return decoded_token["exp"] >= time.time()
    except JWTError:
        return False
