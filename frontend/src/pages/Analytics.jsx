import "./Analytics.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

  const [stats, setStats] = useState({
    total: 0,
    averageResume: 0,
    averageATS: 0,
    highest: 0,
    lowest: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    try {

      const response = await axios.get(
        "https://smart-career-advisor-0wzj.onrender.com/api/history"
      );

      const history = response.data;

      if (history.length === 0) return;

      const resumeScores = history.map(
        item => item.resume_score
      );

      const atsScores = history.map(
        item => item.ats_score
      );

      const averageResume =
        resumeScores.reduce((a, b) => a + b, 0) /
        resumeScores.length;

      const averageATS =
        atsScores.reduce((a, b) => a + b, 0) /
        atsScores.length;

      setStats({

        total: history.length,

        averageResume: averageResume.toFixed(1),

        averageATS: averageATS.toFixed(1),

        highest: Math.max(...resumeScores),

        lowest: Math.min(...resumeScores)

      });

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <section className="analytics">

      <h1>Analytics Dashboard</h1>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h2>{stats.total}</h2>
          <p>Total Resume Analyses</p>
        </div>

        <div className="analytics-card">
          <h2>{stats.averageResume}%</h2>
          <p>Average Resume Score</p>
        </div>

        <div className="analytics-card">
          <h2>{stats.averageATS}%</h2>
          <p>Average ATS Score</p>
        </div>

        <div className="analytics-card">
          <h2>{stats.highest}%</h2>
          <p>Highest Resume Score</p>
        </div>

        <div className="analytics-card">
          <h2>{stats.lowest}%</h2>
          <p>Lowest Resume Score</p>
        </div>

      </div>

    </section>

  );

}

export default Analytics;