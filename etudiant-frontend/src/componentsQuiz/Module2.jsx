import { useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

const module2Content = [
  "The React useState Hook allows us to track state in a function component.",
  "State generally refers to data or properties that need to be tracked in an application.",
  "Import useState: To use the useState Hook, import it into your component.",
  "Example: import { useState } from 'react';",
  "We destructure useState from React as it is a named export.",
  "Initialize useState: Call useState in your function component.",
  "useState accepts an initial state and returns two values: current state and a function to update it.",
  "Example: const [color, setColor] = useState('red');",
  "The first value is the current state (color).",
  "The second value is the function to update the state (setColor).",
  "These variable names can be anything you like.",
  "The initial state in this example is set to 'red'.",
  "We can update the state by calling setColor with a new value.",
  "useState allows components to remember values between renders.",
  "Multiple useState hooks can be used in a single component for different pieces of state.",
  "State updates cause the component to re-render with the new values.",
  "Using useState correctly is essential for interactive React applications.",
  "Remember: state updates are asynchronous, so plan logic accordingly.",
  "Hooks like useState work only in function components, not class components.",
  "Mastering useState is the foundation for learning more advanced React hooks."
];

const Module2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const finishModule = () => {
    dispatch({ type: "FINISH_MODULE_2" });
    window.scrollTo(0, 0);
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="module-page">
      <div className="module-card">
        <h2>Module 2: React useState Hook</h2>

        <video controls className="module-video">
          <source src="/videos/vid2.mp4" type="video/mp4" />
        </video>

        {module2Content.map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        <button onClick={finishModule}>
          Finish Module 2 → Quiz
        </button>
      </div>
    </div>
  );
};

export default Module2;

