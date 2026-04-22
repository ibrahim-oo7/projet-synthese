import { FaStar, FaClock, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, progress = 0, isEnrolled = false }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!course) {
    return (
      <h2 style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
        Course not found
      </h2>
    );
  }

  const image =
    course.course_image ||
    course.image ||
    "https://via.placeholder.com/400x240?text=Course";

  const teacherName =
    course.teacher?.name ||
    course.teacher?.full_name ||
    course.instructor ||
    "Unknown instructor";

  const category = course.category || "General";
  const level = course.level || "Beginner";
  const rating = Number(course.rating || 0).toFixed(1);

  const lessonsCount = Array.isArray(course.lessons) ? course.lessons.length : 0;

  const totalDurationMinutes = Array.isArray(course.lessons)
    ? course.lessons.reduce((sum, lesson) => sum + Number(lesson.duration || 0), 0)
    : 0;

  const durationText =
    totalDurationMinutes > 0 ? `${totalDurationMinutes} min` : "N/A";

  const handleEnroll = () => {
    if (!token) {
      window.scrollTo(0, 0);
      navigate("/login");
      return;
    }

    window.scrollTo(0, 0);

    if (isEnrolled) {
      navigate(`/course/${course.id}`);
    } else {
      navigate(`/Enroll/${course.id}`);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={image} alt={course.title} style={styles.image} />
        <span style={styles.badge}>{level}</span>
      </div>

      {progress > 0 && (
        <div style={styles.progressContainer}>
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>Progress</span>
            <span style={styles.progressLabel}>{progress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div style={styles.content}>
        <div style={styles.topInfo}>
          <span style={styles.category}>{category}</span>
        </div>

        <h3 style={styles.title}>{course.title}</h3>
        <p style={styles.instructor}>By {teacherName}</p>

        <p style={styles.description}>
          {course.description?.length > 100
            ? `${course.description.slice(0, 100)}...`
            : course.description || "No description available."}
        </p>

        <div style={styles.meta}>
          <div style={styles.metaItem}>
            <FaStar style={styles.starIcon} />
            <span>{rating}</span>
          </div>

          <div style={styles.metaItem}>
            <FaUserGraduate style={styles.metaIcon} />
            <span>{lessonsCount} lessons</span>
          </div>

          <div style={styles.metaItem}>
            <FaClock style={styles.metaIcon} />
            <span>{durationText}</span>
          </div>
        </div>

        <div style={styles.footer}>
          <button style={styles.button} onClick={handleEnroll}>
            {isEnrolled ? "Continue Learning" : "View Course"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  imageContainer: {
    position: "relative",
    height: "220px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  badge: {
    position: "absolute",
    top: "14px",
    right: "14px",
    backgroundColor: "#15BE6A",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  progressContainer: {
    padding: "0.8rem 1rem 0 1rem",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  progressLabel: {
    fontSize: "0.85rem",
    color: "#666",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#15BE6A",
    borderRadius: "10px",
  },
  content: {
    padding: "1.2rem",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  topInfo: {
    marginBottom: "0.7rem",
  },
  category: {
    backgroundColor: "#f3f4f6",
    color: "#444",
    padding: "5px 10px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  title: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#222",
    marginBottom: "0.5rem",
    lineHeight: "1.4",
  },
  instructor: {
    fontSize: "0.92rem",
    color: "#666",
    marginBottom: "0.8rem",
  },
  description: {
    fontSize: "0.9rem",
    color: "#777",
    lineHeight: "1.5",
    marginBottom: "1rem",
    minHeight: "44px",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.8rem",
    marginBottom: "1.2rem",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  starIcon: {
    color: "#f5b301",
  },
  metaIcon: {
    color: "#15BE6A",
  },
  footer: {
    marginTop: "auto",
  },
  button: {
    width: "100%",
    border: "none",
    backgroundColor: "#15BE6A",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
  },
};