from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor


def create_resume_report(data, output_path):

    print(data)

    styles = getSampleStyleSheet()

    title = styles["Heading1"]
    title.alignment = TA_CENTER
    title.textColor = HexColor("#2563eb")

    heading = styles["Heading2"]
    normal = styles["BodyText"]

    pdf = SimpleDocTemplate(output_path)

    story = []

    story.append(
        Paragraph(
            "Smart Career Advisor",
            title
        )
    )

    story.append(
        Paragraph(
            "AI Resume Analysis Report",
            heading
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            f"<b>Resume Score:</b> {data['resume_score']}%",
            normal
        )
    )

    story.append(
        Paragraph(
            f"<b>ATS Score:</b> {data['ats_score']}%",
            normal
        )
    )

    story.append(Spacer(1, 15))

    story.append(
        Paragraph(
            "<b>AI Analysis</b>",
            heading
        )
    )

    story.append(
        Paragraph(
            data["analysis"],
            normal
        )
    )

    story.append(Spacer(1, 25))

    story.append(
        Paragraph(
            "Generated using Smart Career Advisor",
            normal
        )
    )

    pdf.build(story)