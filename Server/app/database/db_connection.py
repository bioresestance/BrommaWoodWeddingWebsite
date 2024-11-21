from loguru import logger
from mongoengine import connect, disconnect
from pymongo import monitoring
from app.settings import get_settings, Settings

settings: Settings = get_settings()



class CommandLogger(monitoring.CommandListener):
    def started(self, event):
        logger.debug(f"Command {event.command_name} with request id {event.request_id} started on server {event.connection_id}")

    def succeeded(self, event):
        logger.debug(f"Command {event.command_name} with request id {event.request_id} succeeded on server {event.connection_id}")

    def failed(self, event):
        logger.error(f"Command {event.command_name} with request id {event.request_id} failed on server {event.connection_id} with error {event.failure}")



@logger.catch()
def start_db_connection():
    connect(
        db=settings.db_name,
        host=settings.db_url,
        username=settings.db_username,
        password=settings.db_password,
    )
    monitoring.register(CommandLogger())
    logger.info(f"Connected to the database at {settings.db_url}/{settings.db_name}")

@logger.catch()
def stop_db_connection():
    disconnect()
    logger.info("Disconnected from the database")