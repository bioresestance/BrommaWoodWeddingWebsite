from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    app_name: str = "Bromma Wood Wedding"
    db_url: str = "mongodb://localhost:27017"
    db_username: str = "admin"
    db_password: str = "admin"
    db_name: str = "brommawoodwedding"
    db_collection: str = "guests"
    jwt_secret: str = "7a622820781eff8983daebd5552995d510c674d870b5e02a332360e0e68ed985" # This is a placeholder secret for dev, replace it with your own.
    jwt_algorithm: str = "HS256"
    jwt_expires: int = 900

    # Anything in .env file, at the root of the Server folder will override the above default settings.
    model_config = SettingsConfigDict(env_file=".env")


@lru_cache()
def get_settings() -> Settings:
    return Settings()