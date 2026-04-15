import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  FaChartLine, 
  FaCheckCircle, 
  FaClock, 
  FaCalendarAlt,
  FaTrophy,
  FaFire,
  FaAward,
  FaBookOpen,
  FaSpinner,
  FaArrowRight,
  FaPlay,
  FaStar
} from "react-icons/fa";
import { courses } from "../../data/courses";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    marginBottom: "40px"
  },
  
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    paddingBottom: "12px",
    borderBottom: "2px solid #f0f0f0"
  },
  
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1a1a2e",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  
  // Overall Progress Card
  overallProgressCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff"
  },
  
  overallTitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "20px",
    opacity: 0.95
  },
  
  progressCircleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "30px"
  },
  
  progressCircle: {
    position: "relative",
    width: "180px",
    height: "180px"
  },
  
  circleBackground: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)"
  },
  
  circleFill: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "conic-gradient(#fff 0deg, rgba(255,255,255,0.3) 0deg)"
  },
  
  circleContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  },
  
  circlePercentage: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  
  circleLabel: {
    fontSize: "14px",
    opacity: 0.9
  },
  
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    flex: 1
  },
  
  statItem: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center"
  },
  
  statValue: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px"
  },
  
  statLabel: {
    fontSize: "14px",
    opacity: 0.9
  },
  
  // Course Progress Cards
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px"
  },
  
  courseProgressCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },
  
  courseImage: {
    width: "100%",
    height: "140px",
    background: "linear-gradient(135deg, #15BE6A, #0e8a4c)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    color: "#fff",
    position: "relative"
  },
  
  courseProgressBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },
  
  courseContent: {
    padding: "20px"
  },
  
  courseTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "12px"
  },
  
  progressBarContainer: {
    marginBottom: "16px"
  },
  
  progressBarHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#6c757d"
  },
  
  progressBar: {
    height: "8px",
    backgroundColor: "#e9ecef",
    borderRadius: "4px",
    overflow: "hidden"
  },
  
  progressFill: {
    height: "100%",
    backgroundColor: "#15BE6A",
    borderRadius: "4px",
    transition: "width 0.3s ease"
  },
  
  courseStats: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #f0f0f0"
  },
  
  courseStat: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#6c757d"
  },
  
  continueButton: {
    marginTop: "16px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#15BE6A",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease"
  },
  
  // Milestones Section
  milestonesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  
  milestoneCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  
  milestoneIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "rgba(21,190,106,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    fontSize: "28px",
    color: "#15BE6A"
  },
  
  milestoneTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "8px"
  },
  
  milestoneProgress: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#15BE6A",
    marginBottom: "8px"
  },
  
  milestoneGoal: {
    fontSize: "12px",
    color: "#6c757d",
    marginBottom: "12px"
  },
  
  milestoneBar: {
    height: "6px",
    backgroundColor: "#e9ecef",
    borderRadius: "3px",
    overflow: "hidden"
  },
  
  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#fff",
    borderRadius: "16px"
  },
  
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    color: "#dee2e6"
  },
  
  emptyTitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "8px",
    color: "#495057"
  },
  
  emptyText: {
    fontSize: "14px",
    color: "#6c757d",
    marginBottom: "20px"
  },
  
  browseButton: {
    padding: "12px 24px",
    backgroundColor: "#15BE6A",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px"
  }
};

export default function Progress({ courses = [], completedCourses = [], coursesProgress = {} }) {
  const { user } = useSelector((state) => state.auth);
  const myCoursesIds = useSelector((state) => state.enrollments.myCourses);
  const navigate = useNavigate();

  // Static progress data (will become dynamic later)
  const [progressData, setProgressData] = useState({
    overallProgress: 0,
    totalHoursLearned: 0,
    streak: 0,
    nextMilestone: ""
  });

  // Course progress data (static for now)
  const [courseProgress, setCourseProgress] = useState([]);

  useEffect(() => {
    // Get enrolled courses
    const enrolledCourses = courses.filter(course => myCoursesIds.includes(course.id));
    
    // Use actual progress data from backend instead of random values
    const courseProgressData = enrolledCourses.map((course) => ({
      id: course.id,
      title: course.title,
      progress: coursesProgress[course.id] || 0, // Use real progress from backend
      hoursSpent: 0, // You may need to fetch this from backend too
      totalHours: course.duration || 5,
      lastAccessed: new Date().toISOString()
    }));

    setCourseProgress(courseProgressData);

    // Calculate overall stats based on real data
    const totalProgress = courseProgressData.reduce((sum, course) => sum + course.progress, 0);
    const avgProgress = courseProgressData.length > 0 ? totalProgress / courseProgressData.length : 0;
    const totalHours = courseProgressData.reduce((sum, course) => sum + course.hoursSpent, 0);

    setProgressData({
      overallProgress: Math.round(avgProgress),
      totalHoursLearned: totalHours,
      streak: 0, // Should be fetched from backend
      nextMilestone: "Complete 5 courses",
      coursesCompleted: completedCourses.length,
      certificates: completedCourses.length
    });
  }, [courses, myCoursesIds, completedCourses, coursesProgress]);

  const handleContinueCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (courseProgress.length === 0) {
    return (
      <div style={styles.emptyState}>
        <FaBookOpen style={styles.emptyIcon} />
        <div style={styles.emptyTitle}>No courses in progress</div>
        <div style={styles.emptyText}>
          Start your learning journey by enrolling in a course
        </div>
        <button 
          onClick={() => navigate("/courses")}
          style={styles.browseButton}
        >
          Browse Courses <FaArrowRight />
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Course Progress Section */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}>
          <FaChartLine style={{ color: "#15BE6A" }} />
          Course Progress
        </div>
        <button 
          onClick={() => navigate("/student/my-courses")}
          style={{ ...styles.browseButton, padding: "8px 16px", fontSize: "13px" }}
        >
          View All <FaArrowRight />
        </button>
      </div>

      <div style={styles.courseGrid}>
        {courseProgress.map((course) => (
          <div key={course.id} style={styles.courseProgressCard}>
            <div style={styles.courseImage}>
              <FaBookOpen />
              <div style={styles.courseProgressBadge}>
                {course.progress}% Complete
              </div>
            </div>
            <div style={styles.courseContent}>
              <div style={styles.courseTitle}>{course.title}</div>
              
              <div style={styles.progressBarContainer}>
                <div style={styles.progressBarHeader}>
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${course.progress}%` }}></div>
                </div>
              </div>
              
              <div style={styles.courseStats}>
                <div style={styles.courseStat}>
                  <FaClock />
                  <span>{course.hoursSpent} / {course.totalHours} hours</span>
                </div>
                <div style={styles.courseStat}>
                  <FaCalendarAlt />
                  <span>Last: {formatDate(course.lastAccessed)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleContinueCourse(course.id)}
                style={styles.continueButton}
              >
                <FaPlay /> Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Milestones Section */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}>
          <FaTrophy style={{ color: "#15BE6A" }} />
          Upcoming Milestones
        </div>
      </div>

      <div style={styles.milestonesGrid}>
        <div style={styles.milestoneCard}>
          <div style={styles.milestoneIcon}>
            <FaFire />
          </div>
          <div style={styles.milestoneTitle}>30-Day Streak</div>
          <div style={styles.milestoneProgress}>{progressData.streak}/30</div>
          <div style={styles.milestoneGoal}>Keep learning daily</div>
          <div style={styles.milestoneBar}>
            <div style={{ ...styles.progressFill, width: `${(progressData.streak / 30) * 100}%` }}></div>
          </div>
        </div>

        <div style={styles.milestoneCard}>
          <div style={styles.milestoneIcon}>
            <FaAward />
          </div>
          <div style={styles.milestoneTitle}>Complete 5 Courses</div>
          <div style={styles.milestoneProgress}>{progressData.coursesCompleted || 0}/5</div>
          <div style={styles.milestoneGoal}>5 courses completed</div>
          <div style={styles.milestoneBar}>
            <div style={{ ...styles.progressFill, width: `${((progressData.coursesCompleted || 0) / 5) * 100}%` }}></div>
          </div>
        </div>

        <div style={styles.milestoneCard}>
          <div style={styles.milestoneIcon}>
            <FaStar />
          </div>
          <div style={styles.milestoneTitle}>Learning Hours</div>
          <div style={styles.milestoneProgress}>{progressData.totalHoursLearned}/50</div>
          <div style={styles.milestoneGoal}>Reach 50 hours</div>
          <div style={styles.milestoneBar}>
            <div style={{ ...styles.progressFill, width: `${(progressData.totalHoursLearned / 50) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}