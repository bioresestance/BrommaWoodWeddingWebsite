from datetime import datetime, timedelta
from typing import Annotated
from fastapi import Depends, HTTPException, Header, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.models.access_token import AccessToken, AccessTokenContents
from app.database.models import Admin as DBAdmin, Guest
from app.settings import get_settings, Settings
from app.security.hasher import Hasher
from app.models.users import Admin


oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="/admin/login")
# oauth2_scheme_guest = OAuth2PasswordBearer(tokenUrl="/login")


def encode_json_web_token(username:str, role:str, expires_time: timedelta | None = None) -> AccessToken:
    
    """Generates a JSON Web Token thats been encoded with needed data to verify authentication.

    Returns:
        AccessToken: Model containing the generated bearer token.
    """
    setting: Settings = get_settings()
    if expires_time:
        expire = datetime.utcnow() + expires_time
    else:
        expire = datetime.utcnow() + timedelta(minutes=setting.jwt_expires)
        
    # Attempt to encode the contents into the token.
    encoded_jwt = jwt.encode(dict(AccessTokenContents(sub=username, exp=expire, role=role)), setting.jwt_secret, algorithm=setting.jwt_algorithm)
    
    # Return the Access Token model, ready to be returned as is.
    return AccessToken(access_token=encoded_jwt, token_type="bearer")


def decode_json_web_token(token) -> AccessTokenContents | None:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    setting: Settings = get_settings()
    # Decode the token.
    try:
        payload = jwt.decode(token, setting.jwt_secret, algorithms=[setting.jwt_algorithm])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        expire: datetime = payload.get("exp")
        if username is None or role is None:
            raise credentials_exception
        token_data = AccessTokenContents(sub=username, exp=expire, role=role)
    except JWTError:
        raise credentials_exception
    return token_data


# async def get_current_guest(token: str = Depends(oauth2_scheme_guest)) -> AccessTokenContents:
#     """
#     Dependency to get the current user from the database based on the token.
#     """
#     return decode_json_web_token(token)


def get_current_admin(token: Annotated[str,Depends(oauth2_scheme_admin)]) -> Admin:
    """
    Dependency to get the current admin from the database based on the token.
    If the token is not an admin, this will return throw an HTTPException.
    """
    token_data = decode_json_web_token(token)
    if token_data.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You do not have permission to access this resource",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return Admin(username=token_data.sub)


def authenticate_admin(username:str, password: str) -> bool:
    """
    Authenticates the admin with the given username and password.
    """
    admin = DBAdmin.objects(username=username).first()
    if not admin:
        return False
    if not Hasher.verify_password(password, admin.password):
        return False
    return True