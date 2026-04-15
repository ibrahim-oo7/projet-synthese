import React from "react";

export default function LessonCard({ lesson, isActive }) {
  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: isActive ? "#e6f0ff" : "#fff",
        border: isActive ? "1px solid #4a90e2" : "1px solid #ddd",
        transition: "0.3s"
      }}
    >
      <h4 style={{ margin: 0, fontSize: "14px" }}>
        {lesson.title}
      </h4>
    </div>
  );
}