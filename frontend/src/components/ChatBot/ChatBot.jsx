import "./ChatBot.css";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

function ChatBot() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question.trim()) {

      toast.error("Please enter your question.");

      return;

    }

    try {

      setLoading(true);

      setAnswer("");

      const response = await axios.post(

        "https://smart-career-advisor-0wzj.onrender.com/api/chat",

        {

          question: question

        }

      );

      setAnswer(response.data.answer);

      toast.success("Response generated!");

      setQuestion("");

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.error ||

        "Failed to get AI response."

      );

    }

    finally {

      setLoading(false);

    }

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      askAI();

    }

  };

  const copyAnswer = async () => {

    try {

      await navigator.clipboard.writeText(answer);

      toast.success("Copied to clipboard!");

    }

    catch {

      toast.error("Unable to copy.");

    }

  };

  const clearChat = () => {

    setQuestion("");

    setAnswer("");

    toast.success("Chat cleared.");

  };

  return (

    <section
      id="chat-section"
      className="chatbot"
    >

      <h2>AI Career Chat</h2>

      <p>

        Ask anything about careers, interviews, resume building,
        placements, skills or higher studies.

      </p>

      <textarea

        value={question}

        onChange={(e) => setQuestion(e.target.value)}

        onKeyDown={handleKeyDown}

        placeholder="Example: How do I become an AI Engineer?"

      />

      <div className="chat-buttons">

        <button

          onClick={askAI}

          disabled={loading}

        >

          {

            loading

              ? "🤖 Thinking..."

              : "Ask AI"

          }

        </button>

        <button

          className="clear-btn"

          onClick={clearChat}

        >

          Clear

        </button>

      </div>

      {

        loading && (

          <div className="answer-box">

            <h3>

              🤖 AI is thinking...

            </h3>

            <p>

              Please wait a few seconds.

            </p>

          </div>

        )

      }

      {

        !loading && answer && (

          <div className="answer-box">

            <div className="answer-header">

              <h3>

                AI Response

              </h3>

              <button

                className="copy-btn"

                onClick={copyAnswer}

              >

                📋 Copy

              </button>

            </div>

            <ReactMarkdown>

              {answer}

            </ReactMarkdown>

          </div>

        )

      }

    </section>

  );

}

export default ChatBot;