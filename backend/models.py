from pydantic import BaseModel
from typing import List

class TextResponse(BaseModel):
    text: str

class QuizRequest(BaseModel):
    text: str

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    correctAnswer: str

class QuizResponse(BaseModel):
    questions: List[QuizQuestion]
