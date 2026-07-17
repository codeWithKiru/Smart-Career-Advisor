import sqlite3
import os

DB_NAME = os.path.join(
    os.path.dirname(__file__),
    "career_advisor.db"
)


def get_connection():

    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row

    return conn


def initialize_database():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS resume_history (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        filename TEXT NOT NULL,

        resume_score INTEGER,

        ats_score INTEGER,

        analysis TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    """)

    conn.commit()
    conn.close()


def save_resume_analysis(
    filename,
    resume_score,
    ats_score,
    analysis
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO resume_history
    (
        filename,
        resume_score,
        ats_score,
        analysis
    )
    VALUES
    (?, ?, ?, ?)
    """, (
        filename,
        resume_score,
        ats_score,
        analysis
    ))

    conn.commit()
    conn.close()


def get_resume_history():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT *
    FROM resume_history
    ORDER BY created_at DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]


def get_resume_by_id(report_id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT *
    FROM resume_history
    WHERE id = ?
    """, (report_id,))

    row = cursor.fetchone()

    conn.close()

    if row:
        return dict(row)

    return None


initialize_database()