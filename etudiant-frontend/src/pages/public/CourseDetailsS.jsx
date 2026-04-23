import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { useMemo, useState, useEffect } from "react";
import { fetchCourseById, normalizeCourse } from "../../services/courseApi";

export default function CourseDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState("");
  const [videoKey, setVideoKey] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [unlockedLessons, setUnlockedLessons] = useState(["0-0"]);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseById(id);
        const normalized = normalizeCourse(data);

        if ((!normalized.modules || normalized.modules.length === 0) && Array.isArray(normalized.lessons)) {
          normalized.modules = [{ title: "Module 1", lessons: normalized.lessons }];
        }

        setCourse(normalized);
      } catch (error) {
        console.log("LOAD COURSE ERROR:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const getTotalLessons = (course) => {
    return course.modules.reduce((total, module) => {
      return total + module.lessons.length;
    }, 0);
  };

  const calculateProgress = (course, completedLessons) => {
    const totalLessons = getTotalLessons(course);
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  const markLessonAsCompleted = async (moduleIndex, lessonIndex) => {
  const lessonKey = `${moduleIndex}-${lessonIndex}`;

  if (completedLessons.includes(lessonKey)) return;

  const updatedCompletedLessons = [...completedLessons, lessonKey];
  setCompletedLessons(updatedCompletedLessons);

  const totalLessons = getTotalLessons(course);
  const percentage = Math.round((updatedCompletedLessons.length / totalLessons) * 100);

  try {
    await axios.post("http://127.0.0.1:8000/api/progress", {
      student_id: user.id,
      course_id: course.id,
      lesson_key: lessonKey,
      percentage: percentage,  
      completed: true,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id || !course?.id) return;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/progress/${user.id}/${course.id}`
        );
        const savedLessons = res.data.progress.map((item) => item.lesson_key);
        setCompletedLessons(savedLessons);

        const unlocked = ["0-0"];
        savedLessons.forEach((lessonKey) => {
          const [moduleIndex, lessonIndex] = lessonKey.split("-").map(Number);
          const currentModule = course.modules[moduleIndex];
          if (!currentModule) return;
          if (lessonIndex + 1 < currentModule.lessons.length) {
            unlocked.push(`${moduleIndex}-${lessonIndex + 1}`);
          } else if (course.modules[moduleIndex + 1]) {
            unlocked.push(`${moduleIndex + 1}-0`);
          }
        });
        setUnlockedLessons([...new Set(unlocked)]);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchProgress();
  }, [user?.id, course?.id]);

  const allLessons = course
    ? course.modules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => ({
          ...lesson,
          key: `${moduleIndex}-${lessonIndex}`,
          moduleIndex,
          lessonIndex,
        }))
      )
    : [];

  const totalLessons = useMemo(() => {
    if (!course) return 0;
    return course.modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    );
  }, [course]);

  const isQuizEnabled = completedLessons.length === totalLessons;

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "3rem" }}>Loading course...</h2>;
  }

  if (!course) {
    return (
      <h2 style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
        Course not found
      </h2>
    );
  }



  const handleLessonClick = async (lesson, moduleIndex, lessonIndex) => {
    const lessonKey = `${moduleIndex}-${lessonIndex}`;
    if (!unlockedLessons.includes(lessonKey)) return;

    setVideo(lesson.video);
    setVideoKey((prev) => prev + 1);
    setActiveLesson(lessonKey);

    const currentIndex = allLessons.findIndex((item) => item.key === lessonKey);
    const nextLesson = allLessons[currentIndex + 1];
    if (nextLesson) {
      setUnlockedLessons((prevUnlocked) => {
        if (prevUnlocked.includes(nextLesson.key)) return prevUnlocked;
        return [...prevUnlocked, nextLesson.key];
      });
    }

    await markLessonAsCompleted(moduleIndex, lessonIndex);
  };

    const baseUrl = "http://127.0.0.1:8001";
    const getVideoUrl = (videoPath) => {
      if (!videoPath) return "";

      
      if (videoPath.startsWith("http")) {
        return videoPath;
      }

      
      return `${baseUrl}/storage/${videoPath}`;
    };

const rawCourseImage =
  course.image ||
  course.course_image ||
  course.image_url ||
  "";

const courseImage = rawCourseImage
  ? rawCourseImage.startsWith("http")
    ? rawCourseImage
    : `${baseUrl}/storage/${rawCourseImage}`
  : "/default-course.jpg";

  return (
    <div style={styles.container}>
      {/* Hero */}
      <div style={styles.heroSection}>
        <div style={styles.imageWrapper}>
          <img
          src={courseImage}
          alt={course.title}
          style={styles.image}
          onError={(e) => {
            e.target.src = "/default-course.jpg";
          }}
        />
          <div style={styles.imageOverlay}></div>
          <div style={styles.imageContent}>
            <h1 style={styles.title}>{course.title}</h1>
            <div style={styles.badge}>{course.level}</div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Center Card */}
        <div style={styles.centerCard}>
          <div style={styles.centerHeader}>
            <img
              src={course.center.logo || "https://img.icons8.com/color/48/000000/school.png"}
              alt={course.center.name}
              style={styles.logo}
            />
            <div style={styles.centerInfo}>
              <h3 style={styles.centerName}>{course.center.name}</h3>
              <p style={styles.location}>
                <FaMapMarkerAlt style={styles.locationIcon} /> {course.center.location}
              </p>
            </div>
          </div>
          <p style={styles.centerDesc}>{course.center.description}</p>
          <p style={styles.goal}>
            <span style={styles.goalLabel}>🎯 Goal:</span> {course.center.goal}
          </p>
        </div>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <FaStar style={styles.statIconStar} />
            <div>
              <h4 style={styles.statValue}>{course.rating}</h4>
              <p style={styles.statLabel}>Rating ({course.reviews} reviews)</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <FaClock style={styles.statIcon} />
            <div>
              <h4 style={styles.statValue}>{course.duration}</h4>
              <p style={styles.statLabel}>Duration</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <FaUser style={styles.statIcon} />
            <div>
              <h4 style={styles.statValue}>{course.instructor}</h4>
              <p style={styles.statLabel}>Instructor</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={styles.descriptionSection}>
          <h2 style={styles.sectionTitle}>About This Course</h2>
          <p style={styles.description}>{course.description}</p>
        </div>

        {/* Content Layout */}
        <div style={styles.contentLayout}>

          {/* LEFT: Sidebar */}
          <div style={styles.modulesSection}>
            <div style={styles.modulesSectionHeader}>
              <FaBookOpen style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>Course Content</h2>
            </div>

            <div style={styles.modulesList}>
              {course.modules.map((module, index) => (
                <div key={index} style={styles.moduleCard}>
                  <div style={styles.moduleHeader}>
                    <div style={styles.moduleNumber}>{index + 1}</div>
                    <h3 style={styles.moduleTitle}>{module.title}</h3>
                  </div>
                  <ul style={styles.lessonsList}>
                    {module.lessons.map((lesson, i) => {
                      const lessonKey = `${index}-${i}`;
                      const isActive = activeLesson === lessonKey;
                      const isCompleted = completedLessons.includes(lessonKey);
                      const isUnlocked = unlockedLessons.includes(lessonKey);
                      const isLocked = !isUnlocked;
                      return (
                        <li
                          key={i}
                          style={{
                            ...styles.lessonItem,
                            ...(isLocked ? styles.lessonItemLocked : {}),
                            backgroundColor: isActive
                              ? "#e8faf2"
                              : isCompleted
                              ? "#f4fbf7"
                              : isLocked
                              ? "#f5f5f5"
                              : "transparent",
                            borderLeft: isActive
                              ? "3px solid #15BE6A"
                              : isCompleted
                              ? "3px solid #b7ebcf"
                              : "3px solid transparent",
                          }}
                          onClick={() => handleLessonClick(lesson, index, i)}
                        >
                          <div style={styles.lessonLeft}>
                            <FaCheckCircle
                              style={{
                                ...styles.lessonIcon,
                                color: isCompleted || isActive
                                  ? "#15BE6A"
                                  : isLocked
                                  ? "#bdbdbd"
                                  : "grey",
                              }}
                            />
                            <span
                              style={{
                                color: isActive
                                  ? "#15BE6A"
                                  : isCompleted
                                  ? "#2f855a"
                                  : isLocked
                                  ? "#999"
                                  : "#555",
                                fontWeight: isActive
                                  ? "600"
                                  : isCompleted
                                  ? "500"
                                  : "400",
                              }}
                            >
                              {lesson.title}
                            </span>
                          </div>
                          <span style={styles.watch}>
                            {isLocked ? "🔒" : isCompleted ? "✓" : "▶"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Quiz Button */}
            <div style={styles.quizBtnWrapper}>
              <p style={styles.quizInfo}>
                Videos completed: <strong>{completedLessons.length}</strong> / {totalLessons}
              </p>
              <button
                style={isQuizEnabled ? styles.quizButton : styles.quizButtonDisabled}
                disabled={!isQuizEnabled}
                onClick={() => { if (isQuizEnabled) navigate(`/quiz/${course.id}`); }}
              >
                {isQuizEnabled ? "🎉 Passer Quiz" : "🔒 Complete all videos first"}
              </button>
            </div>
          </div>

          {/* RIGHT: Video */}
         <div style={styles.videoArea}>
          {video ? (
            <video
              key={videoKey}
              width="100%"
              height="100%"
              controls
              autoPlay
              style={styles.videoIframe}
            >
             <source src={getVideoUrl(video)} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div style={styles.videoPlaceholder}>
              <div style={styles.placeholderIcon}>▶</div>
              <p style={styles.placeholderText}>Select a lesson to start watching</p>
              <p style={styles.placeholderSub}>Choose any lesson from the sidebar on the left</p>
            </div>
          )}
        </div>

        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    paddingBottom: "3rem",
  },

  heroSection: {
    width: "100%",
    marginBottom: "2rem",
  },
  imageWrapper: {
    position: "relative",
    height: "420px",
    overflow: "hidden",
    borderBottomLeftRadius: "24px",
    borderBottomRightRadius: "24px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)",
  },
  imageContent: {
    position: "absolute",
    left: "3rem",
    bottom: "2.5rem",
    color: "#fff",
    maxWidth: "700px",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "800",
    margin: "0 0 1rem 0",
    lineHeight: "1.25",
    textShadow: "0 2px 8px rgba(0,0,0,0.25)",
  },
  badge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #15BE6A 0%, #12a85d 100%)",
    color: "#fff",
    padding: "0.55rem 1.2rem",
    borderRadius: "999px",
    fontSize: "0.82rem",
    fontWeight: "700",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    boxShadow: "0 6px 18px rgba(21, 190, 106, 0.28)",
  },

  mainContent: {
    padding: "0 2.5rem",
  },

  centerCard: {
    backgroundColor: "#f8fafb",
    borderRadius: "22px",
    padding: "1.8rem",
    marginBottom: "1.6rem",
    border: "1px solid #edf1f4",
    boxShadow: "0 6px 24px rgba(15, 23, 42, 0.04)",
  },
  centerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.25rem",
  },
  logo: {
    width: "64px",
    height: "64px",
    borderRadius: "14px",
    objectFit: "cover",
    backgroundColor: "#fff",
    border: "1px solid #e9eef2",
  },
  centerInfo: {
    flex: 1,
  },
  centerName: {
    fontSize: "1.2rem",
    color: "#1f2937",
    fontWeight: "700",
    margin: "0 0 0.35rem 0",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    color: "#6b7280",
    fontSize: "0.92rem",
    margin: 0,
  },
  locationIcon: {
    color: "#15BE6A",
    fontSize: "0.82rem",
  },
  centerDesc: {
    color: "#5f6b76",
    lineHeight: "1.7",
    marginBottom: "0.9rem",
    fontSize: "0.97rem",
  },
  goal: {
    margin: 0,
    color: "#374151",
    fontSize: "0.97rem",
    padding: "0.9rem 1rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    borderLeft: "4px solid #15BE6A",
  },
  goalLabel: {
    fontWeight: "700",
    color: "#15BE6A",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
    padding: "1.2rem 1.1rem",
    backgroundColor: "#f8fafb",
    borderRadius: "18px",
    border: "1px solid #edf1f4",
    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
  },
  statIcon: {
    fontSize: "1.8rem",
    color: "#15BE6A",
    flexShrink: 0,
  },
  statIconStar: {
    fontSize: "1.8rem",
    color: "#f5c542",
    flexShrink: 0,
  },
  statValue: {
    fontSize: "1.06rem",
    color: "#1f2937",
    fontWeight: "700",
    margin: "0 0 0.2rem 0",
  },
  statLabel: {
    fontSize: "0.84rem",
    color: "#8a94a1",
    margin: 0,
  },

  descriptionSection: {
    marginBottom: "1.8rem",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    color: "#1f2937",
    margin: 0,
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
  },
  sectionIcon: {
    fontSize: "1.15rem",
    color: "#15BE6A",
    flexShrink: 0,
  },
  description: {
    color: "#5f6b76",
    lineHeight: "1.85",
    fontSize: "1rem",
    marginTop: "0.9rem",
  },

  contentLayout: {
    display: "grid",
    gridTemplateColumns: "360px minmax(0, 1fr)",
    gap: "24px",
    alignItems: "stretch",
    minHeight: "680px",
  },

  modulesSection: {
    backgroundColor: "#f8fafb",
    borderRadius: "22px",
    border: "1px solid #edf1f4",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: "680px",
    boxShadow: "0 8px 28px rgba(15, 23, 42, 0.05)",
  },
  modulesSectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "1.1rem 1.25rem",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #eef2f5",
  },
  modulesList: {
    flex: 1,
    overflowY: "auto",
    padding: "0.6rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  moduleCard: {
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  moduleHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    padding: "0.9rem 1rem",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #eef2f5",
    borderBottom: "1px solid #eef2f5",
  },
  moduleNumber: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #15BE6A 0%, #12a85d 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.82rem",
    fontWeight: "700",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(21, 190, 106, 0.2)",
  },
  moduleTitle: {
    fontSize: "0.95rem",
    color: "#1f2937",
    fontWeight: "700",
    margin: 0,
  },
  lessonsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
  },
  lessonItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    padding: "0.82rem 1rem",
    fontSize: "0.9rem",
    borderBottom: "1px solid #eef2f5",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  lessonItemLocked: {
    cursor: "not-allowed",
    opacity: 0.78,
  },
  lessonLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    minWidth: 0,
  },
  lessonIcon: {
    fontSize: "0.82rem",
    flexShrink: 0,
  },
  watch: {
    color: "#15BE6A",
    fontSize: "0.78rem",
    fontWeight: "700",
    flexShrink: 0,
  },

  quizBtnWrapper: {
    padding: "1rem",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #eef2f5",
  },
  quizInfo: {
    margin: "0 0 0.8rem 0",
    fontSize: "0.86rem",
    color: "#6b7280",
    textAlign: "center",
  },
  quizButton: {
    width: "100%",
    background: "linear-gradient(135deg, #15BE6A 0%, #12a85d 100%)",
    color: "#fff",
    border: "none",
    padding: "0.95rem 1rem",
    borderRadius: "14px",
    fontSize: "0.94rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 22px rgba(21, 190, 106, 0.24)",
    transition: "all 0.25s ease",
  },
  quizButtonDisabled: {
    width: "100%",
    backgroundColor: "#e9edf1",
    color: "#8b95a1",
    border: "1px solid #dde3e8",
    padding: "0.95rem 1rem",
    borderRadius: "14px",
    fontSize: "0.94rem",
    fontWeight: "700",
    cursor: "not-allowed",
  },

  videoArea: {
    minHeight: "680px",
    borderRadius: "22px",
    overflow: "hidden",
    backgroundColor: "#0f1720",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 34px rgba(15, 23, 42, 0.12)",
    border: "1px solid #18212b",
  },
  videoIframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  videoPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "3rem",
    gap: "0.9rem",
  },
  placeholderIcon: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    backgroundColor: "rgba(21,190,106,0.12)",
    border: "2px solid #15BE6A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.7rem",
    color: "#15BE6A",
  },
  placeholderText: {
    color: "#f3f4f6",
    fontSize: "1.08rem",
    fontWeight: "700",
    margin: 0,
  },
  placeholderSub: {
    color: "#9ca3af",
    fontSize: "0.9rem",
    margin: 0,
    maxWidth: "320px",
    lineHeight: "1.6",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.6rem 1.8rem",
    backgroundColor: "#f8fafb",
    borderRadius: "20px",
    marginTop: "2rem",
    border: "1px solid #edf1f4",
  },
  priceContainer: {
    textAlign: "left",
  },
  price: {
    fontSize: "2.2rem",
    color: "#15BE6A",
    fontWeight: "800",
    margin: "0 0 0.25rem 0",
  },
  priceNote: {
    fontSize: "0.92rem",
    color: "#8b95a1",
    margin: 0,
  },
};