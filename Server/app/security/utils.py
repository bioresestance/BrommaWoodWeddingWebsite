from datetime import datetime, timedelta
import os
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.models.access_token import AccessToken, AccessTokenContents
from app.database.models import Guest as DBGuest
from app.settings import get_settings, Settings
from app.security.Encryptor import Encryptor
from app.models.admin import Admin
from app.models.guests import GuestDetail, PlusOneDetail


oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="/admin/login")
oauth2_scheme_guest = OAuth2PasswordBearer(tokenUrl="/guest/login")


def get_guest_from_name(first_name: str, last_name: str) -> GuestDetail | None:
    """
    Get the guest from the database based on the first and last name.
    """
    db_guest = DBGuest.objects(first_name=first_name, last_name=last_name).first()

    if not db_guest or db_guest is None:
        return None
    
    guest_detail = GuestDetail( first_name=db_guest.first_name,
                                last_name=db_guest.last_name,
                                preferred_name=db_guest.preferred_name,
                                email=db_guest.email,
                                phone=db_guest.phone,
                                address=db_guest.address,
                                city=db_guest.city,
                                province=db_guest.province,
                                area_code=db_guest.area_code,
                                country=db_guest.country,
                                attending=db_guest.attending,
                                additional_notes=db_guest.additional_notes,
                                is_wedding_party=db_guest.is_wedding_party,
                                plus_one_allowed=db_guest.plus_one_allowed,
                                has_plus_one=db_guest.has_plus_one,
                                is_over_19=db_guest.is_over_19,
                                )
    for diet in db_guest.dietary_restrictions:
        guest_detail.dietary_restrictions.append(diet)

    if db_guest.plus_one_allowed and db_guest.has_plus_one:
        guest_detail.plus_one = PlusOneDetail(first_name=db_guest.plus_one.first_name,
                                              last_name=db_guest.plus_one.last_name,
                                              email=db_guest.plus_one.email,
                                              additional_notes=db_guest.plus_one.additional_notes,
                                              is_over_19=db_guest.plus_one.is_over_19)
        for diet in db_guest.plus_one.dietary_restrictions:
            guest_detail.plus_one.dietary_restrictions.append(diet)

    return guest_detail



def encode_json_web_token(username:str, role:str, expires_time: timedelta | None = None) -> AccessToken:
    
    """Generates a JSON Web Token thats been encoded with needed data to verify authentication.

    Returns:
        AccessToken: Model containing the generated bearer token.
    """
    setting: Settings = get_settings()
    if expires_time:
        expire = datetime.utcnow() + expires_time
    else:
        expire = datetime.utcnow() + timedelta(minutes=setting.jwt_expires)
        
    # Attempt to encode the contents into the token.
    encoded_jwt = jwt.encode(dict(AccessTokenContents(sub=username, exp=expire, role=role)), setting.jwt_secret, algorithm=setting.jwt_algorithm)
    
    # Return the Access Token model, ready to be returned as is.
    return AccessToken(access_token=encoded_jwt, token_type="bearer")


def decode_json_web_token(token) -> AccessTokenContents | None:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    setting: Settings = get_settings()
    # Decode the token.
    try:
        payload = jwt.decode(token, setting.jwt_secret, algorithms=[setting.jwt_algorithm])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        expire: datetime = payload.get("exp")
        if username is None or role is None:
            raise credentials_exception
        token_data = AccessTokenContents(sub=username, exp=expire, role=role)
    except JWTError:
        raise credentials_exception
    return token_data


def get_current_guest(token: str = Depends(oauth2_scheme_guest)) -> GuestDetail:
    """
    Dependency to get the current user from the database based on the token.
    """
    token_data = decode_json_web_token(token)

    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    first_name, last_name = token_data.sub.split("_")

    # Search for the guest with the given username.
    guest_detail = get_guest_from_name(first_name, last_name)

    if guest_detail is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return guest_detail


def get_current_admin(token: Annotated[str,Depends(oauth2_scheme_admin)]) -> Admin:
    """
    Dependency to get the current admin from the database based on the token.
    If the token is not an admin, this will return throw an HTTPException.
    """
    token_data = decode_json_web_token(token)
    if token_data.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You do not have permission to access this resource",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return Admin(username=token_data.sub)


def authenticate_admin(username: str, password: str) -> bool:
    """
    Authenticates the admin with the given username and password.
    """
    admin_username = os.getenv('ADMIN_USERNAME', 'admin')
    admin_password = os.getenv('ADMIN_PASSWORD', 'admin_password')

    if username != admin_username:
        return False

    if password != admin_password:
        return False

    return True

def authenticate_guest( invite_code: str) -> str | None:
    """
    Authenticates the guest with the given invite code.
    """
    guests = DBGuest.objects()
    settings = get_settings()
    encryptor = Encryptor(settings.encryption_key)

    # Search for the guest with the given invite code.
    for guest in guests:
        if encryptor.compare(invite_code, guest.password):
            return guest.first_name + "_" + guest.last_name
    return None