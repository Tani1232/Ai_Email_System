from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from config import SENDGRID_API_KEY




def send_email(to_email, subject, content):

    message = Mail(
        from_email="tanishqchavan241@gmail.com",
        to_emails=to_email,
        subject=subject,
        html_content=content.replace("\n", "<br>")
    )

    sg = SendGridAPIClient(SENDGRID_API_KEY)

    response = sg.send(message)

    return {
        "status": response.status_code
    }