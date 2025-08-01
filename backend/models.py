from pydantic import BaseModel
from typing import List

class TextResponse(BaseModel):
    text: str

class QuizRequest(BaseModel):
    text: str
    questionCount: int

class Question(BaseModel):
    question: str
    options: List[str]
    correctAnswerIndex: int

class QuizResponse(BaseModel):
    questions: List[Question]
