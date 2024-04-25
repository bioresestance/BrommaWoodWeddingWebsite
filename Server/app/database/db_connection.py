import motor.motor_asyncio
from app.settings import get_settings, Settings

settings: Settings = get_settings()

db_client_connection = motor.motor_asyncio.AsyncIOMotorClient(
    host=settings.db_url,
    username=settings.db_username,
    password=settings.db_password,
)

db_connection = db_client_connection[settings.db_name]

db_collection = db_connection[settings.db_collection]