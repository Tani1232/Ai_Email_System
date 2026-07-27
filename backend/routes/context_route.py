from fastapi import APIRouter
from pydantic import BaseModel

from services.context_generator import generate_context

router = APIRouter()


class EmailRequest(BaseModel):
    email: str


@router.post("/generate-context")
def context(request: EmailRequest):

    return generate_context(request.email)