import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import CourseCard from "../../components/CourseCard";
import axios from "axios";
import {
  FaBookOpen,
  FaClock,
  FaCertificate,
  FaArrowRight,
  FaPlay,
  FaHeart,
  FaSignOutAlt,
  FaChartLine,
  FaCheckCircle,
  FaChevronRight,
  FaTrophy,
  FaCalendarAlt,
  FaSpinner
} from "react-icons/fa";

import { courses } from "../../data/courses";
import Progress from "./Progress";
import { useNavigate } from "react-router-dom";
import { enrollCourse, setEnrollments, clearEnrollments } from "../../features/enrollments/enrollmentSlice";

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa"
  },

  sidebar: {
    width: "280px",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    overflowY: "auto",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
  },

  sidebarHeader: {
    padding: "30px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "24px"
  },

  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #15BE6A, #0e8a4c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "8px"
  },

  sidebarSubtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)"
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "0 16px",
    flex: 1
  },

  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.8)",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
    width: "100%"
  },

  navButtonActive: {
    backgroundColor: "#15BE6A",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(21,190,106,0.3)"
  },

  navButtonIcon: {
    fontSize: "18px"
  },

  navButtonBadge: {
    marginLeft: "auto",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "2px 8px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "24px 16px",
    padding: "12px 16px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left"
  },

  main: {
    flex: 1,
    marginLeft: "280px",
    padding: "32px 40px",
    backgroundColor: "#f8f9fa"
  },

  pageHeader: {
    marginBottom: "32px"
  },

  pageTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "8px"
  },

  pageSubtitle: {
    fontSize: "16px",
    color: "#6c757d"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },

  statCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },

  statCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px"
  },

  statIcon: {
    fontSize: "32px",
    color: "#15BE6A"
  },

  statValue: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "4px"
  },

  statLabel: {
    fontSize: "14px",
    color: "#6c757d"
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "32px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
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

  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px"
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    transition: "transform 0.3s ease"
  },

  activityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    backgroundColor: "#15BE6A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px"
  },

  activityContent: {
    flex: 1
  },

  activityTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1a1a2e",
    marginBottom: "4px"
  },

  activityDate: {
    fontSize: "13px",
    color: "#6c757d",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },

  completedItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    marginBottom: "12px"
  },

  completedInfo: {
    flex: 1
  },

  completedTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1a1a2e",
    marginBottom: "4px"
  },

  completedGrade: {
    fontSize: "13px",
    color: "#15BE6A",
    fontWeight: "500"
  },

  certificateItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    marginBottom: "12px"
  },

  certificateIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#15BE6A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "24px"
  },

  certificateTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1a1a2e",
    marginBottom: "4px"
  },

  certificateDate: {
    fontSize: "13px",
    color: "#6c757d"
  },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6c757d"
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
    fontSize: "14px"
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "16px"
  },

  spinner: {
    animation: "spin 1s linear infinite",
    fontSize: "48px",
    color: "#15BE6A"
  },

  viewAllButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#15BE6A",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },

  goToCoursesBtn: {
    marginTop: "20px",
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

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const myCoursesIds = useSelector((state) => state.enrollments.myCourses);

  const [coursesProgress, setCoursesProgress] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Dashboard render - isAuthenticated:", isAuthenticated, "user:", user, "loading:", loading);

  const enrolledCourses = courses.filter((course) =>
    myCoursesIds.includes(course.id)
  );

  const completedCourses = enrolledCourses
    .filter((course) => Number(coursesProgress[course.id] || 0) === 100)
    .map((course) => ({
      ...course,
      completedDate: new Date().toISOString(),
      grade: "Completed",
    }));

  const wishlist = [];

  const stats = {
    totalCourses: enrolledCourses.length,
    completedCourses: completedCourses.length,
    totalHours: enrolledCourses.reduce(
      (total, course) => total + (parseInt(course.duration) || 5),
      0
    ),
    certificates: certificates.length,
    streak: 7
  };

  const recentActivity = [
    {
      id: 1,
      title: "Started React Course",
      date: "2024-03-10",
      icon: <FaPlay />
    },
    {
      id: 2,
      title: "Completed a certificate",
      date: "2024-03-08",
      icon: <FaCertificate />
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      window.scrollTo(0, 0);
      navigate("/login");
      return;
    }

    const load = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));
      setLoading(false);
    };

    load();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.id) return;

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, clearing enrollments");
        dispatch(setEnrollments([]));
        return;
      }

      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/my-enrollments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        // Sync enrollments with Redux state
        const enrolledCourseIds = res.data.map(enrollment => enrollment.course_id);
        dispatch(setEnrollments(enrolledCourseIds));

        console.log("Enrollments synced:", res.data);
      } catch (error) {
        console.log("Error fetching enrollments:", error.response?.data || error.message);
        // If API fails, clear enrollments to match database state
        dispatch(setEnrollments([]));
      }
    };

    // Add a small delay to ensure component is mounted
    const timer = setTimeout(() => {
      fetchEnrollments();
    }, 100);

    return () => clearTimeout(timer);
  }, [user?.id, dispatch]);

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

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user?.id) {
        console.log("No user ID, skipping certificate fetch");
        return;
      }

      const token = localStorage.getItem("token");
      console.log("Fetching certificates for user:", user.id, "with token:", token ? "present" : "missing");

      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/my-certificates",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        console.log("Certificates fetched:", res.data);
        setCertificates(res.data || []);
      } catch (error) {
        console.log("Error fetching certificates:", error.response?.data || error.message);
      }
    };

    fetchCertificates();
  }, [user?.id]);

  const handleLogout = () => {
    dispatch(clearEnrollments());
    dispatch(logout());
    navigate("/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString();
  };

  const getUserName = () => {
    if (!user) return "Student";
    if (typeof user === "object") {
      return user.name || user.username || user.email || "Student";
    }
    return String(user);
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p style={{ color: "#6c757d" }}>Loading your dashboard...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.sidebarTitle}>LearnHub</div>
          <div style={styles.sidebarSubtitle}>
            Welcome, {getUserName()}
          </div>
        </div>

        <nav style={styles.nav}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              ...styles.navButton,
              ...(activeTab === "dashboard" ? styles.navButtonActive : {})
            }}
          >
            <FaChartLine style={styles.navButtonIcon} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            style={{
              ...styles.navButton,
              ...(activeTab === "courses" ? styles.navButtonActive : {})
            }}
          >
            <FaBookOpen style={styles.navButtonIcon} />
            My Courses
            {enrolledCourses.length > 0 && (
              <span style={styles.navButtonBadge}>{enrolledCourses.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            style={{
              ...styles.navButton,
              ...(activeTab === "completed" ? styles.navButtonActive : {})
            }}
          >
            <FaCheckCircle style={styles.navButtonIcon} />
            Completed
            {completedCourses.length > 0 && (
              <span style={styles.navButtonBadge}>{completedCourses.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            style={{
              ...styles.navButton,
              ...(activeTab === "certificates" ? styles.navButtonActive : {})
            }}
          >
            <FaCertificate style={styles.navButtonIcon} />
            Certificates
            {certificates.length > 0 && (
              <span style={styles.navButtonBadge}>{certificates.length}</span>
            )}
          </button>

          {/* <button
            onClick={() => setActiveTab("wishlist")}
            style={{
              ...styles.navButton,
              ...(activeTab === "wishlist" ? styles.navButtonActive : {})
            }}
          >
            <FaHeart style={styles.navButtonIcon} />
            Wishlist
            {wishlist.length > 0 && (
              <span style={styles.navButtonBadge}>{wishlist.length}</span>
            )}
          </button> */}
        </nav>

        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>
            {activeTab === "dashboard" && "Welcome back!"}
            {activeTab === "courses" && "My Courses"}
            {activeTab === "completed" && "Completed Courses"}
            {activeTab === "certificates" && "Certificates"}
            {/* {activeTab === "wishlist" && "Wishlist"} */}
          </h1>

          <p style={styles.pageSubtitle}>
            {activeTab === "dashboard" && "Track your learning progress and achievements"}
            {activeTab === "courses" && "Continue your learning journey"}
            {activeTab === "completed" && "Courses you've successfully completed"}
            {activeTab === "certificates" && "Your earned certificates"}
            {/* {activeTab === "wishlist" && "Courses you want to take"} */}
          </p>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statCardHeader}>
                  <FaBookOpen style={styles.statIcon} />
                  <FaTrophy style={{ fontSize: "20px", color: "#ffc107" }} />
                </div>
                <div style={styles.statValue}>{stats.totalCourses}</div>
                <div style={styles.statLabel}>Courses Enrolled</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statCardHeader}>
                  <FaCheckCircle style={styles.statIcon} />
                </div>
                <div style={styles.statValue}>{stats.completedCourses}</div>
                <div style={styles.statLabel}>Completed Courses</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statCardHeader}>
                  <FaClock style={styles.statIcon} />
                </div>
                <div style={styles.statValue}>{stats.totalHours}</div>
                <div style={styles.statLabel}>Learning Hours</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statCardHeader}>
                  <FaCertificate style={styles.statIcon} />
                </div>
                <div style={styles.statValue}>{stats.certificates}</div>
                <div style={styles.statLabel}>Certificates Earned</div>
              </div>
            </div>

            <Progress
              courses={courses}
              completedCourses={completedCourses}
              coursesProgress={coursesProgress}
            />

            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionTitle}>
                  <FaClock style={{ color: "#15BE6A" }} />
                  Recent Activity
                </div>
                <button style={styles.viewAllButton}>
                  View All <FaChevronRight />
                </button>
              </div>

              <div style={styles.activityList}>
                {recentActivity.map((act) => (
                  <div key={act.id} style={styles.activityItem}>
                    <div style={styles.activityIcon}>{act.icon}</div>
                    <div style={styles.activityContent}>
                      <div style={styles.activityTitle}>{act.title}</div>
                      <div style={styles.activityDate}>
                        <FaCalendarAlt style={{ fontSize: "12px" }} />
                        {formatDate(act.date)}
                      </div>
                    </div>
                    <FaChevronRight style={{ color: "#dee2e6" }} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "courses" && (
          <div>
            {enrolledCourses.length === 0 ? (
              <div style={styles.emptyState}>
                <FaBookOpen style={styles.emptyIcon} />
                <div style={styles.emptyTitle}>No courses enrolled yet</div>
                <div style={styles.emptyText}>
                  Browse our course catalog and start learning today!
                </div>
                <button
                  onClick={() => { window.scrollTo(0, 0); navigate("/courses"); }}
                  style={styles.goToCoursesBtn}
                >
                  Browse Courses <FaArrowRight />
                </button>
              </div>
            ) : (
              <div style={styles.courseGrid}>
                {enrolledCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    progress={coursesProgress[course.id] || 0}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "completed" && (
          <div>
            {completedCourses.length === 0 ? (
              <div style={styles.emptyState}>
                <FaCheckCircle style={styles.emptyIcon} />
                <div style={styles.emptyTitle}>No completed courses yet</div>
                <div style={styles.emptyText}>
                  Complete your enrolled courses to see them here
                </div>
                {enrolledCourses.length > 0 && (
                  <button
                    onClick={() => setActiveTab("courses")}
                    style={styles.goToCoursesBtn}
                  >
                    Continue Learning <FaArrowRight />
                  </button>
                )}
              </div>
            ) : (
              completedCourses.map((course) => (
                <div key={course.id} style={styles.completedItem}>
                  <div style={styles.completedInfo}>
                    <div style={styles.completedTitle}>{course.title}</div>
                    <div style={styles.completedGrade}>
                      Status: {course.grade}
                    </div>
                  </div>
                  <FaCheckCircle style={{ color: "#15BE6A", fontSize: "24px" }} />
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "certificates" && (
          <div>
            {certificates.length === 0 ? (
              <div style={styles.emptyState}>
                <FaCertificate style={styles.emptyIcon} />
                <div style={styles.emptyTitle}>No certificates yet</div>
                <div style={styles.emptyText}>
                  Complete courses to earn certificates
                </div>
              </div>
            ) : (
              certificates.map((cert) => (
                <div
                  key={cert.id}
                  style={{ ...styles.certificateItem, cursor: "pointer" }}
                  onClick={() => { window.scrollTo(0, 0); navigate(`/certificate/${cert.course_id}`); }}
                >
                  <div style={styles.certificateIcon}>
                    <FaCertificate />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.certificateTitle}>
                                          {
                      courses.find((course) => course.id === Number(cert.course_id))?.title
                      || `Course #${cert.course_id}`
                    }
                    </div>
                    <div style={styles.certificateDate}>
                      Issued: {formatDate(cert.issued_at)}
                    </div>
                  </div>
                  <FaChevronRight style={{ color: "#15BE6A" }} />
                </div>
              ))
            )}
          </div>
        )}

        {/* {activeTab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <div style={styles.emptyState}>
                <FaHeart style={styles.emptyIcon} />
                <div style={styles.emptyTitle}>Your wishlist is empty</div>
                <div style={styles.emptyText}>
                  Browse courses and add your favorites to wishlist
                </div>
                <button
                  onClick={() => { window.scrollTo(0, 0); navigate("/courses"); }}
                  style={styles.goToCoursesBtn}
                >
                  Browse Courses <FaArrowRight />
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id}>{item.title}</div>
              ))
            )}
          </div>
        )} */}
      </main>
    </div>
  );
}