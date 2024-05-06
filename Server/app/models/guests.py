from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, StrictBool
from pydantic_extra_types.phone_numbers import PhoneNumber


class Diets(str, Enum):
    vegan = "vegan"
    vegetarian = "vegetarian"
    gluten_free = "gluten_free"
    dairy_free = "dairy_free"
    nut_free = "nut_free"
    shellfish_free = "shellfish_free"
    other = "other"
    none = "none"


class PlusOneDetail(BaseModel):
    first_name: str
    last_name: str
    email: str
    dietary_restrictions: list[Diets] = []
    additional_notes: str = ""

class GuestDetail(BaseModel):
    first_name: str
    last_name: str
    email: str

    phone: str = None
    address: str = ""
    city: str = ""
    province: str = ""
    area_code: str = ""
    country: str = ""

    attending: StrictBool = False
    dietary_restrictions: list[Diets] = []
    additional_notes: str = ""
    is_wedding_party: StrictBool = False
    plus_one_allowed: StrictBool = False
    has_plus_one: StrictBool = False
    plus_one: Optional[PlusOneDetail] = None



class Guest(BaseModel):
    first_name: str
    last_name: str


class GuestDetailForm(BaseModel):
    attending: StrictBool

    email: Optional[EmailStr] = None
    phone: Optional[PhoneNumber] = None
    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    area_code: Optional[str] = None
    country: Optional[str] = None
    dietary_restrictions: Optional[list[Diets]] = []
    additional_notes: Optional[str] = None


class PlusOneForm(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    dietary_restrictions: list[Diets] = []
    additional_notes: str = ""