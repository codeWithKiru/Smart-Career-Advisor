import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
    timeout=30,
    max_retries=2
)

MODEL = "google/gemini-2.5-flash-lite"


def local_resume_analysis():

    return {

        "resumeScore": 82,

        "atsScore": 79,

        "strengths": [
            "Good technical foundation",
            "Project experience",
            "Problem solving skills"
        ],

        "weaknesses": [
            "Improve ATS keywords",
            "Improve resume formatting",
            "Add measurable achievements"
        ],

        "missingSkills": [
            "Docker",
            "AWS",
            "CI/CD",
            "System Design"
        ],

        "careerSuggestions": [
            "Software Developer",
            "AI Engineer",
            "Backend Developer"
        ],

        "learningRoadmap": [
            "Practice DSA",
            "Build Full Stack Projects",
            "Learn System Design",
            "Practice Mock Interviews"
        ],

        "jobMatch": [

            {
                "role": "AI Engineer",
                "match": 90
            },

            {
                "role": "Backend Developer",
                "match": 84
            },

            {
                "role": "Full Stack Developer",
                "match": 81
            }

        ],

        "salaryPrediction": "₹6 - ₹9 LPA",

        "interviewReadiness": 82,

        "resumeRewriteSuggestions": [

            {
                "original": "Worked on Flask project.",
                "improved": "Developed and deployed a Flask REST API integrated with AI-powered resume analysis."
            },

            {
                "original": "Used React.",
                "improved": "Built reusable React components with REST API integration and responsive UI."
            }

        ],

        "analysis":
        "AI service is temporarily unavailable. This fallback analysis has been generated locally.",

        "fallback": True

    }


def ask_ai(prompt):

    try:

        print("=" * 70)
        print(f"Using Model : {MODEL}")
        print("=" * 70)

        response = client.chat.completions.create(

            model=MODEL,

            messages=[

                {
                    "role": "system",

                    "content": """
You are Smart Career Advisor AI.

You are an expert in:

- Career Guidance
- Resume Review
- ATS Optimization
- Software Engineering
- AI Engineering
- Machine Learning
- Data Science
- Full Stack Development
- Interview Preparation

Always respond professionally.

For technical questions always respond using Markdown.

Use the following format whenever appropriate:

# Short Answer

# Detailed Explanation

# Key Points

# Example

# Interview Tips

# Common Mistakes

For resume analysis:

- Evaluate ATS compatibility
- Identify strengths
- Identify weaknesses
- Suggest missing skills
- Recommend suitable job roles
- Predict salary range
- Estimate interview readiness
- Suggest professional resume rewrites
"""
                },

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            temperature=0.3,

            max_tokens=2200

        )

        answer = response.choices[0].message.content

        if not answer:

            raise Exception(
                "Empty response received from AI."
            )

        print("AI Response Generated Successfully")

        return answer

    except Exception as e:

        print("=" * 70)
        print("OpenRouter Error")
        print(e)
        print("=" * 70)

        raise Exception(str(e))


def analyze_resume(resume_text):

    prompt = f"""
    You are an expert ATS Resume Analyzer and Career Coach.

    Analyze the following resume carefully.

    Return ONLY valid JSON.

    Format exactly like this:

    {{
        "resumeScore": 0,
        "atsScore": 0,
        "strengths": [],
        "weaknesses": [],
        "missingSkills": [],
        "careerSuggestions": [],
        "learningRoadmap": [],
        "jobMatch": [
            {{
                "role": "",
                "match": 0
            }},
            {{
                "role": "",
                "match": 0
            }},
            {{
                "role": "",
                "match": 0
            }}
        ],
        "salaryPrediction": "",
        "interviewReadiness": 0,
        "resumeRewriteSuggestions": [
            {{
                "original": "",
                "improved": ""
            }}
        ],
        "analysis": ""
    }}

   Evaluation Criteria

    Resume Score (100 Marks)

    - Resume Structure (10)
    - ATS Formatting (10)
    - Technical Skills (20)
    - Projects Quality (20)
    - Experience / Internship (15)
    - Certifications (5)
    - Achievements (5)
    - Communication & Presentation (10)
    - Overall Professionalism (5)

    ATS Score (100 Marks)

    Evaluate based on:

    - ATS-friendly headings
    - Relevant keywords
    - Technical skills
    - Experience
    - Projects
    - Formatting
    - Readability

    Interview Readiness

    Evaluate based on:

    - Technical knowledge
    - Project complexity
    - Problem-solving ability
    - Communication
    - Practical experience

    Job Match

    Compare the candidate against these roles:

    - AI Engineer
    - Full Stack Developer
    - Backend Developer
    - Frontend Developer
    - Python Developer
    - Data Analyst
    - Software Engineer

    Recommend ONLY the best three roles with realistic match percentages.

    Learning Roadmap

    Create a personalized roadmap based on missing skills and career goal.

    Salary Prediction

    Estimate a realistic fresher salary in Indian LPA based on the candidate's profile.

    Rules

    - Resume Score must be calculated based on resume quality, not guessed.
    - ATS Score must be calculated based on ATS compatibility, keywords, formatting, section headings and skills.
    - Interview Readiness must depend on projects, technical skills, communication and experience.
    - Resume Score, ATS Score and Interview Readiness must vary significantly for different resumes.
    - Return exactly THREE best matching job roles.
    - Job match percentages must depend on the candidate's skills, projects and technologies.
    - Do NOT use the same job recommendations for every resume.
    - Salary Prediction must be realistic for the Indian job market.
    - Learning Roadmap must be personalized based on the candidate's missing skills.
    - Resume Rewrite Suggestions must rewrite actual resume statements into stronger professional statements.
    - Strengths and Weaknesses must be specific to this resume.
    - Do not generate random percentages.
    - Return ONLY valid JSON.
    - Do NOT include markdown.
    - Do NOT wrap the JSON inside triple backticks.

    Resume

    {resume_text}
    """

    try:

        text = ask_ai(prompt)

        if text.startswith("```json"):

            text = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        elif text.startswith("```"):

            text = (
                text.replace("```", "")
                .strip()
            )

        result = json.loads(text)

        # ---------- Default Values ----------

        result.setdefault("resumeScore", 0)

        result.setdefault("atsScore", 0)

        result.setdefault("interviewReadiness", 0)

        result.setdefault("salaryPrediction", "Not Available")

        result.setdefault("analysis", "")

        result.setdefault("strengths", [])

        result.setdefault("weaknesses", [])

        result.setdefault("missingSkills", [])

        result.setdefault("careerSuggestions", [])

        result.setdefault("jobMatch", [])

        result.setdefault("resumeRewriteSuggestions", [])

        # ---------- Normalize Learning Roadmap ----------

        roadmap = result.get("learningRoadmap", [])

        if isinstance(roadmap, list):

            normalized = []

            for item in roadmap:

                if isinstance(item, str):

                    normalized.append(item)

                elif isinstance(item, dict):

                    if "steps" in item:

                        if isinstance(item["steps"], list):

                            normalized.extend(item["steps"])

                        else:

                            normalized.append(str(item["steps"]))

                    elif "step" in item:

                        normalized.append(item["step"])

                    elif "title" in item:

                        normalized.append(item["title"])

            result["learningRoadmap"] = normalized

        else:

            result["learningRoadmap"] = []

        result["fallback"] = False

        return result

    except Exception as e:

        print("=" * 70)
        print("Resume Analysis Error")
        print(e)
        print("=" * 70)

        return local_resume_analysis()