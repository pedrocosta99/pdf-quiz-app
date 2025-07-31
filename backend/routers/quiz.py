from fastapi import APIRouter, HTTPException
from services.openai_quiz import generate_quiz_from_text
from models import QuizRequest, QuizResponse

router = APIRouter()

@router.post("/generate-quiz", response_model=QuizResponse)
async def generate_quiz(payload: QuizRequest):
    try:
        result = generate_quiz_from_text(payload.text, payload.questionCount)
        return QuizResponse(questions=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")
