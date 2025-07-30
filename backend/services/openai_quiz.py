import openai
import os
from models import QuizQuestion

openai.api_key = os.getenv("TODO: resgatar minha key")

PROMPT_TEMPLATE = """
From the text below, generate 10 multiple choice questions with 4 alternatives each. Point out the correct answer in each case.

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

def generate_quiz_from_text(text: str) -> list[QuizQuestion]:
    prompt = PROMPT_TEMPLATE.format(text=text)

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    content = response.choices[0].message.content.strip()

    try:
        parsed = eval(content)  # json.loads ???? ou nao
        return [QuizQuestion(**q) for q in parsed]
    except Exception as e:
        raise ValueError(f"Error reading OpenAI API: {e}")
