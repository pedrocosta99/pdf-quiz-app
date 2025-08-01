from openai import OpenAI
import os
import json
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_quiz_from_text(text: str, num_questions: int):
    response = client.responses.create(
      prompt={
        "id": "pmpt_688cd86a74648196b1d6366a7301670e032ae3cfe6eb081e",
        "version": "1",
      },
      input=f"text:{text} questioncount:{num_questions}",
    )

    try:
        raw_json_text = response.output[0].content[0].text
        parsed = json.loads(raw_json_text)
        return parsed["questions"]
    except Exception as e:
        raise ValueError(f"Error reading OpenAI API")
    
