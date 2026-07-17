import "./SkillGap.css";

function SkillGap({

  strengths = [],

  weaknesses = [],

  missingSkills = []

}) {

  const getStrengthWidth = (index) => {

    const values = [95, 90, 88, 85, 82];

    return values[index % values.length];

  };

  const getWeaknessWidth = (index) => {

    const values = [35, 45, 50, 55, 60];

    return values[index % values.length];

  };

  const getMissingWidth = (index) => {

    const values = [20, 30, 40, 50, 60];

    return values[index % values.length];

  };

  return (

    <section className="skill-gap">

      <h2>Skill Gap Analysis</h2>

      <div className="skill-container">

        {/* Strengths */}

        <div className="skill-box">

          <h3>💪 Your Strengths</h3>

          {strengths.map((skill, index) => (

            <div
              className="skill-item"
              key={index}
            >

              <div className="skill-header">

                <span>{skill}</span>

                <span>{getStrengthWidth(index)}%</span>

              </div>

              <div className="progress">

                <div
                  className="progress-fill strength"
                  style={{
                    width: `${getStrengthWidth(index)}%`
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Weaknesses */}

        <div className="skill-box">

          <h3>⚠ Skills to Improve</h3>

          {weaknesses.map((skill, index) => (

            <div
              className="skill-item"
              key={index}
            >

              <div className="skill-header">

                <span>{skill}</span>

                <span>{getWeaknessWidth(index)}%</span>

              </div>

              <div className="progress">

                <div
                  className="progress-fill weakness"
                  style={{
                    width: `${getWeaknessWidth(index)}%`
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Missing Skills */}

        {missingSkills.length > 0 && (

          <div className="skill-box">

            <h3>📚 Missing Skills</h3>

            {missingSkills.map((skill, index) => (

              <div
                className="skill-item"
                key={index}
              >

                <div className="skill-header">

                  <span>{skill}</span>

                  <span>{getMissingWidth(index)}%</span>

                </div>

                <div className="progress">

                  <div
                    className="progress-fill missing"
                    style={{
                      width: `${getMissingWidth(index)}%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}

export default SkillGap;