import "./ResumeHistory.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ResumeHistory() {

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {

    const filtered = history.filter((item) =>
      item.filename
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredHistory(filtered);

  }, [search, history]);

  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        "https://smart-career-advisor-0wzj.onrender.com/api/history"
      );

      setHistory(response.data);
      setFilteredHistory(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load history.");

    } finally {

      setLoading(false);

    }

  };

  const downloadReport = (id) => {

    window.open(
  `https://smart-career-advisor-0wzj.onrender.com/api/report/${id}`,
  "_blank"
);

  };

  const formatDate = (date) => {

    return new Date(date).toLocaleString("en-IN", {

      day: "2-digit",

      month: "short",

      year: "numeric",

      hour: "2-digit",

      minute: "2-digit"

    });

  };

  return (

    <section className="history-section">

      <h2>Resume Analysis History</h2>

      <input
        type="text"
        placeholder="🔍 Search resume..."
        className="history-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (

        <h3>Loading...</h3>

      ) : filteredHistory.length === 0 ? (

        <div className="empty-history">

          <h3>No Resume History Found</h3>

          <p>
            Analyze your first resume to see it here.
          </p>

        </div>

      ) : (

        <div className="history-grid">

          {filteredHistory.map((item) => (

            <div
              className="history-card"
              key={item.id}
            >

              <h3>{item.filename}</h3>

              <p>

                📄 Resume Score

                <strong>

                  {" "}

                  {item.resume_score}%

                </strong>

              </p>

              <p>

                🎯 ATS Score

                <strong>

                  {" "}

                  {item.ats_score}%

                </strong>

              </p>

              <p className="history-date">

                📅 {formatDate(item.created_at)}

              </p>

              <button
                className="download-btn"
                onClick={() => downloadReport(item.id)}
              >

                📥 Download PDF Report

              </button>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}

export default ResumeHistory;