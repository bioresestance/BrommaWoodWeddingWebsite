from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routes.root import root_router
from app.database.db_connection import db_connection


@asynccontextmanager
async def app_lifetime(app: FastAPI):
    try:
        # Ping the server to verify the connection
        await db_connection.client.admin.command('ping')
        print("Successfully connected to the database")
    except Exception as e:
        print("Failed to connect to the database:", e)
        raise e
    yield




app = FastAPI(lifespan=app_lifetime)

app.include_router(root_router)
