import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./style.css";

const QuizPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));


  const [loading, setLoading] = useState(false);

  const questions = useSelector((state) => state.quiz.questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentQuestionIndex];

  const answer = (option) => {
    if (answered) return;
    setSelected(option);
  };

 const viewAnswer = () => {
  if (!selected) return;
  setAnswered(true);
  setShowFeedback(true);
};

 const saveQuizResult = async (finalScore) => {
  const token = localStorage.getItem("token");
  const totalQuestions = questions.length;
  const percentage = Math.round((finalScore / totalQuestions) * 100);
  const isPassed = percentage >= 80;

  try {
    setLoading(true);

    await axios.post(
      "http://127.0.0.1:8000/api/quiz-results",
      {
        course_id: Number(id),
        score: finalScore,
        total_questions: totalQuestions,
        percentage: percentage,
        is_passed: isPassed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    window.scrollTo(0, 0);
    navigate(`/result/${id}`, {
      state: {
        score: finalScore,
        totalQuestions,
        percentage,
        success: isPassed,
      },
    });
  } catch (error) {
    console.log("Save error:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};

 const next = async () => {
  const isCorrect = selected === question.correctAnswer;
  const updatedScore = isCorrect ? score + 1 : score;

  const isLastQuestion = currentQuestionIndex + 1 === questions.length;

  if (isLastQuestion) {
    await saveQuizResult(updatedScore);
    return;
  }

  setScore(updatedScore);
  setCurrentQuestionIndex(prev => prev + 1);
  setSelected(null);
  setAnswered(false);
  setShowFeedback(false);
};

  if (!questions || questions.length === 0) {
    return (
      <>
      
        <div className="quiz-page">
          <div className="quiz-card">
            <h2>No questions available</h2>
          </div>
        </div>
      </>
    );
  }

  const isLastQuestion = currentQuestionIndex + 1 === questions.length;
  const progressPercentage = Math.round(
    ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100
  );

  return (
    <>
      <div className="quiz-page">
        <div className="quiz-card">
          <h1 className="quiz-title">React Quiz</h1>

          <p className="quiz-question-count">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <h3 className="quiz-question">{question.question}</h3>

          <div className="options">
            {question.options.map((opt, i) => (
              <label
                key={i}
                className={`option ${selected === opt ? "selected" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={selected === opt}
                  disabled={answered}
                  onChange={() => answer(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          {!answered && (
            <button
              className="btn primary"
              onClick={viewAnswer}
              disabled={!selected || loading}
            >
              View Answer
            </button>
          )}

          {showFeedback && (
            <div className="feedback">
              <p className={selected === question.correctAnswer ? "success" : "fail"}>
                {selected === question.correctAnswer
                  ? "Correct Answer"
                  : "Wrong Answer"}
              </p>

              <button
                className="btn secondary"
                onClick={next}
                disabled={loading}
              >
                {loading ? "Saving..." : isLastQuestion ? "View Result" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;