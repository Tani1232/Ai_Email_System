from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def generate_email(prompt: str):

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert sales representative who writes "
                    "professional, personalized B2B outreach emails."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.7,
        max_tokens=400,
    )

    return response.choices[0].message.content