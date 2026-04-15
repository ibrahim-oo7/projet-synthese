import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import "./style.css";

const ResultPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const result = location.state;

  useEffect(() => {
    if (!result) {
      window.scrollTo(0, 0);
      navigate(`/quiz/${id}`);
    }
  }, [result, navigate, id]);

  if (!result) return null;

  return (
    <>
     
      <div className="quiz-container">
        <div className="result-card">
          <h1 className="result-title">Quiz Result</h1>

          <h2 className={result.success ? "result-success" : "result-fail"}>
            {result.success ? "SUCCESS" : "FAILED"}
          </h2>

          <div className="result-info">
            <p>
              <strong>Score:</strong> {result.score} / {result.totalQuestions}
            </p>
            <p>
              <strong>Percentage:</strong> {result.percentage}%
            </p>
            <p>
              <strong>Passing score:</strong> 80%
            </p>
          </div>

          <div className="result-buttons">
            <button
              className="btn primary"
              onClick={() => { window.scrollTo(0, 0); navigate(`/quiz/${id}`); }}
            >
              Replay Quiz
            </button>
            {result.success && (
            <button
              className="btn secondary"
              onClick={() => { window.scrollTo(0, 0); navigate(`/certificate/${id}`); }}
            >
              View Certificate
            </button>
          )}

            <button
              className="btn secondary"
              onClick={() => { window.scrollTo(0, 0); navigate(`/course/${id}`); }}
            >
              Back to Course
            </button>

            {result.success && (
              <button
                className="btn secondary"
                onClick={() => { window.scrollTo(0, 0); navigate("/student/my-courses"); }}
              >
                View Courses
              </button>
              
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;