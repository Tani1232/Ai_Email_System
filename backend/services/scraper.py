import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


KEYWORDS = [
    "about",
    "company",
    "products",
    "services",
    "solutions",
    "platform",
    "technology"
]


def clean_text(html):

    soup = BeautifulSoup(html, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    return soup.get_text(separator=" ", strip=True)


def scrape_page(url):

    try:

        response = requests.get(
            url,
            timeout=10,
            headers=HEADERS
        )

        return clean_text(response.text)

    except:

        return ""


def scrape_website(domain):

    base_url = f"https://{domain}"

    try:

        response = requests.get(
            base_url,
            timeout=10,
            headers=HEADERS
        )

        soup = BeautifulSoup(response.text, "html.parser")

        pages = [base_url]

        for link in soup.find_all("a", href=True):

            href = link["href"].lower()

            if any(keyword in href for keyword in KEYWORDS):

                pages.append(
                    urljoin(base_url, href)
                )

        pages = list(set(pages))

        all_text = ""

        for page in pages:

            print(page)

            all_text += scrape_page(page)

            all_text += "\n\n"

        return {
            "pages": pages,
            "content": all_text[:10000]
        }

    except Exception as e:

        return {
            "error": str(e)
        }