from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.security.utils import authenticate_admin, encode_json_web_token, get_current_admin, get_guest_from_name
from app.settings import get_settings
from app.models.access_token import AccessToken, AccessTokenContents
from app.models.admin import Admin
from app.database.models import Guest as GuestDB
from app.models.guests import GuestDetail

admin_router = APIRouter( prefix="/admin", tags=["admin"])
setting = get_settings()


@admin_router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> AccessToken:
    user_is_auth: bool = authenticate_admin(form_data.username, form_data.password)
    if not user_is_auth:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=setting.jwt_expires)
    access_token = encode_json_web_token(form_data.username, "admin", access_token_expires )
    return access_token


@admin_router.get("/me")
async def read_users_me(current_admin:Admin = Depends(get_current_admin)) -> Admin:
    return current_admin


@admin_router.get("/guest/{guest_name}")
async def get_guest(guest_name: str, current_admin:Admin = Depends(get_current_admin)) -> GuestDetail:

    try:
        first_name = guest_name.split("_")[0].lower()
        last_name = guest_name.split("_")[1].lower()
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please ensure the guest name is in the format 'first_last'",
        )

    guest = get_guest_from_name(first_name, last_name)

    if guest is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Guest not found",
        )
    return guest



@admin_router.put("/guest")
async def create_guest(current_admin:Admin = Depends(get_current_admin)) -> str:
    return "Create Guest"

@admin_router.post("/guest")
async def update_guest(current_admin:Admin = Depends(get_current_admin)) -> str:
    return "Update Guest"