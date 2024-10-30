import redis.asyncio as redis
from app.settings import get_settings, Settings

settings: Settings = get_settings()


def get_redis_connection():
    return redis.from_url(settings.redis_url, encoding="utf8")
