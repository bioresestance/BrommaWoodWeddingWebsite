from fastapi import APIRouter, Depends

from app.settings import get_settings, Settings
from app.models.generic_msg import GenericMsg

root_router = APIRouter()


@root_router.get("/")
def read_root(settings: Settings = Depends(get_settings)) -> GenericMsg:
    return GenericMsg(msg=f"You have successfully connected to the {settings.app_name} API.")