import "./MockInterview.css";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

function MockInterview() {

  const [role, setRole] = useState("AI Engineer");

  const [sessionId, setSessionId] = useState("");

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const [completed, setCompleted] = useState(false);

  const startInterview = async () => {

    try {

      setLoading(true);

      setSessionId("");

      setQuestions([]);

      setCurrentQuestion(0);

      setFeedback("");

      setCompleted(false);

      setAnswer("");

      const response = await axios.post(
        "https://smart-career-advisor-0wzj.onrender.com/api/interview/start",
        {
          role: role
        }
      );

      setSessionId(response.data.sessionId);

      setQuestions(response.data.questions);

      toast.success("Interview started!");

      setCurrentQuestion(0);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.error ||
        "Unable to start interview."
      );

    } finally {

      setLoading(false);

    }

  };


  const nextQuestion = async () => {

    if (!answer.trim()) {

      toast.error("Please enter your answer.");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(
        "https://smart-career-advisor-0wzj.onrender.com/api/interview/evaluate",
        {
          sessionId: sessionId,
          answer: answer
        }
      );

      if (response.data.completed) {

        setCompleted(true);

        setFeedback(response.data.feedback);

        setSessionId("");

        toast.success("Interview completed!");

      } else {

        setCurrentQuestion((prev) => prev + 1);

        setAnswer("");

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.error ||
        "Evaluation Failed."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <section className="mock-interview">

      <h2>AI Mock Interview</h2>

      <p>
        Complete all five interview questions and receive a final AI evaluation.
      </p>

      <select
        value={role}
        disabled={questions.length > 0 && !completed}
        onChange={(e) => setRole(e.target.value)}
      >

        <option>AI Engineer</option>

        <option>Full Stack Developer</option>

        <option>Frontend Developer</option>

        <option>Backend Developer</option>

        <option>Data Analyst</option>

        <option>Python Developer</option>

      </select>

      <button
        onClick={startInterview}
        disabled={loading || (questions.length > 0 && !completed)}
      >
        {loading ? "Generating Questions..." : "Start Interview"}
      </button>

      {questions.length > 0 && !completed && (

        <div className="question-box">

          <h3>
            Question {currentQuestion + 1} of {questions.length}
          </h3>

          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#e2e8f0",
              borderRadius: "20px",
              marginBottom: "25px"
            }}
          >

            <div
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                height: "100%",
                background: "#2563eb",
                borderRadius: "20px",
                transition: ".4s"
              }}
            />

          </div>

          <p>

            {questions[currentQuestion]}

          </p>

          <textarea

            placeholder="Type your answer here..."

            value={answer}

            onChange={(e) => setAnswer(e.target.value)}

          />

          <button

            onClick={nextQuestion}

            disabled={loading}

          >

            {

              loading

                ? "Evaluating..."

                : currentQuestion === questions.length - 1

                  ? "Finish Interview"

                  : "Next Question"

            }

          </button>

        </div>

      )}

      {completed && (

        <div className="feedback-box">

          <h3>

            🎉 Interview Completed

          </h3>

          <ReactMarkdown>

            {feedback}

          </ReactMarkdown>

          <button

            style={{

              marginTop: "30px"

            }}

            onClick={() => {

              setSessionId("");

              setQuestions([]);

              setCurrentQuestion(0);

              setCompleted(false);

              setFeedback("");

              setAnswer("");

              setRole("AI Engineer");

            }}

          >

            Start New Interview

          </button>

        </div>

      )}

    </section>

  );

}

export default MockInterview;