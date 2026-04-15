import CourseSidebar from "./CourseSidebar";
import { Outlet } from "react-router-dom";

const Course = () => {
  return (
    <>
    <div className="course-layout">
      <CourseSidebar />
      <div className="course-content">
        <Outlet />
      </div>
    </div></>
  );
};

export default Course;
