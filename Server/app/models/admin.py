from pydantic import BaseModel

class User(BaseModel):
    firstname: str
    lastname: str

class Admin(BaseModel):
    username: str


class CreateUserModel(BaseModel):
    username: str
    code: str
    plus_one: bool