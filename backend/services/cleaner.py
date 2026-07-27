import re


def clean_text(text: str):

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)

    # Remove URLs
    text = re.sub(r"http\S+", "", text)

    # Remove emails
    text = re.sub(r"\S+@\S+", "", text)

    # Remove very short words
    words = text.split()

    words = [word for word in words if len(word) > 2]

    text = " ".join(words)

    return text