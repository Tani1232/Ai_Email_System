import re

from services.context_generator import generate_context
from prompts.prompt_builder import build_prompt
from services.llm import generate_email


def _ensure_sender_signature(email_text: str, sender_name: str) -> str:
    name = sender_name.strip()
    if not name:
        return email_text

    signature = f"Regards,\n{name}"
    if re.search(re.escape(name), email_text, re.IGNORECASE):
        return email_text

    if "Body:" in email_text:
        head, body = email_text.split("Body:", 1)
        return f"{head}Body:{body.rstrip()}\n\n{signature}"

    return f"{email_text.rstrip()}\n\n{signature}"


def generate_personalized_email(
    email: str,
    tone: str,
    length: str,
    objective: str,
    sender_name: str = "",
):

    # Generate company context
    context = generate_context(email)

    if "error" in context:
        return context

    # Build prompt using the new options
    prompt = build_prompt(
        context,
        tone,
        length,
        objective,
        sender_name,
    )

    # Generate email from Groq
    email_text = generate_email(prompt)
    email_text = _ensure_sender_signature(email_text, sender_name)

    return {
        "generated_email": email_text,
        "context": context
    }