import "./LearningRoadmap.css";

function LearningRoadmap({ roadmap }) {

  if (!Array.isArray(roadmap) || roadmap.length === 0) {
    return null;
  }

  return (
    <section className="roadmap">

      <h2>Learning Roadmap</h2>

      <div className="roadmap-container">

        {roadmap.map((item, index) => (

          <div
            key={index}
            className="roadmap-step"
          >

            <div className="circle">
              {index + 1}
            </div>

            <div className="content">

              {/* If AI returns a simple string */}
              {typeof item === "string" && (
                <>
                  <h3>Step {index + 1}</h3>
                  <p>{item}</p>
                </>
              )}

              {/* If AI returns an object */}
              {typeof item === "object" && item !== null && (
                <>
                  <h3>{item.area}</h3>

                  <ul>
                    {(item.steps || []).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </>
              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );

}

export default LearningRoadmap;