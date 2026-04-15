import { NavLink,useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseSidebar = (props) => {
  const { module1Done, module2Done } = useSelector(
    state => state.course
  );
  const {id} = useParams();
  return (
    <aside className="course-sidebar">
      <h3>Course Content</h3>

      <ul>
        <li>
          <NavLink to={`/course/${id}/module1`} onClick={() => console.log(props.courseId)}>Module 1</NavLink>
        </li>

        <li className={!module1Done ? "disabled" : ""}>
          {module1Done ? (
            <NavLink  to={`/course/${id}/module2`}>Module 2</NavLink>
          ) : (
            <span>Module 2 🔒</span>
          )}
        </li>

        <li className={!module2Done ? "disabled" : ""}>
          {module2Done ? (
            <NavLink to={`/quiz/${id}`}>Quiz</NavLink>
          ) : (
            <span>Quiz 🔒</span>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default CourseSidebar;

