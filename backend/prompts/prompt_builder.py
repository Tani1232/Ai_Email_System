
def build_prompt(context, tone, length, objective, sender_name=""):

    sender_block = ""
    sign_off_rule = "- End with a CTA, then close the body with a professional sign-off."
    if sender_name and sender_name.strip():
        sender_block = f"""
Sender name (use in sign-off):
{sender_name.strip()}
"""
        sign_off_rule = (
            "- End with a CTA, then close the body with exactly this sign-off on two lines: "
            f"'Regards,' then '{sender_name.strip()}' on the next line."
        )

    return f"""
You are an expert B2B sales representative.

Recipient:
{context['recipient']['first_name']} {context['recipient']['last_name']}

Company:
{context['company']}

Company Summary:
{context['summary']}

Objective:
{objective}
{sender_block}
Tone:
{tone}

Length:
{length}

Organizations:
{', '.join(context['entities']['organizations'])}

People:
{', '.join(context['entities']['people'])}

Locations:
{', '.join(context['entities']['locations'])}

Generate:

1. A compelling email subject.
2. A personalized email body.

Rules:

- Mention something specific about the company.
- Do not sound robotic.
- Do not use placeholder names like [Your Name] in the sign-off.
{sign_off_rule}
- Output ONLY in this format:

Subject:
...

Body:
...
"""