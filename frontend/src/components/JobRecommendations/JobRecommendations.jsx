import "./JobRecommendations.css";

function JobRecommendations({ jobs }) {

  if (!jobs || jobs.length === 0) return null;

  return (

    <section className="jobs">

      <h2>🎯 Recommended Career Paths</h2>

      <div className="job-grid">

        {jobs.map((job, index) => (

          <div
            key={index}
            className="job-card"
          >

            <h3>
              {job.title || job.role}
            </h3>

            <div className="match-section">

              <p className="match-text">
                Match Score: <strong>{job.match || 80}%</strong>
              </p>

              <div className="match-bar">

                <div
                  className="match-fill"
                  style={{
                    width: `${job.match || 80}%`
                  }}
                />

              </div>

            </div>

            <p className="salary">

              💰 {job.salary || "₹6 - ₹12 LPA"}

            </p>

            <p>

              {job.description ||
                "A highly suitable career path based on your resume analysis."}

            </p>

            <div className="skills">

              {(job.skills || []).map((skill, i) => (

                <span key={i}>

                  {skill}

                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default JobRecommendations;