import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import {
  fetchAllCourses,
  fetchMyEnrollments,
  fetchStudentProgressByUser,
  normalizeCourse
} from "../../services/courseApi";

export default function MyCourses() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myCourses, setMyCourses] = useState([]);
  const [coursesProgress, setCoursesProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyCourses = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const [enrollmentsData, allCoursesData, progressData] = await Promise.all([
          fetchMyEnrollments(),
          fetchAllCourses(),
          fetchStudentProgressByUser(user.id),
        ]);

        const enrollments = Array.isArray(enrollmentsData)
          ? enrollmentsData
          : enrollmentsData.enrollments || [];

        const enrolledIds = enrollments.map((item) =>
          Number(item.course_id || item.id)
        );

        const allCourses = (Array.isArray(allCoursesData)
          ? allCoursesData
          : allCoursesData.data || []
        ).map(normalizeCourse);

        const filteredCourses = allCourses.filter((course) =>
          enrolledIds.includes(Number(course.id))
        );

        const formattedProgress = {};
        (Array.isArray(progressData) ? progressData : progressData.progress || []).forEach((item) => {
          formattedProgress[item.course_id] = item.percentage;
        });

        setMyCourses(filteredCourses);
        setCoursesProgress(formattedProgress);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMyCourses();
  }, [user?.id]);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</h2>;
  }

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
        {myCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={coursesProgress[course.id] || 0}
            isEnrolled={true}
          />
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