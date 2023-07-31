import time

from jose import JWTError, jwt

from ..env import SECRET_KEY, ALGORITHM_TYPE


def generate_token(username: str) -> str:
    expire = time.time() + 1440
    payload = {"sub": username, "exp": expire}
    jwt_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM_TYPE)
    return jwt_token


def verify_token(jwt_token: str) -> bool:
    try:
        decoded_token = jwt.decode(jwt_token, SECRET_KEY, algorithms=[ALGORITHM_TYPE])
        return decoded_token["exp"] >= time.time()
    except JWTError:
        return False
