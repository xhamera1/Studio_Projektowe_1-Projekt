from typing import List, Union

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Manages application settings using environment variables.
    """
    ALLOWED_ORIGINS: Union[str, List[str]] = "http://localhost:8080"

    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 5001
    APP_RELOAD: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'
        case_sensitive = True


settings = Settings()

if isinstance(settings.ALLOWED_ORIGINS, str):
    origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",")]
else:
    origins = settings.ALLOWED_ORIGINS
