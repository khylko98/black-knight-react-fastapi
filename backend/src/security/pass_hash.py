from passlib.context import CryptContext

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Hash:
    @staticmethod
    def bcrypt(password: str) -> str:
        return pwd_ctx.hash(password)

    @staticmethod
    def verify(received_password: str, hashed_password: str) -> bool:
        try:
            return pwd_ctx.verify(received_password, hashed_password)
        except Exception:
            return False
