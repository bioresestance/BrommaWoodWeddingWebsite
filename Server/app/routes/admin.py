from datetime import timedelta
from loguru import logger
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from app.security.utils import authenticate_admin, encode_json_web_token, get_current_admin, get_guest_from_name
from app.settings import get_settings
from app.models.access_token import AccessToken
from app.models.admin import Admin, CreateUserModel
from app.database.models import Guest as GuestDB
from app.models.guests import GuestDetail
# from app.email import send_email, send_bulk_email

admin_router = APIRouter( prefix="/admin", tags=["admin"])
setting = get_settings()


@admin_router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> AccessToken:
    user_is_auth: bool = authenticate_admin(form_data.username, form_data.password)
    if not user_is_auth:
        logger.error(f"Failed admin login attempt for {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=setting.jwt_expires)
    access_token = encode_json_web_token(form_data.username, "admin", access_token_expires )
    logger.info(f"Admin {form_data.username} logged in")
    return access_token


@admin_router.get("/me")
async def read_users_me(current_admin:Admin = Depends(get_current_admin)) -> Admin:
    return current_admin


@admin_router.post("/nuke")
async def nuke_db(_:Admin = Depends(get_current_admin)):
    GuestDB.drop_collection()
    logger.info("Database nuked")
    return "Database nuked"


@admin_router.get("/guest/{guest_name}")
async def get_guest(guest_name: str, _:Admin = Depends(get_current_admin)) -> GuestDetail:

    try:
        first_name = guest_name.split("_")[0].lower()
        last_name = guest_name.split("_")[1].lower()
    except Exception as e:
        logger.error(f"Failed to get guest {guest_name}: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please ensure the guest name is in the format 'first_last'",
        )

    guest = get_guest_from_name(first_name, last_name)

    if guest is None:
        logger.error(f"Guest {guest_name} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Guest not found",
        )
    logger.info(f"Guest {guest.first_name} {guest.last_name} found")
    return guest



@admin_router.post("/guest/create")
async def create_guest( newGuestInfo:CreateUserModel,  _:Admin = Depends(get_current_admin)):

    try:
        first_name = newGuestInfo.username.split("_")[0].lower()
        last_name = newGuestInfo.username.split("_")[1].lower()
    except Exception as e:
        logger.error(f"Failed to create guest {newGuestInfo.username}: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please ensure the username is in the format 'first_last'",
        )

    guest = get_guest_from_name(first_name, last_name)
    if guest is not None:
        logger.error(f"Guest {newGuestInfo.username} already exists, cannot create")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Guest already exists",
        )

    newGuest = GuestDB()
    newGuest.first_name = first_name
    newGuest.last_name = last_name
    newGuest.hash_password(newGuestInfo.code)
    newGuest.plus_one_allowed = newGuestInfo.plus_one

    try:
        newGuest.save()
        logger.info(f"Guest {first_name} {last_name} created")
    except Exception as e:
        logger.error(f"Failed to create guest {newGuestInfo.username}: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create guest: {e}",
        )
    return JSONResponse(content={"message": "Guest created successfully"}, status_code=status.HTTP_201_CREATED)




@admin_router.post("/email")
async def send_test_email(_:Admin = Depends(get_current_admin)):
    pass # TODO: Implement this