from services.parser import parse_email
from services.scraper import scrape_website
from services.cleaner import clean_text
from services.filter import filter_content
from services.summarizer import summarize_company
from services.nlp import extract_entities


def generate_context(email: str):

    parsed = parse_email(email)

    if "error" in parsed:
        return parsed

    scraped = scrape_website(parsed["domain"])

    if "error" in scraped:
        return scraped

    clean = clean_text(scraped["content"])

    filtered = filter_content(clean)

    summary = summarize_company(filtered)

    entities = extract_entities(summary)

    return {
        "recipient": {
            "first_name": parsed["first_name"],
            "last_name": parsed["last_name"],
            "email": email
        },
        "company": parsed["company"],
        "website": parsed["domain"],
        "summary": summary,
        "entities": entities
    }