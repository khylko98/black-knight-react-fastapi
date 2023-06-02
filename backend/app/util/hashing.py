from passlib.context import CryptContext


# Get context for hashing user password
pwd_cxt = CryptContext(schemes = ["bcrypt"], deprecated = "auto")


class Hash():
    # Method to hashing password
    def bcrypt(password: str) -> str:
        return pwd_cxt.hash(password)

    # Method to verify received password by hashed password from DB
    def verify(received_password, hashed_password) -> bool:
        return pwd_cxt.verify(received_password, hashed_password)
