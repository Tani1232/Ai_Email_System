IMPORTANT_WORDS = [

    "ai",
    "artificial",
    "machine",
    "learning",

    "cloud",

    "platform",

    "software",

    "technology",

    "product",

    "solution",

    "analytics",

    "automation",

    "developer",

    "research",

    "security",

    "business",

    "workspace",

    "gemini",

    "android",

    "chrome"

]


def filter_content(text):

    sentences = text.split(".")

    useful = []

    for sentence in sentences:

        lower = sentence.lower()

        if any(word in lower for word in IMPORTANT_WORDS):

            useful.append(sentence.strip())

    return ". ".join(useful)