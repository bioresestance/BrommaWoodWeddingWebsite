from datetime import timedelta
import os
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
from app.email import send_bulk_email, send_email
from app.security.Encryptor import Encryptor

EMAIL_SUBJECT = "You Have Been Invited To Aaron And Gina's Wedding!"


admin_router = APIRouter( prefix="/admin", tags=["admin"])
setting = get_settings()
encryptor = Encryptor(setting.encryption_key)

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
    newGuest.first_name = first_name.capitalize()
    newGuest.last_name = last_name.capitalize()
    newGuest.password = encryptor.encrypt(newGuestInfo.code)
    newGuest.plus_one_allowed = newGuestInfo.plus_one
    newGuest.email = newGuestInfo.email

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




@admin_router.post("/email/invite/{guest_name}")
async def send_invite_email(guest_name:str, _:Admin = Depends(get_current_admin)):

    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(base_dir, "../templates/invite_email_template.html")

    # Load the template
    with open(template_path, "r") as file:
        email_template = file.read()

    # if guest_name is "all", send to all guests
    if guest_name.lower() == "all" :
        guests: GuestDB = GuestDB.objects()
        emails = {}
        for guest in guests:
            if guest.email in [None, ""]:
                logger.warning(f"Guest {guest.first_name} {guest.last_name} has no email")
                continue

            invite_code = encryptor.decrypt(guest.password)
            emails[guest.email] = {"first_name": guest.first_name.capitalize(), "last_name": guest.last_name.capitalize(), "invite_code": invite_code}
        send_bulk_email(emails, EMAIL_SUBJECT, email_template)

    else:
        # Get the guest
        try:
            first_name = guest_name.split("_")[0].capitalize()
            last_name = guest_name.split("_")[1].capitalize()
        except Exception as e:
            logger.error(f"Failed to get guest {guest_name}: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please ensure the guest name is in the format 'first_last'",
            )

        guest:GuestDB = GuestDB.objects(first_name=first_name, last_name=last_name).first()

        if guest is None:
            logger.error(f"Guest {guest_name} not found")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Guest not found",
            )
        
        if guest.email in [None, ""]:
            logger.error(f"Guest {guest_name} has no email")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Guest has no email" )

        invite_code = encryptor.decrypt(guest.password)
        # Send the email
        send_email((guest.email, 
                    {"first_name" : guest.first_name.capitalize(), "last_name": guest.last_name.capitalize(), "invite_code": invite_code}), 
                    EMAIL_SUBJECT, 
                    email_template)