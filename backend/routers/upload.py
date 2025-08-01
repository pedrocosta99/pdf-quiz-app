from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from services.pdf_reader import extract_text_from_pdf
from models import TextResponse
import uuid
import os
import shutil

router = APIRouter()

@router.post("/transcribe-pdf", response_model=TextResponse)
async def transcribe_pdf(
    file: UploadFile = File(...),
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File should be a .pdf")

    temp_filename = f"temp_{uuid.uuid4()}.pdf"

    try:
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        text = extract_text_from_pdf(temp_filename)

        return TextResponse(text=text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing pdf file: {str(e)}")

    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
