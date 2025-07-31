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
        "id": "pmpt_688b70536f848195b51d13488b7fe2eb077d1b5b922b0d8a",
        "version": "1",
        "variables": {
          "questioncount": str(num_questions),
          "text": text
        }
      }
    )

    try:
        raw_json_text = response.output[0].content[0].text
        parsed = json.loads(raw_json_text)
        return parsed["questions"]
    except Exception as e:
        raise ValueError(f"Error reading OpenAI API")
    
