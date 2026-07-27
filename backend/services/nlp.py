import spacy

nlp = spacy.load("en_core_web_sm")


def extract_entities(text):

    doc = nlp(text)

    organizations = set()
    people = set()
    locations = set()

    for ent in doc.ents:

        if ent.label_ == "ORG":
            organizations.add(ent.text)

        elif ent.label_ == "PERSON":
            people.add(ent.text)

        elif ent.label_ in ["GPE", "LOC"]:
            locations.add(ent.text)

    return {
        "organizations": sorted(list(organizations)),
        "people": sorted(list(people)),
        "locations": sorted(list(locations))
    }