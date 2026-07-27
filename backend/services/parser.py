import re
import tldextract


def parse_email(email: str):
    # Validate email format
    if "@" not in email:
        return {"error": "Invalid email address"}

    # Split into username and domain
    username, domain = email.split("@", 1)

    # Extract company name
    extracted = tldextract.extract(domain)
    company = extracted.domain.capitalize()

    # Keep only letters and dots
    clean_username = re.sub(r"[^a-zA-Z.]", "", username)

    # Split into name parts
    parts = clean_username.split(".")

    first_name = ""
    last_name = ""

    if len(parts) >= 1:
        first_name = parts[0].capitalize()

    if len(parts) >= 2:
        last_name = parts[1].capitalize()

    return {
        "first_name": first_name,
        "last_name": last_name,
        "company": company,
        "domain": domain
    }