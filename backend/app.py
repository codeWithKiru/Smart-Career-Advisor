from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import pdfplumber


from gemini_service import analyze_resume, ask_ai

from database.database import save_resume_analysis, get_resume_history, get_resume_by_id

from pdf_generator import create_resume_report

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------------------
# Interview Session Storage
# -------------------------------

interview_sessions = {}


@app.route("/")
def home():
    return "Smart Career Advisor Backend Running!"


# ==========================================
# Resume Analyzer
# ==========================================


@app.route("/api/upload", methods=["POST"])
def upload_resume():

    try:

        if "resume" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["resume"]

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)

        file.save(filepath)

        resume_text = ""

        with pdfplumber.open(filepath) as pdf:

            for page in pdf.pages:

                text = page.extract_text()

                if text:
                    resume_text += text + "\n"

        result = analyze_resume(resume_text)

        save_resume_analysis(
            filename=file.filename,
            resume_score=result["resumeScore"],
            ats_score=result["atsScore"],
            analysis=result["analysis"],
        )

        return jsonify(result)

    except Exception as e:

        print(e)

        return jsonify({"error": str(e)}), 500


# ==========================================
# Resume History
# ==========================================


@app.route("/api/history", methods=["GET"])
def history():

    try:

        return jsonify(get_resume_history())

    except Exception as e:

        return jsonify({"error": str(e)}), 500


# ==========================================
# AI Career Chat
# ==========================================


@app.route("/api/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        question = data.get("question", "").strip()

        if question == "":
            return jsonify({"error": "Question required."}), 400

        prompt = f"""
You are Smart Career Advisor AI.

You are an expert in Career Guidance,
Resume Review,
Software Engineering,
AI,
Machine Learning,
Interview Preparation.

Answer professionally.

Question:

{question}
"""

        answer = ask_ai(prompt)

        return jsonify({"answer": answer})

    except Exception as e:

        return jsonify({"error": str(e)}), 500


# ==========================================
# Multi Question Interview
# ==========================================


@app.route("/api/interview/start", methods=["POST"])
def start_interview():

    try:

        role = request.json["role"]

        prompt = f"""
Generate FIVE technical interview questions
for a {role}.

Return ONLY the questions.

Format:

1.
2.
3.
4.
5.
"""

        questions = ask_ai(prompt)

        question_list = []

        for line in questions.split("\n"):

            line = line.strip()

            if (
                line.startswith("1")
                or line.startswith("2")
                or line.startswith("3")
                or line.startswith("4")
                or line.startswith("5")
            ):

                question_list.append(line[2:].strip())

        if len(question_list) == 0:

            question_list = [questions]

        session_id = str(len(interview_sessions) + 1)

        interview_sessions[session_id] = {
            "role": role,
            "questions": question_list,
            "answers": [],
        }

        return jsonify({"sessionId": session_id, "questions": question_list})

    except Exception as e:

        return jsonify({"error": str(e)}), 500


# ==========================================
# Multi Question Interview Evaluation
# ==========================================


@app.route("/api/interview/evaluate", methods=["POST"])
def evaluate():

    try:

        data = request.get_json()

        session_id = data["sessionId"]

        answer = data["answer"]

        if session_id not in interview_sessions:

            return jsonify({"error": "Interview session not found."}), 404

        session = interview_sessions[session_id]

        session["answers"].append(answer)

        current_question = len(session["answers"])

        total_questions = len(session["questions"])

        # -------------------------------------
        # More questions remaining
        # -------------------------------------

        if current_question < total_questions:

            return jsonify(
                {
                    "completed": False,
                    "questionNumber": current_question + 1,
                    "question": session["questions"][current_question],
                }
            )

        # -------------------------------------
        # Interview Completed
        # -------------------------------------

        interview_text = ""

        for i in range(total_questions):

            interview_text += f"""

Question {i + 1}

{session["questions"][i]}

Candidate Answer

{session["answers"][i]}

"""

        prompt = f"""
You are a Senior Technical Interviewer.

Evaluate this complete interview.

Role:

{session["role"]}

Interview:

{interview_text}

Return your response in Markdown.

# Overall Score

Give score out of 10.

# Technical Skills

Evaluate technical knowledge.

# Communication

Evaluate communication.

# Strengths

Provide bullet points.

# Weaknesses

Provide bullet points.

# Suggestions

Provide improvement tips.

# Final Verdict

Would you hire this candidate?
Why?
"""

        feedback = ask_ai(prompt)

        del interview_sessions[session_id]

        return jsonify({"completed": True, "feedback": feedback})

    except Exception as e:

        print(e)

        return jsonify({"error": str(e)}), 500


@app.route("/api/report/<int:report_id>", methods=["GET"])
def download_report(report_id):

    try:

        print("Requested Report ID:", report_id)

        report = get_resume_by_id(report_id)

        print("Database Result:", report)  

        if report is None:

            return jsonify({"error": "Report not found."}), 404

        filename = f"Resume_Report_{report_id}.pdf"

        output_path = os.path.join(UPLOAD_FOLDER, filename)

        create_resume_report(report, output_path)

        return send_file(output_path, as_attachment=True)

    except Exception as e:

        print(e)

        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
