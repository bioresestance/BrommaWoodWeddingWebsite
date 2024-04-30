from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.security.utils import authenticate_admin, encode_json_web_token, get_current_admin
from app.settings import get_settings
from app.models.access_token import AccessToken, AccessTokenContents
from app.models.users import Admin

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
async def read_users_me(current_user:Admin = Depends(get_current_admin)) ->str:
    return current_user.username