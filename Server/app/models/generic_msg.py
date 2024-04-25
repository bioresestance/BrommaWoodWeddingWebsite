from pydantic import BaseModel

class GenericMsg(BaseModel):
    msg: str