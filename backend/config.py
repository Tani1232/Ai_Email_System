import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# API Keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")