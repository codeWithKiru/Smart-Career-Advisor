import "./Hero.css";
import heroImage from "../../assets/hero.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-badge">
          🚀 AI Powered Career Assistant
        </span>

        <h1>
          Build Your Dream Career with AI
        </h1>

        <p>
          Upload your resume, get an ATS score, discover missing skills,
          prepare for interviews, and receive personalized career guidance—
          all powered by AI.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/resume")}
          >
            🚀 Analyze Resume
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/chat")}
          >
            💬 AI Career Chat
          </button>
        </div>

      </div>

      <div className="hero-right">
        <img
          src={heroImage}
          alt="AI Career Advisor"
        />
      </div>

    </section>
  );
}

export default Hero;