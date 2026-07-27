from fastapi import APIRouter
from pydantic import BaseModel

from services.nlp import extract_entities

router = APIRouter()


class TextRequest(BaseModel):
    text: str


@router.post("/extract-entities")
def extract(request: TextRequest):

    return extract_entities(request.text)