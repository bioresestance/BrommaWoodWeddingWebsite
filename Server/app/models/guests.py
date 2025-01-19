from enum import Enum
from typing import  Optional
from pydantic import BaseModel, EmailStr, StrictBool, field_validator
import re


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
    is_over_19: StrictBool = False

class GuestDetail(BaseModel):
    first_name: str
    last_name: str
    preferred_name: str = ""
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
    is_over_19: StrictBool = False



class Guest(BaseModel):
    first_name: str
    last_name: str


class GuestDetailForm(BaseModel):
    attending: Optional[StrictBool] = False
    preferred_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    area_code: Optional[str] = None
    country: Optional[str] = None
    dietary_restrictions: Optional[list[Diets]] = []
    additional_notes: Optional[str] = None
    plus_one: Optional[PlusOneDetail] = None
    is_over_19: Optional[StrictBool] = False

    @field_validator("phone")
    def phone_validator(cls, phone: Optional[str]):
        if phone is not None and phone != "":
            pattern = r'^\+?1?[-.\s]?(\(?([2-9][0-8][0-9])\)?[-.\s]?([2-9][0-9]{2})[-.\s]?([0-9]{4}))$'
            match = re.match(pattern, phone)
            if not match:
                raise ValueError("Invalid phone number")
            # Format phone number with dashes
            phone = "1-{}-{}-{}".format(match.group(2), match.group(3), match.group(4))
        return phone

    @field_validator("email")
    def email_validator(cls, email: Optional[EmailStr]):
        if (email is not None and email != "") and not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email address")
        return email

class PlusOneForm(BaseModel):
    first_name: str = ""
    last_name: str = ""
    preferred_name: str = ""
    email: EmailStr | None = None
    dietary_restrictions: list[Diets] = []
    additional_notes: str = ""
    is_over_19: StrictBool = False