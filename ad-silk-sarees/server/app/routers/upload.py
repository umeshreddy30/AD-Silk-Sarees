import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, File, UploadFile

from app.config import settings
from app.security import require_admin

router = APIRouter(prefix="/upload", tags=["Upload"])

cloudinary_ready = (
    settings.cloudinary_cloud_name
    and settings.cloudinary_api_key
    and settings.cloudinary_api_secret
    and not settings.cloudinary_cloud_name.startswith("your_")
    and not settings.cloudinary_api_key.startswith("your_")
    and not settings.cloudinary_api_secret.startswith("your_")
)

if cloudinary_ready:
    cloudinary.config(
        cloud_name=settings.cloudinary_cloud_name,
        api_key=settings.cloudinary_api_key,
        api_secret=settings.cloudinary_api_secret,
        secure=True,
    )


@router.post("/image")
async def upload_image(file: UploadFile = File(...), _: dict = Depends(require_admin)):
    if not cloudinary_ready:
        return {
            "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            "public_id": "sample",
            "message": "Cloudinary not configured. Add credentials in .env",
        }
    uploaded = cloudinary.uploader.upload(file.file, folder="ad-silk-sarees")
    return {
        "url": uploaded["secure_url"],
        "public_id": uploaded["public_id"],
        "message": "Uploaded successfully",
    }
