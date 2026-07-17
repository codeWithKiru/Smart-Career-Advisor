import "./Analytics.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Analytics({ data }) {

  if (!data) return null;

  const scoreData = [
    {
      name: "Resume",
      value: data.resumeScore || 0
    },
    {
      name: "ATS",
      value: data.atsScore || 0
    },
    {
      name: "Interview",
      value: data.interviewReadiness || 0
    }
  ];

  const jobData =
    data.jobMatch?.map((job) => ({
      name: job.role,
      value: job.match
    })) || [];

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6"
  ];

  return (

    <section className="analytics">

      <h2>Analytics Dashboard</h2>

      <div className="analytics-grid">

        <div className="chart-card">

          <h3>Performance Scores</h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={scoreData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h3>Best Job Matches</h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={jobData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {jobData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>

  );

}

export default Analytics;