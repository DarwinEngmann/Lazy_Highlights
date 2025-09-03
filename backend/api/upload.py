import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File

from core.config import settings
from services.highlights import process_video
from utils.file_cleanup import cleanup_temp_files

router = APIRouter()

@router.post("/")
async def upload_video(file: UploadFile = File(...)):
    unique_id = str(uuid.uuid4())
    original_filename = f"{unique_id}_{file.filename}"
    original_filepath = os.path.join(settings.UPLOAD_DIR, original_filename)

    with open(original_filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = process_video(original_filepath, file.filename, unique_id)
        return result
    finally:
        cleanup_temp_files(original_filepath)
