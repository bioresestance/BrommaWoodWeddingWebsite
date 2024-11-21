from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from loguru import logger
import time

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Process the request
        response = await call_next(request)
        
        # Calculate the processing time
        process_time = time.time() - start_time
        
        # Log the request details
        logger.info(
            f"Request: {request.method} {request.url.path} from {request.client.host} - "
            f"Status: {response.status_code} - Process Time: {process_time:.2f}s"
        )
        
        return response