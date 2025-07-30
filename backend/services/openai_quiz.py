import openai
import os
import json
from models import QuizQuestion
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

PROMPT_TEMPLATE = """
From the text below, generate {num_questions} multiple choice questions with 4 alternatives each. Point out the correct answer in each case.

Text:
"{text}"

Answer format JSON:
[
  {{
    "question": "What is the capital of France?",
    "options": ["Paris", "Londres", "Berlim", "Madri"],
    "correctAnswer": "Paris"
  }},
  ...
]
"""

def generate_quiz_from_text(text: str, num_questions: int = 10) -> list[QuizQuestion]:
    prompt = PROMPT_TEMPLATE.format(text=text, num_questions=num_questions)

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    content = response.choices[0].message.content.strip()

    try:
        # Use json.loads instead of eval for safety
        parsed = json.loads(content)
        return [QuizQuestion(**q) for q in parsed]
    except Exception as e:
        raise ValueError(f"Error reading OpenAI API: {e}")
