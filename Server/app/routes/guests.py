from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.models.access_token import AccessToken
from app.models.guests import Guest, GuestDetail, GuestDetailForm, PlusOneDetail, PlusOneForm
from app.security.utils import encode_json_web_token, get_current_guest, authenticate_guest
from app.settings import get_settings
from app.database.models import Guest as GuestDB

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
async def read_users_me(current_user:GuestDetail = Depends(get_current_guest)) -> Guest:
    return Guest(first_name=current_user.first_name, last_name=current_user.last_name)


@guest_router.post("/update")
async def update_guest(form_data: GuestDetailForm,current_user: GuestDetail = Depends(get_current_guest)) -> GuestDetail:

    # Get the db object for the current user
    guest = GuestDB.objects(first_name = current_user.first_name, last_name = current_user.last_name).first()


    # TODO: Only update fields that are not None, and check if user has permission to update the field, such as plus_one

    # Update the guest details for items that are not None
    for key, value in form_data.dict().items():
        if value is not None:
            setattr(guest, key, value)
            setattr(current_user, key, value)

    # Save the updated guest object
    guest.save()
    return current_user

@guest_router.get("/details")
async def get_guest(current_user: GuestDetail = Depends(get_current_guest)) -> GuestDetail:
    return current_user