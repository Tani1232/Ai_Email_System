from fastapi import FastAPI

from routes.parser_route import router as parser_router
from routes.scraper_route import router as scraper_router
from routes.nlp_route import router as nlp_router
from routes.context_route import router as context_router
from routes.email_route import router as email_router
from routes.send_email_route import router as send_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Email Outreach API",
    version="1.0.0"
)

app.include_router(parser_router)
app.include_router(scraper_router)
app.include_router(nlp_router)
app.include_router(context_router)
app.include_router(email_router)
app.include_router(send_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "AI Email Outreach API is running!"}


@app.get("/health")
def health():
    return {"status": "running"}