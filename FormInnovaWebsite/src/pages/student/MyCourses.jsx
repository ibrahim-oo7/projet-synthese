import { useSelector } from "react-redux";
import { courses } from "../../data/courses";
import CourseCard from "../../components/CourseCard";

export default function MyCourses() {
  const myCoursesIds = useSelector((state) => state.enrollments.myCourses);

  const myCourses = courses.filter(course =>
    myCoursesIds.includes(course.id)
  );

  if (myCourses.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
        You haven't enrolled in any course yet 😢
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Courses</h2>

      <div style={styles.grid}>
        {myCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
  },
  title: {
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
};