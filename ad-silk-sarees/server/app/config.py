from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from dotenv import load_dotenv


load_dotenv()


class Settings(BaseSettings):
    app_name: str = "AD Silk Sarees API"
    env: str = "development"
    api_prefix: str = "/api"
    mongo_uri: str = ""
    mongo_db_name: str = "ad_silk_sarees"
    jwt_secret: str = ""
    access_token_minutes: int = 60
    refresh_token_minutes: int = 60 * 24 * 7
    admin_email: str = "admin@adsilk.in"
    admin_password: str = ""
    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""
    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""
    cors_origins: List[str] = ["*"]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
