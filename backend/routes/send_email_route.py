from fastapi import APIRouter
from pydantic import BaseModel

from services.email_sender import send_email

router = APIRouter()


class SendRequest(BaseModel):

    recipient: str
    subject: str
    body: str


@router.post("/send-email")
def send(request: SendRequest):

    return send_email(
        request.recipient,
        request.subject,
        request.body
    )