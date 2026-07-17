import "./CircularProgress.css";

function CircularProgress({ value, title, color }) {

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  return (

    <div className="circle-card">

      <svg
        height={radius * 2}
        width={radius * 2}
      >

        <circle
          className="circle-bg"
          stroke="#e2e8f0"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          className="circle-progress"
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

      </svg>

      <div className="circle-text">

        <h1>{value}%</h1>

        <p>{title}</p>

      </div>

    </div>

  );

}

export default CircularProgress;