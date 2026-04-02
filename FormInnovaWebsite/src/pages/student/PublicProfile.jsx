import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaBookOpen,
  FaCertificate,
  FaClock,
  FaStar,
  FaGraduationCap,
  FaUsers,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaGlobe,
  FaMapMarkerAlt,
  FaTrophy,
  FaAward,
  FaShareAlt,
  FaCopy,
  FaCheck
} from "react-icons/fa";
import { courses } from "../../data/courses";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa"
  },
  
  // Hero Section
  heroSection: {
    background: "linear-gradient(135deg, #5a9879 0%, #55c88f 100%)",
    padding: "60px 0 100px 0",
    position: "relative"
  },
  
  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px"
  },
  
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },
  
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
    color: "#15BE6A",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    border: "4px solid #fff"
  },
  
  profileInfo: {
    flex: 1
  },
  
  name: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "8px"
  },
  
  username: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.9)",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  bio: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.9)",
    lineHeight: "1.5",
    maxWidth: "600px"
  },
  
  statsContainer: {
    display: "flex",
    gap: "30px",
    marginTop: "30px",
    flexWrap: "wrap"
  },
  
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: "12px 24px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)"
  },
  
  statIcon: {
    fontSize: "24px",
    color: "#fff"
  },
  
  statInfo: {
    color: "#fff"
  },
  
  statValue: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  
  statLabel: {
    fontSize: "12px",
    opacity: 0.9
  },
  
  shareButton: {
    position: "absolute",
    top: "30px",
    right: "30px",
    backgroundColor: "rgba(255,255,255,0.2)",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease"
  },
  
  // Main Content
  mainContent: {
    maxWidth: "1200px",
    margin: "-50px auto 0",
    padding: "0 20px 60px",
    position: "relative"
  },
  
  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },
  
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "2px solid #f0f0f0"
  },
  
  cardTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1a1a2e",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  
  cardIcon: {
    fontSize: "28px",
    color: "#15BE6A"
  },
  
  // About Section
  aboutSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  
  aboutItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px"
  },
  
  aboutIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    backgroundColor: "rgba(21,190,106,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    color: "#15BE6A"
  },
  
  aboutContent: {
    flex: 1
  },
  
  aboutLabel: {
    fontSize: "12px",
    color: "#6c757d",
    marginBottom: "4px"
  },
  
  aboutValue: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1a1a2e"
  },
  
  // Courses Grid
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px"
  },
  
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #e9ecef"
  },
  
  courseImage: {
    width: "100%",
    height: "160px",
    background: "linear-gradient(135deg, #15BE6A, #0e8a4c)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    color: "#fff"
  },
  
  courseContent: {
    padding: "20px"
  },
  
  courseTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "8px"
  },
  
  courseCenter: {
    fontSize: "14px",
    color: "#6c757d",
    marginBottom: "12px"
  },
  
  courseMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid #f0f0f0"
  },
  
  courseStats: {
    display: "flex",
    gap: "15px",
    fontSize: "13px",
    color: "#6c757d"
  },
  
  courseRating: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  
  starIcon: {
    color: "#ffc107",
    fontSize: "14px"
  },
  
  // Certificates Grid
  certificateGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px"
  },
  
  certificateCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    transition: "transform 0.3s ease"
  },
  
  certificateIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "#15BE6A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "#fff"
  },
  
  certificateInfo: {
    flex: 1
  },
  
  certificateTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "4px"
  },
  
  certificateDate: {
    fontSize: "12px",
    color: "#6c757d"
  },
  
  // Badges Section
  badgesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px"
  },
  
  badgeCard: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    transition: "transform 0.3s ease"
  },
  
  badgeIcon: {
    fontSize: "40px",
    color: "#15BE6A",
    marginBottom: "12px"
  },
  
  badgeTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "4px"
  },
  
  badgeDate: {
    fontSize: "11px",
    color: "#6c757d"
  },
  
  // Social Links
  socialLinks: {
    display: "flex",
    gap: "12px",
    marginTop: "20px"
  },
  
  socialLink: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#6c757d",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  
  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "40px",
    color: "#6c757d"
  },
  
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    color: "#dee2e6"
  },
  
  emptyText: {
    fontSize: "14px"
  },
  
  // Toast Notification
  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#15BE6A",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    animation: "slideIn 0.3s ease",
    zIndex: 1000
  },
  
  // Responsive
  "@media (max-width: 768px)": {
    profileHeader: {
      flexDirection: "column",
      textAlign: "center"
    },
    statsContainer: {
      justifyContent: "center"
    },
    name: {
      fontSize: "28px"
    }
  }
};

export default function PublicProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    certificates: 0,
    totalHours: 0
  });
  const [userCourses, setUserCourses] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const myCoursesIds = JSON.parse(localStorage.getItem("enrollments")) || [];

    const foundUser = users.find(
      (u) => u.username?.toLowerCase() === username.toLowerCase() || 
             u.name?.toLowerCase() === username.toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      
      // Get user's enrolled courses
      const userEnrolledCourses = courses.filter(course => 
        myCoursesIds.includes(course.id)
      );
      
      setUserCourses(userEnrolledCourses);
      
      // Calculate stats
      setUserStats({
        totalCourses: userEnrolledCourses.length,
        completedCourses: Math.floor(Math.random() * userEnrolledCourses.length),
        certificates: Math.floor(Math.random() * 3),
        totalHours: userEnrolledCourses.reduce((total, course) => total + (course.duration || 5), 0)
      });
    }
  }, [username]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => setCopied(false), 300);
    }, 2000);
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>😢</div>
          <h2 style={{ color: "#1a1a2e", marginBottom: "10px" }}>User Not Found</h2>
          <p style={{ color: "#6c757d" }}>The profile you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <button style={styles.shareButton} onClick={handleCopyLink}>
          <FaShareAlt /> Share Profile
        </button>
        
        <div style={styles.heroContent}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              <FaUserCircle />
            </div>
            <div style={styles.profileInfo}>
              <h1 style={styles.name}>{user.name}</h1>
              <div style={styles.username}>
                <FaUserCircle style={{ fontSize: "14px" }} />
                @{user.username || user.name.toLowerCase().replace(/\s/g, '')}
              </div>
              <p style={styles.bio}>
                Passionate learner dedicated to mastering new skills and sharing knowledge with the community.
              </p>
            </div>
          </div>
          
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <FaBookOpen style={styles.statIcon} />
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{userStats.totalCourses}</div>
                <div style={styles.statLabel}>Courses</div>
              </div>
            </div>
            <div style={styles.statItem}>
              <FaGraduationCap style={styles.statIcon} />
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{userStats.completedCourses}</div>
                <div style={styles.statLabel}>Completed</div>
              </div>
            </div>
            <div style={styles.statItem}>
              <FaCertificate style={styles.statIcon} />
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{userStats.certificates}</div>
                <div style={styles.statLabel}>Certificates</div>
              </div>
            </div>
            <div style={styles.statItem}>
              <FaClock style={styles.statIcon} />
              <div style={styles.statInfo}>
                <div style={styles.statValue}>{userStats.totalHours}+</div>
                <div style={styles.statLabel}>Hours Learned</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* About Section */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              <FaUserCircle style={styles.cardIcon} />
              About
            </div>
          </div>
          <div style={styles.aboutSection}>
            <div style={styles.aboutItem}>
              <div style={styles.aboutIcon}>
                <FaEnvelope />
              </div>
              <div style={styles.aboutContent}>
                <div style={styles.aboutLabel}>Email</div>
                <div style={styles.aboutValue}>{user.email}</div>
              </div>
            </div>
            <div style={styles.aboutItem}>
              <div style={styles.aboutIcon}>
                <FaCalendarAlt />
              </div>
              <div style={styles.aboutContent}>
                <div style={styles.aboutLabel}>Member Since</div>
                <div style={styles.aboutValue}>January 2024</div>
              </div>
            </div>
            <div style={styles.aboutItem}>
              <div style={styles.aboutIcon}>
                <FaMapMarkerAlt />
              </div>
              <div style={styles.aboutContent}>
                <div style={styles.aboutLabel}>Location</div>
                <div style={styles.aboutValue}>Global Learner</div>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}>
              <FaLinkedin />
            </a>
            <a href="#" style={styles.socialLink}>
              <FaTwitter />
            </a>
            <a href="#" style={styles.socialLink}>
              <FaGithub />
            </a>
            <a href="#" style={styles.socialLink}>
              <FaGlobe />
            </a>
          </div>
        </div>

        {/* Certificates Section */}
        {userStats.certificates > 0 && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>
                <FaCertificate style={styles.cardIcon} />
                Certificates
              </div>
            </div>
            <div style={styles.certificateGrid}>
              {[...Array(userStats.certificates)].map((_, index) => (
                <div key={index} style={styles.certificateCard}>
                  <div style={styles.certificateIcon}>
                    <FaCertificate />
                  </div>
                  <div style={styles.certificateInfo}>
                    <div style={styles.certificateTitle}>
                      {userCourses[index]?.title || "Course Certificate"}
                    </div>
                    <div style={styles.certificateDate}>
                      Issued: March 2024
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges Section */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              <FaTrophy style={styles.cardIcon} />
              Achievements & Badges
            </div>
          </div>
          <div style={styles.badgesGrid}>
            <div style={styles.badgeCard}>
              <div style={styles.badgeIcon}>
                <FaAward />
              </div>
              <div style={styles.badgeTitle}>Early Learner</div>
              <div style={styles.badgeDate}>Joined 2024</div>
            </div>
            {userStats.completedCourses >= 1 && (
              <div style={styles.badgeCard}>
                <div style={styles.badgeIcon}>
                  <FaGraduationCap />
                </div>
                <div style={styles.badgeTitle}>First Course</div>
                <div style={styles.badgeDate}>Completed</div>
              </div>
            )}
            {userStats.totalHours >= 10 && (
              <div style={styles.badgeCard}>
                <div style={styles.badgeIcon}>
                  <FaClock />
                </div>
                <div style={styles.badgeTitle}>10+ Hours</div>
                <div style={styles.badgeDate}>Learning Streak</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={styles.toast}>
          {copied ? <FaCheck /> : <FaCopy />}
          {copied ? "Link copied to clipboard!" : "Copying..."}
        </div>
      )}
      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}