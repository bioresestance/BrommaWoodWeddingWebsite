from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, Header, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.models.access_token import AccessToken, AccessTokenContents
from app.settings import get_settings, Settings

setting: Settings = get_settings()
oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="admin/login")
oauth2_scheme_guest = OAuth2PasswordBearer(tokenUrl="login")


def encode_json_web_token(username:str, role:str, expires_time: timedelta | None = None) -> AccessToken:
    
    """Generates a JSON Web Token thats been encoded with needed data to verify authentication.

    Returns:
        AccessToken: Model containing the generated bearer token.
    """
    
    if expires_time:
        expire = datetime.now(datetime.UTC) + expires_time
    else:
        expire = datetime.now(datetime.UTC) + timedelta(minutes=setting.jwt_expires)
        
    # Attempt to encode the contents into the token.
    encoded_jwt = jwt.encode(dict(AccessTokenContents(username=username, exp=expire, role=role)), setting.jwt_secret, algorithm=setting.jwt_algorithm)
    
    # Return the Access Token model, ready to be returned as is.
    return AccessToken(access_token=encoded_jwt)


def decode_json_web_token(token) -> AccessTokenContents | None:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Decode the token.
    try:
        payload = jwt.decode(token, setting.jwt_secret, algorithms=[setting.jwt_algorithm])
        username: str = payload.get("username")
        role: str = payload.get("role")
        expire: datetime = payload.get("exp")
        if username is None or role is None:
            raise credentials_exception
        token_data = AccessTokenContents(sub=username, exp=expire, role=role)
    except JWTError:
        raise credentials_exception
    return token_data


def get_current_guest(token: str = Depends(oauth2_scheme_guest)) -> AccessTokenContents:
    """
    Dependency to get the current user from the database based on the token.
    """
    return decode_json_web_token(token)


def get_current_admin(token: str = Depends(oauth2_scheme_admin) ) -> AccessTokenContents:
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
    return token_data