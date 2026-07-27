from fastapi import APIRouter
from pydantic import BaseModel

from services.parser import parse_email

router = APIRouter()


class EmailRequest(BaseModel):
    email: str


@router.post("/parse-email")
def parse(request: EmailRequest):
    return parse_email(request.email)