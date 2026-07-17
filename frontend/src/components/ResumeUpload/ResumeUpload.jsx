import "./ResumeUpload.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from "../Dashboard/Dashboard";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {

      toast.error("Please upload a PDF resume.");

      e.target.value = "";

      return;

    }

    setResumeData(null);

    setFile(selectedFile);

  };

  const handleUpload = async () => {

    if (!file) {

      toast.error("Please select a resume.");

      return;

    }

    const formData = new FormData();

    formData.append("resume", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "https://smart-career-advisor-0wzj.onrender.com/api/upload",
        formData
      );

      setResumeData(response.data);

      toast.success("Resume analyzed successfully!");

      setTimeout(() => {

        document
          .getElementById("analysis-section")
          ?.scrollIntoView({

            behavior: "smooth"

          });

      }, 300);

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.error ||

        "Failed to analyze resume."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

      <section className="resume-upload">

        <h2>AI Resume Analyzer</h2>

        <p>

          Upload your resume and receive AI-powered career insights.

        </p>

        <div className="upload-box">

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          {file && (

            <p className="file-name">

              📄 {file.name}

            </p>

          )}

          <button

            onClick={handleUpload}

            disabled={loading}

          >

            {

              loading

                ? "🤖 Analyzing Resume..."

                : "Analyze Resume"

            }

          </button>

        </div>

      </section>

      {

        resumeData && (

          <div id="analysis-section">

            <Dashboard data={resumeData} />

          </div>

        )

      }

    </>

  );

}

export default ResumeUpload;