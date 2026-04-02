import { Navigate, useNavigate, useParams } from "react-router-dom";
import { courses } from "../../data/courses";
import { FaStar, FaClock, FaMapMarkerAlt, FaUser, FaBookOpen, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse } from "../../features/enrollments/enrollmentSlice";
import { useState,useMemo } from "react";

export default function CourseDetails(){

  const { id } = useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const course = courses.find(c => c.id === parseInt(id));
  const {isAuthenticated}=useSelector((state)=>state.auth)
  const { user } = useSelector((state) => state.auth);
  const [video,setVideo] = useState('');
  const [activeLesson, setActiveLesson] = useState(null);
  const [watchedLessons, setWatchedLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [unlockedLessons, setUnlockedLessons] = useState(['0-0']);


     const totalLessons = useMemo(() => {
      return course.modules.reduce((total, module) => total + module.lessons.length, 0);
    }, [course]);

    const isQuizEnabled = watchedLessons.length === totalLessons;

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

    
    if(!course){
      return <h2 style={{textAlign:"center", padding: "4rem", color: "#666"}}>Course not found</h2>
    }
   
  
  const handleEnroll=()=>{
    if(!isAuthenticated){
      navigate("/login")
    }else{
      dispatch(
      enrollCourse({
        studentId: user.id,
        courseId: course.id,
      })
    );
      navigate(`/student/learn/${course.id}`);
    }
  }

  const getEmbedUrl = (url) => {
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  };
      const handleLessonClick = (lesson, moduleIndex, lessonIndex) => {
      const lessonKey = `${moduleIndex}-${lessonIndex}`;

      if (!unlockedLessons.includes(lessonKey)) return;

      setVideo(lesson.video);
      setActiveLesson(lessonKey);

      setCompletedLessons((prev) => {
        if (prev.includes(lessonKey)) return prev;

        const updated = [...prev, lessonKey];

        const currentIndex = allLessons.findIndex((item) => item.key === lessonKey);
        const nextLesson = allLessons[currentIndex + 1];

        if (nextLesson) {
          setUnlockedLessons((prevUnlocked) => {
            if (prevUnlocked.includes(nextLesson.key)) return prevUnlocked;
            return [...prevUnlocked, nextLesson.key];
          });
        }

        return updated;
      });
    };

  return(
    <div style={styles.container}>
      {/* Hero Section with Image */}
      <div style={styles.heroSection}>
        <div style={styles.imageWrapper}>
          <img 
            src={course.image} 
            alt={course.title} 
            style={styles.image}
          />
          <div style={styles.imageOverlay}></div>
          <div style={styles.imageContent}>
            <h1 style={styles.title}>{course.title}</h1>
            <div style={styles.badge}>{course.level}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Center Info Card */}
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

        {/* Course Stats */}
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

        {/* ✅ MODIFIED: Modules + Video Side by Side */}
        <div style={styles.contentLayout}>

          {/* LEFT: Course Content Sidebar */}
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
                              ? '#e8faf2'
                              : isCompleted
                              ? '#f4fbf7'
                              : isLocked
                              ? '#f5f5f5'
                              : 'transparent',
                            borderLeft: isActive
                              ? '3px solid #15BE6A'
                              : isCompleted
                              ? '3px solid #b7ebcf'
                              : '3px solid transparent',
                          }}
                          onClick={() => handleLessonClick(lesson, index, i)}
                        >
                          <div style={styles.lessonLeft}>
                            <FaCheckCircle
                              style={{
                                ...styles.lessonIcon,
                                color: isCompleted || isActive ? '#15BE6A' : isLocked ? '#bdbdbd' : 'grey',
                              }}
                            />
                            <span
                              style={{
                                color: isActive
                                  ? '#15BE6A'
                                  : isCompleted
                                  ? '#2f855a'
                                  : isLocked
                                  ? '#999'
                                  : '#555',
                                fontWeight: isActive ? '600' : isCompleted ? '500' : '400',
                              }}
                            >
                              {lesson.title}
                            </span>
                          </div>

                          <span style={styles.watch}>
                            {isLocked ? '🔒' : isCompleted ? '✓' : '▶'}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
                    <div style={styles.quizBtnWrapper}>
                      <p style={styles.quizInfo}>
                        Videos completed: <strong>{completedLessons.length}</strong> / {totalLessons}
                      </p>

                      <button
                        style={isQuizEnabled ? styles.quizButton : styles.quizButtonDisabled}
                        disabled={!isQuizEnabled}
                        onClick={() => {
                          if (isQuizEnabled) {
                            navigate(`/student/quiz/${course.id}`);
                          }
                        }}
                      >
                        {isQuizEnabled
                          ? "Passer Quiz"
                          : "Complete all videos in order first"}
                      </button>
                    </div>
          </div>

          {/* RIGHT: Video Player */}
          <div style={styles.videoArea}>
            {video ? (
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(video)}
                title="Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={styles.videoIframe}
              />
            ) : (
              <div style={styles.videoPlaceholder}>
                <div style={styles.placeholderIcon}>▶</div>
                <p style={styles.placeholderText}>Select a lesson to start watching</p>
                <p style={styles.placeholderSub}>Choose any lesson from the sidebar on the left</p>
              </div>
            )}
          </div>

        </div>
        {/* END MODIFIED SECTION */}

      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
    borderRadius: "10px",
    width: "70%",
    maxWidth: "900px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "10px",
    zIndex: 1,
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "red",
    color: "#fff",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    zIndex: 3,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    minHeight: '100vh'
  },

  // Hero Section
  heroSection: {
    width: '100%',
    marginBottom: '2rem'
  },
  imageWrapper: {
    position: 'relative',
    height: '450px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)'
  },
  imageContent: {
    position: 'absolute',
    bottom: '3rem',
    left: '3rem',
    color: 'white'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1.3',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#15BE6A',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  // Main Content
  mainContent: {
    padding: '0 3rem 3rem 3rem'
  },

  // Center Card
  centerCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid #f0f0f0'
  },
  centerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    objectFit: 'cover'
  },
  centerInfo: {
    flex: 1
  },
  centerName: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '0.3rem',
    fontWeight: '600'
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#666',
    fontSize: '0.9rem'
  },
  locationIcon: {
    color: '#15BE6A',
    fontSize: '0.8rem'
  },
  centerDesc: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem',
    fontSize: '0.95rem'
  },
  goal: {
    color: '#333',
    fontSize: '1rem',
    padding: '0.8rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    borderLeft: `3px solid #15BE6A`
  },
  goalLabel: {
    fontWeight: '700',
    color: '#15BE6A'
  },

  // Stats Container
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '2.5rem'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  statIcon: {
    fontSize: '2rem',
    color: '#15BE6A'
  },
  statIconStar: {
    fontSize: '2rem',
    color: '#FFD700'
  },
  statValue: {
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: '700',
    marginBottom: '0.2rem'
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#888'
  },

  // Description Section
  descriptionSection: {
    marginBottom: '2.5rem'
  },
  sectionTitle: {
    fontSize: '1.4rem',
    color: '#333',
    marginBottom: '0',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  sectionIcon: {
    fontSize: '1.3rem',
    color: '#15BE6A'
  },
  description: {
    color: '#666',
    lineHeight: '1.8',
    fontSize: '1.05rem'
  },

  // ✅ NEW: Content Layout (Side by Side)
  contentLayout: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    height: '75vh',
  },

  // ✅ NEW: Modules Sidebar (LEFT)
  modulesSection: {
    width: '360px',
    minWidth: '300px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    border: '1px solid #eee',
    overflow: 'hidden',
    flexShrink: 0,
  },
  modulesSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '1.2rem 1.5rem',
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #15BE6A',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  modulesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    overflowY: 'auto',
    flex: 1,
    padding: '0.5rem 0',
  },
  moduleCard: {
  backgroundColor: 'transparent',
  overflow: 'visible',   
},

lessonsList: {
  listStyle: 'none',
  padding: '0',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  // ← حيد overflow و maxHeight كاملاً
},
  moduleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.9rem 1.2rem',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    borderTop: '1px solid #eee',
    marginTop: '6px',
  },
  moduleNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#15BE6A',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  moduleTitle: {
    fontSize: '0.95rem',
    color: '#333',
    fontWeight: '600',
    margin: 0,
  },
  lessonItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.8rem',
    padding: '0.65rem 1.2rem',
    color: '#555',
    fontSize: '0.88rem',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  lessonLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  lessonIcon: {
    fontSize: '0.85rem',
    flexShrink: 0,
  },
  watch: {
    color: '#15BE6A',
    fontSize: '0.75rem',
    flexShrink: 0,
  },

  // ✅ NEW: Video Area (RIGHT)
  videoArea: {
    flex: 1,
    height: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#0f0f0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  },
  videoIframe: {
    borderRadius: '20px',
    border: 'none',
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '3rem',
    textAlign: 'center',
  },
  placeholderIcon: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(21,190,106,0.15)',
    border: '2px solid #15BE6A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    color: '#15BE6A',
  },
  placeholderText: {
    color: '#ccc',
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: 0,
  },
  placeholderSub: {
    color: '#666',
    fontSize: '0.85rem',
    margin: 0,
  },

  // Footer
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    marginTop: '2rem',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  priceContainer: {
    textAlign: 'left'
  },
  price: {
    fontSize: '2.5rem',
    color: '#15BE6A',
    fontWeight: '700',
    marginBottom: '0.3rem'
  },
  priceNote: {
    fontSize: '0.9rem',
    color: '#888'
  },
  enrollBtn: {
    backgroundColor: '#15BE6A',
    color: 'white',
    border: 'none',
    padding: '1rem 2.5rem',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(21, 190, 106, 0.3)'
  },
  btnIcon: {
    fontSize: '1rem'
  },
  quiz : {
    backgroundColor: '#15BE6A',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '50px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(21, 190, 106, 0.3)',
    transition: 'all 0.3s ease',
  },
  quizBtnWrapper: {
  padding: '1rem 1.2rem 1.3rem',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #e9ecef',
},

quizButton: {
  width: '100%',
  background: 'linear-gradient(135deg, #15BE6A 0%, #12a85d 100%)',
  color: '#fff',
  border: 'none',
  padding: '0.95rem 1.2rem',
  borderRadius: '14px',
  fontSize: '0.95rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 18px rgba(21, 190, 106, 0.25)',
  letterSpacing: '0.3px',
},

quizButtonDisabled: {
  width: '100%',
  backgroundColor: '#e9ecef',
  color: '#8a8f98',
  border: '1px solid #dde2e7',
  padding: '0.95rem 1.2rem',
  borderRadius: '14px',
  fontSize: '0.95rem',
  fontWeight: '700',
  cursor: 'not-allowed',
  boxShadow: 'none',
  letterSpacing: '0.3px',
},
};