import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser } from "../../features/auth/authSlice";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaBookOpen,
  FaCertificate,
  FaClock,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaUserCircle,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { courses } from "../../data/courses";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh"
  },
  
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },
  
  coverPhoto: {
    height: "200px",
    background: "linear-gradient(135deg, #15BE6A, #0e8a4c)",
    position: "relative"
  },
  
  profileHeader: {
    padding: "0 30px 30px",
    position: "relative"
  },
  
  avatarContainer: {
    position: "relative",
    marginTop: "-75px",
    marginBottom: "20px",
    display: "inline-block"
  },
  
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "5px solid #fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    objectFit: "cover",
    backgroundColor: "#fff"
  },
  
  avatarPlaceholder: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "5px solid #fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    backgroundColor: "#15BE6A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
    color: "#fff"
  },
  
  editAvatarBtn: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    backgroundColor: "#15BE6A",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  },
  
  profileInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "20px"
  },
  
  infoSection: {
    flex: 1
  },
  
  name: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "8px"
  },
  
  email: {
    fontSize: "16px",
    color: "#6c757d",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px"
  },
  
  memberSince: {
    fontSize: "14px",
    color: "#6c757d",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  editButton: {
    backgroundColor: "transparent",
    border: "2px solid #15BE6A",
    color: "#15BE6A",
    padding: "10px 24px",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  editForm: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px"
  },
  
  formGroup: {
    marginBottom: "20px"
  },
  
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#495057",
    marginBottom: "8px"
  },
  
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.3s ease"
  },
  
  formActions: {
    display: "flex",
    gap: "12px",
    marginTop: "20px"
  },
  
  saveButton: {
    backgroundColor: "#15BE6A",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  cancelButton: {
    backgroundColor: "#e9ecef",
    color: "#495057",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  
  statCard: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  
  statIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "rgba(21,190,106,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "#15BE6A"
  },
  
  statInfo: {
    flex: 1
  },
  
  statValue: {
    fontSize: "24px",
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
    borderRadius: "15px",
    padding: "24px",
    marginBottom: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingBottom: "12px",
    borderBottom: "2px solid #f0f0f0"
  },
  
  courseList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px"
  },
  
  courseItem: {
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    transition: "all 0.3s ease"
  },
  
  courseTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "8px"
  },
  
  courseProgress: {
    marginTop: "12px"
  },
  
  progressBar: {
    height: "6px",
    backgroundColor: "#e9ecef",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "8px"
  },
  
  progressFill: {
    height: "100%",
    backgroundColor: "#15BE6A",
    borderRadius: "3px",
    transition: "width 0.3s ease"
  },
  
  progressText: {
    fontSize: "12px",
    color: "#6c757d"
  },
  
  certificateList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px"
  },
  
  certificateItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px"
  },
  
  certificateIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
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
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "4px"
  },
  
  certificateDate: {
    fontSize: "12px",
    color: "#6c757d"
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
  shareButton: {
  backgroundColor: "#0d6efd",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
},
};


export default function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const myCoursesIds = useSelector((state) => state.enrollments.myCourses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [copiedLink, setCopiedLink] = useState("");


  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    username: ""
  });
  const [loading, setLoading] = useState(true);

  // Get enrolled courses
  const enrolledCourses = courses.filter(course =>
    myCoursesIds.includes(course.id)
  );

  // Mock completed courses and certificates (replace with actual data later)
  const [completedCourses] = useState([
    {
      id: 1,
      title: "Python for Beginners",
      completedDate: "2024-03-10",
      progress: 100
    }
  ]);

  const [certificates] = useState([
    {
      id: 1,
      title: "Python for Beginners",
      issueDate: "March 10, 2024"
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setEditedUser({
        name: user.name || "",
        email: user.email || "",
        username: user.username || user.name || ""
      });
    }

    setTimeout(() => setLoading(false), 500);
  }, [isAuthenticated, navigate, user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || user?.name || ""
    });
  };
  

  const handleSave = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(u => u.email === user.email);

  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      name: editedUser.name,
      username: editedUser.username,
      email: editedUser.email
    };
    localStorage.setItem("users", JSON.stringify(users));
  }

  const updatedUser = {
    ...user,
    name: editedUser.name,
    username: editedUser.username,
    email: editedUser.email
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));

  dispatch(updateUser(updatedUser));

  setIsEditing(false);
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getMemberSince = () => {
    if (!user) return "N/A";
    // You can store registration date in localStorage when user registers
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = users.find(u => u.email === user.email);
    if (userData && userData.registeredAt) {
      return new Date(userData.registeredAt).toLocaleDateString();
    }
    return "January 2024"; // Default
  };

  const calculateProgress = (courseId) => {
    // You can implement actual progress tracking here
    return Math.floor(Math.random() * 100);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p style={{ color: "#6c757d" }}>Loading profile...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  const getProfileLink = () => {
  const username = user?.username || user?.name;
  return `${window.location.origin}/profile/${username.toLowerCase()}`;
};
const handleShare = () => {
  const link = getProfileLink();
  navigator.clipboard.writeText(link);
  setCopiedLink(link);
};

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.coverPhoto}></div>
        
        <div style={styles.profileHeader}>
          <div style={styles.avatarContainer}>
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} style={styles.avatar} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                <FaUserCircle />
              </div>
            )}
            <button style={styles.editAvatarBtn}>
              <FaCamera />
            </button>
          </div>

          <div style={styles.profileInfo}>
            <div style={styles.infoSection}>
              {!isEditing ? (
                <>
                  <h1 style={styles.name}>{user?.name || user?.username || "Student"}</h1>
                  <div style={styles.email}>
                    <FaEnvelope />
                    {user?.email}
                  </div>
                  <div style={styles.memberSince}>
                    <FaCalendarAlt />
                    Member since {getMemberSince()}
                  </div>
                </>
              ) : (
                <div style={styles.editForm}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formActions}>
                    <button onClick={handleSave} style={styles.saveButton}>
                      <FaSave /> Save Changes
                    </button>
                    <button onClick={handleCancel} style={styles.cancelButton}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
            {!isEditing && (
                <>
                <button onClick={handleEdit} style={styles.editButton}>
                    <FaEdit /> Edit Profile
                </button>

                <button onClick={handleShare} style={styles.shareButton}>
                    🔗 Share Profile
                </button>
                </>
            )}
</div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaBookOpen />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{enrolledCourses.length}</div>
            <div style={styles.statLabel}>Courses Enrolled</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaCheckCircle />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{completedCourses.length}</div>
            <div style={styles.statLabel}>Completed Courses</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaCertificate />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{certificates.length}</div>
            <div style={styles.statLabel}>Certificates Earned</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FaClock />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{enrolledCourses.length * 5}+</div>
            <div style={styles.statLabel}>Hours Learned</div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      {enrolledCourses.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaBookOpen style={{ color: "#15BE6A" }} />
            Current Courses
          </div>
          <div style={styles.courseList}>
            {enrolledCourses.map(course => (
              <div key={course.id} style={styles.courseItem}>
                <div style={styles.courseTitle}>{course.title}</div>
                <div style={styles.courseProgress}>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressFill,
                      width: `${calculateProgress(course.id)}%`
                    }}></div>
                  </div>
                  <div style={styles.progressText}>
                    {calculateProgress(course.id)}% Complete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaCertificate style={{ color: "#15BE6A" }} />
            My Certificates
          </div>
          <div style={styles.certificateList}>
            {certificates.map(cert => (
              <div key={cert.id} style={styles.certificateItem}>
                <div style={styles.certificateIcon}>
                  <FaCertificate />
                </div>
                <div style={styles.certificateInfo}>
                  <div style={styles.certificateTitle}>{cert.title}</div>
                  <div style={styles.certificateDate}>Issued: {cert.issueDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}