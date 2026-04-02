import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { 
  FaUser, 
  FaBookOpen, 
  FaGraduationCap, 
  FaClock, 
  FaCertificate, 
  FaArrowRight,
  FaPlay,
  FaStar,
  FaHeart,
  FaSignOutAlt,
  FaChartLine,
  FaCheckCircle,
  FaChevronRight,
  FaTrophy,
  FaCalendarAlt,
  FaUsers,
  FaVideo,
  FaFileAlt,
  FaSpinner
} from "react-icons/fa";

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  
  // Data states - will come from API
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    certificates: 0,
    streak: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  // Fetch user data (mock - will be replaced with API calls)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Simulate API call
    const fetchUserData = async () => {
      setLoading(true);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - will be replaced with real API
      setEnrolledCourses([
        {
          id: 1,
          title: "Complete React Developer Course",
          center: "Code Academy",
          progress: 65,
          lastWatched: "2024-03-15",
          nextLesson: "React Hooks Deep Dive",
          duration: "15 min",
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          instructor: "John Smith",
          rating: 4.8
        },
        {
          id: 2,
          title: "UI/UX Design Masterclass",
          center: "Design School",
          progress: 30,
          lastWatched: "2024-03-14",
          nextLesson: "Figma Advanced",
          duration: "25 min",
          image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          instructor: "Sarah Johnson",
          rating: 4.9
        },
        {
          id: 3,
          title: "Digital Marketing Strategy",
          center: "Marketing Pro",
          progress: 80,
          lastWatched: "2024-03-13",
          nextLesson: "SEO Optimization",
          duration: "10 min",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
          instructor: "Mike Wilson",
          rating: 4.6
        }
      ]);

      setCompletedCourses([
        {
          id: 4,
          title: "Python for Beginners",
          center: "Data Institute",
          completedDate: "2024-03-10",
          grade: "A",
          certificateId: "CERT-2024-001"
        },
        {
          id: 5,
          title: "HTML & CSS Fundamentals",
          center: "Code Academy",
          completedDate: "2024-02-28",
          grade: "A+",
          certificateId: "CERT-2024-002"
        }
      ]);

      setCertificates([
        {
          id: 1,
          title: "Python for Beginners",
          issueDate: "March 10, 2024",
          certificateUrl: "#",
          center: "Data Institute"
        },
        {
          id: 2,
          title: "HTML & CSS Fundamentals",
          issueDate: "February 28, 2024",
          certificateUrl: "#",
          center: "Code Academy"
        }
      ]);

      setWishlist([
        {
          id: 6,
          title: "Machine Learning A-Z",
          center: "AI Institute",
          price: 89.99,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        }
      ]);

      setStats({
        totalCourses: enrolledCourses.length,
        completedCourses: completedCourses.length,
        totalHours: 28,
        certificates: certificates.length,
        streak: 7
      });

      setRecentActivity([
        {
          id: 1,
          type: "course_started",
          title: "Started React Developer Course",
          date: "2024-03-10",
          icon: <FaPlay />
        },
        {
          id: 2,
          type: "certificate_earned",
          title: "Earned Python Certificate",
          date: "2024-03-08",
          icon: <FaCertificate />
        },
        {
          id: 3,
          type: "lesson_completed",
          title: "Completed React Hooks lesson",
          date: "2024-03-07",
          icon: <FaCheckCircle />
        }
      ]);

      setLoading(false);
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <img 
            src="https://img.icons8.com/color/48/000000/training.png" 
            alt="FormInnova" 
            style={styles.logo}
          />
          <span style={styles.logoText}>FormInnova</span>
        </div>

        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            {user?.name ? getInitials(user.name) : "ST"}
          </div>
          <div style={styles.userDetails}>
            <h3 style={styles.userName}>{user?.name || "Student"}</h3>
            <p style={styles.userEmail}>{user?.email || "student@example.com"}</p>
            <div style={styles.userBadge}>
              <FaTrophy style={styles.badgeIcon} />
              <span>Learning Streak: {stats.streak} days</span>
            </div>
          </div>
        </div>

        <nav style={styles.nav}>
          <button 
            style={{
              ...styles.navItem,
              ...(activeTab === "dashboard" ? styles.navItemActive : {})
            }}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaChartLine style={styles.navIcon} />
            <span>Dashboard</span>
          </button>
          <button 
            style={{
              ...styles.navItem,
              ...(activeTab === "courses" ? styles.navItemActive : {})
            }}
            onClick={() => setActiveTab("courses")}
          >
            <FaBookOpen style={styles.navIcon} />
            <span>My Courses</span>
            <span style={styles.navBadge}>{enrolledCourses.length}</span>
          </button>
          <button 
            style={{
              ...styles.navItem,
              ...(activeTab === "completed" ? styles.navItemActive : {})
            }}
            onClick={() => setActiveTab("completed")}
          >
            <FaGraduationCap style={styles.navIcon} />
            <span>Completed</span>
            <span style={styles.navBadge}>{completedCourses.length}</span>
          </button>
          <button 
            style={{
              ...styles.navItem,
              ...(activeTab === "certificates" ? styles.navItemActive : {})
            }}
            onClick={() => setActiveTab("certificates")}
          >
            <FaCertificate style={styles.navIcon} />
            <span>Certificates</span>
            <span style={styles.navBadge}>{certificates.length}</span>
          </button>
          <button 
            style={{
              ...styles.navItem,
              ...(activeTab === "wishlist" ? styles.navItemActive : {})
            }}
            onClick={() => setActiveTab("wishlist")}
          >
            <FaHeart style={styles.navIcon} />
            <span>Wishlist</span>
            <span style={styles.navBadge}>{wishlist.length}</span>
          </button>
        </nav>

        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.logoutIcon} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>
            {activeTab === "dashboard" && "Welcome back! 👋"}
            {activeTab === "courses" && "My Learning"}
            {activeTab === "completed" && "Completed Courses"}
            {activeTab === "certificates" && "My Certificates"}
            {activeTab === "wishlist" && "Saved for Later"}
          </h1>
          <div style={styles.headerRight}>
            <Link to="/courses" style={styles.browseLink}>
              Browse Courses <FaArrowRight style={styles.browseIcon} />
            </Link>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            {/* Welcome Card */}
            <div style={styles.welcomeCard}>
              <div style={styles.welcomeContent}>
                <h2 style={styles.welcomeTitle}>Ready to continue learning?</h2>
                <p style={styles.welcomeText}>
                  You have {enrolledCourses.length} courses in progress. 
                  Keep up the great work! 🎯
                </p>
                <Link to="/courses" style={styles.continueLearningBtn}>
                  Continue Learning <FaArrowRight />
                </Link>
              </div>
              <div style={styles.welcomeEmoji}>📚</div>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIconContainer}>
                  <FaBookOpen style={styles.statIcon} />
                </div>
                <div>
                  <h3 style={styles.statNumber}>{stats.totalCourses}</h3>
                  <p style={styles.statLabel}>Courses Enrolled</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIconContainer}>
                  <FaCheckCircle style={styles.statIcon} />
                </div>
                <div>
                  <h3 style={styles.statNumber}>{stats.completedCourses}</h3>
                  <p style={styles.statLabel}>Completed</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIconContainer}>
                  <FaClock style={styles.statIcon} />
                </div>
                <div>
                  <h3 style={styles.statNumber}>{stats.totalHours}</h3>
                  <p style={styles.statLabel}>Hours Learned</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIconContainer}>
                  <FaCertificate style={styles.statIcon} />
                </div>
                <div>
                  <h3 style={styles.statNumber}>{stats.certificates}</h3>
                  <p style={styles.statLabel}>Certificates</p>
                </div>
              </div>
            </div>

            {/* Continue Learning */}
            {enrolledCourses.length > 0 && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Continue Learning</h2>
                <div style={styles.coursesList}>
                  {enrolledCourses.slice(0, 2).map(course => (
                    <div key={course.id} style={styles.continueCard}>
                      <img 
                        src={course.image} 
                        alt={course.title}
                        style={styles.continueImage}
                      />
                      <div style={styles.continueContent}>
                        <h3 style={styles.continueTitle}>{course.title}</h3>
                        <p style={styles.continueCenter}>{course.center}</p>
                        <div style={styles.progressContainer}>
                          <div style={styles.progressBar}>
                            <div 
                              style={{
                                ...styles.progressFill,
                                width: `${course.progress}%`
                              }}
                            ></div>
                          </div>
                          <span style={styles.progressText}>{course.progress}%</span>
                        </div>
                        <div style={styles.nextLesson}>
                          <FaPlay style={styles.playIcon} />
                          <span>Next: {course.nextLesson}</span>
                          <span style={styles.duration}>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {enrolledCourses.length > 2 && (
                  <button 
                    onClick={() => setActiveTab("courses")}
                    style={styles.viewAllBtn}
                  >
                    View All ({enrolledCourses.length}) <FaChevronRight />
                  </button>
                )}
              </div>
            )}

            {/* Recent Activity */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Recent Activity</h2>
              <div style={styles.activityList}>
                {recentActivity.map(activity => (
                  <div key={activity.id} style={styles.activityItem}>
                    <div style={styles.activityIcon}>{activity.icon}</div>
                    <div style={styles.activityContent}>
                      <p style={styles.activityTitle}>{activity.title}</p>
                      <p style={styles.activityDate}>
                        <FaCalendarAlt style={styles.dateIcon} />
                        {formatDate(activity.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <div style={styles.coursesGrid}>
              {enrolledCourses.map(course => (
                <div key={course.id} style={styles.courseCard}>
                  <div style={styles.courseImageContainer}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      style={styles.courseImage}
                    />
                    <span style={styles.courseBadge}>{course.progress}%</span>
                  </div>
                  <div style={styles.courseCardContent}>
                    <h3 style={styles.courseCardTitle}>{course.title}</h3>
                    <p style={styles.courseCardCenter}>{course.center}</p>
                    <div style={styles.progressContainerSmall}>
                      <div style={styles.progressBarSmall}>
                        <div 
                          style={{
                            ...styles.progressFillSmall,
                            width: `${course.progress}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <button style={styles.continueBtn}>
                      Continue <FaPlay style={styles.continueIcon} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Courses Tab */}
        {activeTab === "completed" && (
          <div>
            <div style={styles.completedGrid}>
              {completedCourses.map(course => (
                <div key={course.id} style={styles.completedCard}>
                  <div style={styles.completedIcon}>
                    <FaTrophy style={styles.trophyIcon} />
                  </div>
                  <div style={styles.completedContent}>
                    <h3 style={styles.completedTitle}>{course.title}</h3>
                    <p style={styles.completedCenter}>{course.center}</p>
                    <p style={styles.completedDate}>Completed: {formatDate(course.completedDate)}</p>
                    <p style={styles.completedGrade}>Grade: {course.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div>
            <div style={styles.certificatesGrid}>
              {certificates.map(cert => (
                <div key={cert.id} style={styles.certificateCard}>
                  <div style={styles.certificateHeader}>
                    <FaCertificate style={styles.certificateIconLarge} />
                  </div>
                  <div style={styles.certificateBody}>
                    <h3 style={styles.certificateCardTitle}>{cert.title}</h3>
                    <p style={styles.certificateCardCenter}>{cert.center}</p>
                    <p style={styles.certificateCardDate}>Issued: {cert.issueDate}</p>
                    <a 
                      href={cert.certificateUrl} 
                      style={styles.downloadBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            {wishlist.length > 0 ? (
              <div style={styles.wishlistGrid}>
                {wishlist.map(course => (
                  <div key={course.id} style={styles.wishlistCard}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      style={styles.wishlistImage}
                    />
                    <div style={styles.wishlistContent}>
                      <h3 style={styles.wishlistTitle}>{course.title}</h3>
                      <p style={styles.wishlistCenter}>{course.center}</p>
                      <div style={styles.wishlistRating}>
                        <FaStar style={styles.ratingStar} />
                        <span>{course.rating}</span>
                      </div>
                      <div style={styles.wishlistFooter}>
                        <span style={styles.wishlistPrice}>${course.price}</span>
                        <button style={styles.enrollNowBtn}>Enroll Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyContainer}>
                <img 
                  src="https://img.icons8.com/ios/452/like--v1.png" 
                  alt="Empty wishlist"
                  style={styles.emptyImage}
                />
                <h3 style={styles.emptyTitle}>Your wishlist is empty</h3>
                <p style={styles.emptyText}>
                  Save courses you're interested in to learn later
                </p>
                <Link to="/courses" style={styles.browseCoursesBtn}>
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  
  // Sidebar
  sidebar: {
    width: '280px',
    backgroundColor: '#ffffff',
    boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto',
    zIndex: 100
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1.5rem',
    borderBottom: '1px solid #f0f0f0'
  },
  logo: {
    width: '40px',
    height: '40px'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#15BE6A'
  },
  userInfo: {
    padding: '1.5rem',
    borderBottom: '1px solid #f0f0f0'
  },
  userAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#15BE6A',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  userDetails: {
    flex: 1
  },
  userName: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.2rem',
    fontWeight: '600'
  },
  userEmail: {
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '0.5rem'
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    backgroundColor: '#f0f9f4',
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    color: '#15BE6A'
  },
  badgeIcon: {
    fontSize: '0.7rem'
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    padding: '1rem'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#666',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    width: '100%',
    position: 'relative'
  },
  navItemActive: {
    backgroundColor: '#f0f9f4',
    color: '#15BE6A'
  },
  navIcon: {
    fontSize: '1.2rem'
  },
  navBadge: {
    marginLeft: 'auto',
    backgroundColor: '#f0f0f0',
    padding: '0.2rem 0.5rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    color: '#666'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.8rem 1rem',
    margin: '1rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#fff0f0',
    color: '#ff4444',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  logoutIcon: {
    fontSize: '1.2rem'
  },
  
  // Main Content
  main: {
    flex: 1,
    marginLeft: '280px',
    padding: '2rem',
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  pageTitle: {
    fontSize: '1.8rem',
    color: '#333',
    fontWeight: '600'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  browseLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#15BE6A',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  browseIcon: {
    fontSize: '0.8rem'
  },
  
  // Welcome Card
  welcomeCard: {
    backgroundColor: 'linear-gradient(135deg, #15BE6A 0%, #0e8c4c 100%)',
    background: 'linear-gradient(135deg, #15BE6A 0%, #0e8c4c 100%)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white'
  },
  welcomeContent: {
    flex: 1
  },
  welcomeTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    fontWeight: '600'
  },
  welcomeText: {
    fontSize: '0.95rem',
    opacity: '0.9',
    marginBottom: '1rem'
  },
  continueLearningBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'white',
    color: '#15BE6A',
    textDecoration: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '25px',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  welcomeEmoji: {
    fontSize: '4rem'
  },
  
  // Stats Grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginBottom: '2.5rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  statIconContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: '#f0f9f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statIcon: {
    fontSize: '1.5rem',
    color: '#15BE6A'
  },
  statNumber: {
    fontSize: '1.5rem',
    color: '#333',
    fontWeight: '700',
    marginBottom: '0.2rem'
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#888'
  },
  
  // Sections
  section: {
    marginBottom: '2.5rem'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '1.5rem',
    fontWeight: '600'
  },
  
  // Continue Learning
  coursesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  continueCard: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  continueImage: {
    width: '200px',
    height: '150px',
    objectFit: 'cover'
  },
  continueContent: {
    flex: 1,
    padding: '1.5rem'
  },
  continueTitle: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.3rem',
    fontWeight: '600'
  },
  continueCenter: {
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '1rem'
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  progressBar: {
    flex: 1,
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#15BE6A',
    borderRadius: '4px'
  },
  progressText: {
    fontSize: '0.85rem',
    color: '#666',
    minWidth: '40px'
  },
  nextLesson: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: '#666'
  },
  playIcon: {
    color: '#15BE6A',
    fontSize: '0.8rem'
  },
  duration: {
    marginLeft: 'auto',
    color: '#888'
  },
  viewAllBtn: {
    backgroundColor: 'transparent',
    color: '#15BE6A',
    border: '2px solid #15BE6A',
    padding: '0.6rem 2rem',
    borderRadius: '25px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  
  // Activity
  activityList: {
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #f0f0f0'
  },
  activityIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#f0f9f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#15BE6A'
  },
  activityContent: {
    flex: 1
  },
  activityTitle: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '0.2rem'
  },
  activityDate: {
    fontSize: '0.75rem',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  },
  dateIcon: {
    fontSize: '0.7rem'
  },
  
  // Courses Grid
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem'
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  courseImageContainer: {
    position: 'relative',
    height: '180px'
  },
  courseImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  courseBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#15BE6A',
    color: 'white',
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  courseCardContent: {
    padding: '1rem'
  },
  courseCardTitle: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.3rem',
    fontWeight: '600'
  },
  courseCardCenter: {
    fontSize: '0.8rem',
    color: '#888',
    marginBottom: '1rem'
  },
  progressContainerSmall: {
    marginBottom: '1rem'
  },
  progressBarSmall: {
    height: '6px',
    backgroundColor: '#f0f0f0',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFillSmall: {
    height: '100%',
    backgroundColor: '#15BE6A',
    borderRadius: '3px'
  },
  continueBtn: {
    width: '100%',
    backgroundColor: '#15BE6A',
    color: 'white',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  continueIcon: {
    fontSize: '0.7rem'
  },
  
  // Completed Courses
  completedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem'
  },
  completedCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  completedIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#f0f9f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  trophyIcon: {
    fontSize: '1.5rem',
    color: '#15BE6A'
  },
  completedContent: {
    flex: 1
  },
  completedTitle: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.2rem',
    fontWeight: '600'
  },
  completedCenter: {
    fontSize: '0.8rem',
    color: '#888',
    marginBottom: '0.2rem'
  },
  completedDate: {
    fontSize: '0.7rem',
    color: '#999'
  },
  completedGrade: {
    fontSize: '0.8rem',
    color: '#15BE6A',
    fontWeight: '600',
    marginTop: '0.2rem'
  },
  
  // Certificates
  certificatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  certificateCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  certificateHeader: {
    backgroundColor: '#f0f9f4',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center'
  },
  certificateIconLarge: {
    fontSize: '3rem',
    color: '#15BE6A'
  },
  certificateBody: {
    padding: '1.5rem'
  },
  certificateCardTitle: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.3rem',
    fontWeight: '600'
  },
  certificateCardCenter: {
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '0.3rem'
  },
  certificateCardDate: {
    fontSize: '0.75rem',
    color: '#999',
    marginBottom: '1rem'
  },
  downloadBtn: {
    display: 'inline-block',
    backgroundColor: '#15BE6A',
    color: 'white',
    textDecoration: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  
  // Wishlist
  wishlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem'
  },
  wishlistCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    display: 'flex',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  wishlistImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover'
  },
  wishlistContent: {
    flex: 1,
    padding: '1rem'
  },
  wishlistTitle: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '0.2rem',
    fontWeight: '600'
  },
  wishlistCenter: {
    fontSize: '0.75rem',
    color: '#888',
    marginBottom: '0.5rem'
  },
  wishlistRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    marginBottom: '0.5rem'
  },
  ratingStar: {
    color: '#FFD700',
    fontSize: '0.7rem'
  },
  wishlistFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wishlistPrice: {
    fontSize: '1rem',
    color: '#15BE6A',
    fontWeight: '700'
  },
  enrollNowBtn: {
    backgroundColor: '#15BE6A',
    color: 'white',
    border: 'none',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    cursor: 'pointer'
  },
  
  // Empty State
  emptyContainer: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: 'white',
    borderRadius: '20px'
  },
  emptyImage: {
    width: '100px',
    height: '100px',
    marginBottom: '1.5rem',
    opacity: '0.5'
  },
  emptyTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '0.5rem'
  },
  emptyText: {
    color: '#666',
    marginBottom: '1.5rem'
  },
  browseCoursesBtn: {
    display: 'inline-block',
    backgroundColor: '#15BE6A',
    color: 'white',
    textDecoration: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '25px',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  
  // Loading
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '1rem'
  },
  spinner: {
    fontSize: '2rem',
    color: '#15BE6A',
    animation: 'spin 1s linear infinite'
  },
  
  // Responsive
  '@media (max-width: 768px)': {
    sidebar: {
      transform: 'translateX(-100%)',
      position: 'fixed',
      zIndex: 1000,
      transition: 'transform 0.3s ease'
    },
    main: {
      marginLeft: 0,
      padding: '1rem'
    },
    statsGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    welcomeCard: {
      flexDirection: 'column',
      textAlign: 'center'
    },
    continueCard: {
      flexDirection: 'column'
    },
    continueImage: {
      width: '100%',
      height: '200px'
    }
  }
};

// Add animation for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);