from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache

class Settings(BaseSettings):
    app_mode: str = Field("dev", env="APP_MODE")
    app_name: str = Field("Bromma Wood Wedding", env="APP_NAME")
    db_url: str = Field("mongodb://localhost:27017", env="DB_URL")
    db_username: str = Field("admin", env="DB_USERNAME")
    db_password: str = Field("admin", env="DB_PASSWORD")
    db_name: str = Field("brommawoodwedding", env="DB_NAME")
    jwt_secret: str = Field("7a622820781eff8983daebd5552995d510c674d870b5e02a332360e0e68ed985", env="JWT_SECRET") # Not a real secret, just a placeholder for dev
    jwt_algorithm: str = Field("HS256", env="JWT_ALGORITHM")
    jwt_expires: int = Field(900, env="JWT_EXPIRES")
    redis_url: str = Field("redis://localhost:6379", env="REDIS_URL")
    log_token: str = Field("", env="LOG_TOKEN")

    email_api_url: str = Field("", env="EMAIL_API_URL")
    email_api_key: str = Field("", env="EMAIL_API_KEY") # Do not Commit
    email_from: str = Field("", env="EMAIL_FROM")


@lru_cache()
def get_settings() -> Settings:
    return Settings()