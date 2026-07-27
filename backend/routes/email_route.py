from fastapi import APIRouter
from pydantic import BaseModel

from services.email_generator import generate_personalized_email

router = APIRouter()


class EmailRequest(BaseModel):
    email: str
    tone: str
    length: str
    objective: str
    sender_name: str = ""


@router.post("/generate-email")
def generate(request: EmailRequest):

    return generate_personalized_email(
        request.email,
        request.tone,
        request.length,
        request.objective,
        request.sender_name,
    )