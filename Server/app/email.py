import json
import requests
from app.settings import get_settings
from loguru import logger as logging


def send_email(to: str, subject: str, text: str):
    settings = get_settings()

    if(settings.email_api_url in [None, ""] or settings.email_api_key in [None, ""]):
        logging.error("Mailgun API URL or API Key is not set.")
        return


    email_json = {
        "from": settings.email_from,
        "to": to,
        "subject": subject,
        "html": text
    }

    try:
        resp = requests.post(settings.email_api_url, auth=("api", settings.email_api_key), data= email_json)
        if resp.status_code == 200: # success
            logging.info(f"Successfully sent an email to '{to}' via Mailgun API.")
        else: # error
            logging.error(f"Could not send the email, reason: {resp.text}")

    except Exception as ex:
        logging.exception(f"Mailgun error: {ex}")


def send_bulk_email(emails: dict, subject: str, text: str):
    settings = get_settings()

    if(settings.email_api_url in [None, ""] or settings.email_api_key in [None, ""]):
        logging.error("Mailgun API URL or API Key is not set.")
        return


    email_json = {
        "from": settings.email_from,
        "to": list(emails.keys()),
        "subject": subject,
        "html": text,
        "recipient-variables": json.dumps(emails)
    }

    try:
        resp = requests.post(settings.email_api_url, auth=("api", settings.email_api_key), data= email_json)
        if resp.status_code == 200: # success
            logging.info(f"Successfully sent an email to '{email_json["to"]}' via Mailgun API.")
        else: # error
            logging.error(f"Could not send the email, reason: {resp.text}")

    except Exception as ex:
        logging.exception(f"Mailgun error: {ex}")
