from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .token import verify_access_token


# Class to control access_token
class Auth(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(Auth, self).__init__(auto_error = auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            Auth, self).__call__(request)
        
        if credentials:
            # Check if access_token have 'Bearer '
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN, 
                    detail="Invalid authentication scheme")
            
            #
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN, 
                    detail="Invalid token or expired token")
            
            return credentials.credentials
        else:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authorization code")

    def verify_jwt(self, access_token: str):
        valid = verify_access_token(access_token)
        if valid:
            return True
        return False
