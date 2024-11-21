from contextlib import asynccontextmanager
from math import ceil
from loguru import logger
from fastapi import FastAPI, Depends, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter


import app.logging
from app.middlewares.loggingMiddleware import LoggingMiddleware
from app.routes.root import root_router
from app.routes.admin import admin_router
from app.routes.guests import guest_router
from app.database.db_connection import start_db_connection, stop_db_connection
from app.database.redis_connection import get_redis_connection



async def rate_limited_callback(request: Request, response: Response, pexpire: int):
    expire = ceil(pexpire / 1000)

    logger.warning(f"Rate limit exceeded for {request.client.host}. Retry after {expire} seconds.")
    raise HTTPException(
        status.HTTP_429_TOO_MANY_REQUESTS,
        f"Too Many Requests. Retry after {expire} seconds.",
        headers={"Retry-After": str(expire)},
    )



@asynccontextmanager
async def app_lifetime(_: FastAPI):
    start_db_connection()
    # We use redis for rate limiting
    redis_connection = get_redis_connection()
    await FastAPILimiter.init(redis = redis_connection, http_callback=rate_limited_callback)
    logger.info("Redis connection established")
    yield
    logger.warning("Shutting down the server")
    stop_db_connection()


app = FastAPI(lifespan=app_lifetime, dependencies=[Depends(RateLimiter(times=50, minutes=1))])

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Add logging middleware
app.add_middleware(LoggingMiddleware)

app.include_router(root_router)
app.include_router(admin_router)
app.include_router(guest_router)
