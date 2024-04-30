from pydantic import BaseModel, EmailStr, StrictBool
from pydantic_extra_types.phone_numbers import PhoneNumber


class GuestDetail(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: PhoneNumber
    address: str
    city: str
    province: str
    area_code: str
    country: str
    attending: StrictBool
    dietary_restrictions: str
    additional_notes: str




