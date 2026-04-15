import { useNavigate,useParams } from "react-router-dom";

const CourseIntro = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  return (
    <div className="course-intro-page">
  <div className="course-intro-card">
    <h1 className="course-intro-title">React Fundamentals</h1>

    <p className="course-intro-description">
      Learn the basics of React: components, JSX, props, state and
      application structure.
    </p>

    <ul className="course-intro-list">
      <li>Modules: 2 + Quiz</li>
      <li>Duration: 4 hours</li>
      <li>Level: Beginner</li>
      <li>Price: 100 DH</li>
    </ul>

    <button
      className="course-start-btn"
      onClick={() => { window.scrollTo(0, 0); navigate(`/course/${id}/module1`); }}
    >
      Start Module 1
    </button>
  </div>
</div>
  );
};

export default CourseIntro;
