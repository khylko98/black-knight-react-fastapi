from pydantic import BaseModel


# Schema to send response with access_token
class TokenSchema(BaseModel):
    access_token: str
