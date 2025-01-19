import os
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from loguru import logger
from jinja2 import Template

from app.email import send_email
from app.models.access_token import AccessToken
from app.models.guests import Guest, GuestDetail, GuestDetailForm
from app.security.utils import encode_json_web_token, get_current_guest, authenticate_guest, get_guest_from_name
from app.settings import get_settings
from app.database.models import Guest as GuestDB, GuestPlusOne
from app.security.Encryptor import Encryptor

guest_router = APIRouter( prefix="/guest", tags=["guest"])
setting = get_settings()
encryptor = Encryptor(setting.encryption_key)


def send_confirmation_email(guest: GuestDB):
    # Load the email template
    template_path = os.path.join(os.path.dirname(__file__), "..", 'templates', 'confirmation_email_template.html.j2')
    with open(template_path) as file_:
        template = Template(file_.read())

    # Render the template with guest details
    email_body = template.render(attending = guest.attending, first_name=guest.first_name, last_name=guest.last_name)

    # Send the email
    send_email(guest.email, "Bromma + Wood RSVP Confirmation", email_body)





@guest_router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> AccessToken:
    user = authenticate_guest(form_data.password)
    if not user:
        logger.error("Failed login attempt")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=setting.jwt_expires)
    access_token = encode_json_web_token(user, "guest", access_token_expires )
    logger.info(f"User '{user}' logged in")
    return access_token


@guest_router.get("/me")
async def read_users_me(current_user:GuestDetail = Depends(get_current_guest)) -> Guest:
    return Guest(first_name=current_user.first_name, last_name=current_user.last_name)


@guest_router.post("/update")
async def update_guest(form_data: GuestDetailForm,current_user: GuestDetail = Depends(get_current_guest)) -> GuestDetail:

    # Get the db object for the current user
    guest:GuestDB = GuestDB.objects(first_name = current_user.first_name, last_name = current_user.last_name).first()


    if not guest:
        logger.error("User not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    logger.info(f"Updating user {guest.first_name} {guest.last_name}")

    guest.preferred_name = form_data.preferred_name
    guest.attending = form_data.attending
    guest.email = form_data.email
    guest.phone = form_data.phone
    guest.address = form_data.address
    guest.city = form_data.city
    guest.province = form_data.province
    guest.area_code = form_data.area_code
    guest.country = form_data.country
    guest.is_over_19 = form_data.is_over_19

    guest.dietary_restrictions = []
    for diet in form_data.dietary_restrictions:
        # Prevent duplicates
        if diet not in guest.dietary_restrictions:
            guest.dietary_restrictions.append(diet)

    guest.additional_notes = form_data.additional_notes

    # Update the plus one details
    if guest.plus_one_allowed:
        # Guest does not have a plus one
        if not form_data.plus_one:
            guest.has_plus_one = False
            guest.plus_one = None
        # Guest already has a plus one, so update the details
        elif guest.has_plus_one:
            plus_one = guest.plus_one
            plus_one.first_name = form_data.plus_one.first_name
            plus_one.last_name = form_data.plus_one.last_name
            plus_one.email = form_data.plus_one.email
            plus_one.additional_notes = form_data.plus_one.additional_notes
            plus_one.is_over_19 = form_data.plus_one.is_over_19

            plus_one.dietary_restrictions = []
            for diet in form_data.plus_one.dietary_restrictions:
                plus_one.dietary_restrictions.append(diet)

        # Guest does not have a plus one already, so create a new one
        elif form_data.plus_one:
            plus_one = GuestPlusOne(first_name=form_data.plus_one.first_name,
                                    last_name=form_data.plus_one.last_name,
                                    email=form_data.plus_one.email,
                                    additional_notes=form_data.plus_one.additional_notes,
                                    is_over_19=form_data.plus_one.is_over_19)
            for diet in form_data.plus_one.dietary_restrictions:
                plus_one.dietary_restrictions.append(diet)
            guest.plus_one = plus_one
            guest.has_plus_one = True
    else:
        guest.has_plus_one = False
        guest.plus_one = None

    # Save the updated guest object
    try:
        guest.save()
        logger.info(f"User {guest.first_name} {guest.last_name} updated")
        send_confirmation_email(guest)
    except Exception as e:
        logger.error(f"Failed to update user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    return get_guest_from_name(guest.first_name, guest.last_name)


@guest_router.get("/details")
async def get_guest(current_user: GuestDetail = Depends(get_current_guest)) -> GuestDetail:
    return current_user