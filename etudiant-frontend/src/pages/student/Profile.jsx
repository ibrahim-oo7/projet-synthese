import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../features/auth/authSlice";
import { setEnrollments } from "../../features/enrollments/enrollmentSlice";
import {
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
import axios from "axios";
import CourseCard from "../../components/CourseCard";

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
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px"
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
  const [coursesProgress, setCoursesProgress] = useState({});
  const [certificates, setCertificates] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ enrolled courses من Redux
  const enrolledCourses = courses.filter((course) =>
    myCoursesIds.includes(Number(course.id))
  );

  // ✅ current = progress < 100
  const currentCourses = enrolledCourses.filter(
    (course) => Number(coursesProgress[course.id] || 0) < 100
  );

  // ✅ completed = progress === 100
  const completedCourses = enrolledCourses.filter(
    (course) => Number(coursesProgress[course.id] || 0) === 100
  );

  const stats = {
    currentCourses: currentCourses.length,
    completedCourses: completedCourses.length,
    certificates: certificates.length,
    totalHours: enrolledCourses.reduce(
      (total, course) => total + (parseInt(course.duration) || 5),
      0
    )
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.scrollTo(0, 0);
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
  }, [isAuthenticated, navigate, user]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.id || !token) {
        dispatch(setEnrollments([]));
        return;
      }
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/my-enrollments", {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        const enrolledCourseIds = res.data.map((e) => Number(e.course_id));
        dispatch(setEnrollments(enrolledCourseIds));
      } catch (error) {
        console.log("Error fetching enrollments:", error.response?.data || error.message);
      }
    };
    fetchEnrollments();
  }, [user?.id]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id || !token) return;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/progress/${user.id}`,
          { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
        );
        const formattedProgress = {};
        res.data.forEach((item) => {
          formattedProgress[Number(item.course_id)] = Number(item.percentage);
        });
        setCoursesProgress(formattedProgress);
      } catch (error) {
        console.log("Error fetching progress:", error.response?.data || error.message);
      }
    };
    fetchProgress();
  }, [user?.id]);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user?.id || !token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/my-certificates", {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        setCertificates(res.data || []);
      } catch (error) {
        console.log("Error fetching certificates:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [user?.id]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ name: user?.name || "", email: user?.email || "", username: user?.username || user?.name || "" });
  };


const [avatar, setAvatar] = useState(null);
const handleSave = async () => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("name", editedUser.name);
    formData.append("email", editedUser.email);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    const response = await axios.post(
      "http://127.0.0.1:8000/api/update-profile?_method=PUT",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedUser = response.data.user;

    localStorage.setItem("user", JSON.stringify(updatedUser));
    dispatch(updateUser(updatedUser));
    setIsEditing(false);
    setAvatar(null);

  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Failed to update profile");
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
  const getMemberSince = () => {
    if (!user) return "N/A";
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = users.find((u) => u.email === user.email);
    if (userData?.registeredAt) return new Date(userData.registeredAt).toLocaleDateString();
    return "January 2024";
  };
  const handleShare = () => {
    const username = user?.username || user?.name || "student";
    const link = `${window.location.origin}/profile/${username.toLowerCase()}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p style={{ color: "#6c757d" }}>Loading profile...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Profile Card — ماتبدلش */}
      <div style={styles.profileCard}>
        <div style={styles.coverPhoto}></div>
        <div style={styles.profileHeader}>
          <div style={styles.avatarContainer}>
              <input
            id="avatarInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setAvatar(e.target.files[0])}
            />
           {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="preview"
                style={styles.avatar}
              />
            ) : user?.avatar ? (
              <img src={user.avatar} alt={user.name} style={styles.avatar} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                <FaUserCircle />
              </div>
            )}
           <button
            type="button"
            style={styles.editAvatarBtn}
            onClick={() => document.getElementById("avatarInput").click()}
            >
            <FaCamera />
          </button>
          </div>

          <div style={styles.profileInfo}>
            <div style={styles.infoSection}>
              {!isEditing ? (
                <>
                  <h1 style={styles.name}>{user?.name || user?.username || "Student"}</h1>
                  <div style={styles.email}><FaEnvelope />{user?.email}</div>
                  <div style={styles.memberSince}><FaCalendarAlt />Member since {getMemberSince()}</div>
                </>
              ) : (
                <div style={styles.editForm}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name</label>
                    <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input type="text" name="username" value={editedUser.username} onChange={handleInputChange} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} style={styles.input} />
                  </div>
                  <div style={styles.formActions}>
                    <button onClick={handleSave} style={styles.saveButton}><FaSave /> Save Changes</button>
                    <button onClick={handleCancel} style={styles.cancelButton}><FaTimes /> Cancel</button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {!isEditing && (
                <>
                  <button onClick={handleEdit} style={styles.editButton}><FaEdit /> Edit Profile</button>
                  <button onClick={handleShare} style={styles.shareButton}>🔗 Share Profile</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Stats — dynamic */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}><FaBookOpen /></div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{stats.currentCourses}</div>
            <div style={styles.statLabel}>Current Courses</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}><FaCheckCircle /></div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{stats.completedCourses}</div>
            <div style={styles.statLabel}>Completed Courses</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}><FaCertificate /></div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{stats.certificates}</div>
            <div style={styles.statLabel}>Certificates Earned</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}><FaClock /></div>
          <div style={styles.statInfo}>
            <div style={styles.statValue}>{stats.totalHours}</div>
            <div style={styles.statLabel}>Hours Learned</div>
          </div>
        </div>
      </div>

      {/* ✅ Current Courses — dynamic */}
      {currentCourses.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaBookOpen style={{ color: "#15BE6A" }} />
            Current Courses
          </div>
          <div style={styles.courseGrid}>
            {currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={coursesProgress[course.id] || 0}
              />
            ))}
          </div>
        </div>
      )}

      {/* ✅ Certificates — dynamic */}
      {certificates.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaCertificate style={{ color: "#15BE6A" }} />
            My Certificates
          </div>
          <div style={styles.certificateList}>
            {certificates.map((cert) => {
              const courseTitle =
                courses.find((course) => course.id === Number(cert.course_id))?.title ||
                `Course #${cert.course_id}`;
              return (
                <div
                  key={cert.id}
                  style={{ ...styles.certificateItem, cursor: "pointer" }}
                  onClick={() => { window.scrollTo(0, 0); navigate(`/certificate/${cert.course_id}`); }}
                >
                  <div style={styles.certificateIcon}><FaCertificate /></div>
                  <div style={styles.certificateInfo}>
                    <div style={styles.certificateTitle}>{courseTitle}</div>
                    <div style={styles.certificateDate}>
                      Issued: {new Date(cert.issued_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ✅ Completed Courses — dynamic */}
      {completedCourses.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaCheckCircle style={{ color: "#15BE6A" }} />
            Completed Courses
          </div>
          <div style={styles.courseGrid}>
            {completedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={coursesProgress[course.id] || 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}