from pydantic import BaseModel, Field


# Schema for get data from frontend
# and converting this data to model
class UserSchema(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        orm_mode = True
