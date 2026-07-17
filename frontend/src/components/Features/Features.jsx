import "./Features.css";

const features = [
  {
    icon: "📄",
    title: "Resume Analysis",
    description:
      "Upload your resume and receive an AI-powered ATS score with detailed improvement suggestions."
  },
  {
    icon: "🎯",
    title: "Skill Gap Detection",
    description:
      "Identify missing skills based on your target role and receive a personalized learning roadmap."
  },
  {
    icon: "🤖",
    title: "AI Career Chat",
    description:
      "Ask career-related questions and get instant AI guidance for jobs, interviews, and learning."
  },
  {
    icon: "💼",
    title: "Mock Interview",
    description:
      "Practice interview questions, receive AI feedback, and improve your confidence."
  }
];

function Features() {
  return (
    <section className="features-section">

      <h2>Everything You Need to Get Placed</h2>

      <p className="feature-subtitle">
        One platform for resume analysis, interview preparation,
        career guidance, and skill development.
      </p>

      <div className="features">

        {features.map((feature, index) => (
          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;