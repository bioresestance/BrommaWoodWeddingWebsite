from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.models.access_token import AccessToken
from app.models.guests import GuestDetail
from app.security.utils import encode_json_web_token, get_current_guest, authenticate_guest
from app.settings import get_settings, Settings
from app.models.generic_msg import GenericMsg

guest_router = APIRouter( prefix="/guest", tags=["guest"])
setting = get_settings()

@guest_router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> AccessToken:
    user = authenticate_guest(form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=setting.jwt_expires)
    access_token = encode_json_web_token(user, "guest", access_token_expires )
    return access_token


@guest_router.get("/me")
async def read_users_me(current_user:GuestDetail = Depends(get_current_guest)) -> GuestDetail:
    return current_user