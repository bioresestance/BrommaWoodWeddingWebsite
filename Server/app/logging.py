import sys
import logging
from loguru import logger

########################################################################################################################
# Intercept the uvicorn logger and redirect it to Loguru
########################################################################################################################
class InterceptHandler(logging.Handler):
    def emit(self, record):
        # Get corresponding Loguru level if it exists
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the log message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        log_message = f"{record.name.split(".")[0]}: {record.getMessage()}"
        logger.opt(depth=depth, exception=record.exc_info).log(level, log_message)

logging.basicConfig(handlers=[InterceptHandler()], level=0)

# Override Uvicorn's logger
uvicorn_logger = logging.getLogger("uvicorn")
uvicorn_logger.handlers = [InterceptHandler()]

########################################################################################################################
# Loguru logger configuration
########################################################################################################################
logger.remove()  # Remove the default logger

default_format = "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"


# Add a new logger that outputs to the console
logger.add(sys.stdout, format=default_format, level="DEBUG")

# Add a new logger that outputs to a file
logger.add("logs/BrommaWoodWedding/debug.log", format=default_format, level="INFO", rotation="1 day")
