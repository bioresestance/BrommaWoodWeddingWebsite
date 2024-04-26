import motor.motor_asyncio
from mongoengine import connect, disconnect
from app.settings import get_settings, Settings

settings: Settings = get_settings()


def start_db_connection():
    connect(
        db=settings.db_name,
        host=settings.db_url,
        username=settings.db_username,
        password=settings.db_password,
    )

def stop_db_connection():
    disconnect()