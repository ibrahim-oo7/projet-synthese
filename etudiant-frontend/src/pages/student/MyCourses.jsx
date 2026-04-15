import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { courses } from "../../data/courses";
import CourseCard from "../../components/CourseCard";
import axios from "axios";

export default function MyCourses() {
  const { user } = useSelector((state) => state.auth);
  const myCoursesIds = useSelector((state) => state.enrollments.myCourses);
  const [coursesProgress, setCoursesProgress] = useState({});

  const myCourses = courses.filter(course =>
    myCoursesIds.includes(course.id)
  );

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return;

      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/progress/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const formattedProgress = {};
        res.data.forEach((item) => {
          formattedProgress[item.course_id] = item.percentage;
        });

        setCoursesProgress(formattedProgress);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchProgress();
  }, [user?.id]);

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
          <CourseCard key={course.id} course={course} progress={coursesProgress[course.id] || 0} />
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