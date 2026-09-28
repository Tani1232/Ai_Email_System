from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def summarize_company(text):

    response = client.chat.completions.create(

        model="openai/gpt-oss-120b",

        messages=[

            {

                "role": "system",

                "content":
                "Summarize the company in less than 120 words. "
                "Mention products, services, technologies and industry."

            },

            {

                "role":"user",

                "content":text[:5000]

            }

        ]

    )

    return response.choices[0].message.content
