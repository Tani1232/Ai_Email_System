from fastapi import APIRouter
from pydantic import BaseModel

from services.scraper import scrape_website

router = APIRouter()


class DomainRequest(BaseModel):
    domain: str


@router.post("/scrape")
def scrape(request: DomainRequest):
    return scrape_website(request.domain)