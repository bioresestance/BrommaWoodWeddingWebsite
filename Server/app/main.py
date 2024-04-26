from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routes.root import root_router
from app.database.db_connection import start_db_connection, stop_db_connection

@asynccontextmanager
async def app_lifetime(app: FastAPI):
    start_db_connection()
    yield
    stop_db_connection()


app = FastAPI(lifespan=app_lifetime)

app.include_router(root_router)
