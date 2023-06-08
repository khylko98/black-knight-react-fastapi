from passlib.context import CryptContext


# Create a context for hashing user passwords
pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hash:
    @staticmethod
    def bcrypt(password: str) -> str:
        """Hashes the provided password using bcrypt."""
        return pwd_ctx.hash(password)

    @staticmethod
    def verify(received_password: str, hashed_password: str) -> bool:
        """Verifies the received password against the hashed password from the database."""
        return pwd_ctx.verify(received_password, hashed_password)
