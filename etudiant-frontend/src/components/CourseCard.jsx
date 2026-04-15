import { FaStar, FaUserGraduate, FaClock } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";


export default function CourseCard({course, progress = 0 }){
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const myCourses = useSelector((state) => state.enrollments.myCourses);
    const navigate=useNavigate();
  
  if(!course){
    return <h2 style={{textAlign:"center", padding: "4rem", color: "#666"}}>Course not found</h2>
  }

    const handleEnroll = () => {
    if (!isAuthenticated) {
        window.scrollTo(0, 0);
        navigate("/login");
        return;
    }

  // check already enrolled
  if (myCourses.includes(course.id)){
      window.scrollTo(0, 0);
      navigate(`/course/${course.id}`);
    return;
  }

  window.scrollTo(0, 0);
  navigate(`/Enroll/${course.id}`);
};

console.log("progress prop:", progress, typeof progress);

    return(
        <div style={styles.card} >
            <div style={styles.imageContainer}>
                <img src={course.image} alt={course.title} style={styles.image}/>
                <span style={styles.badge}>{course.level}</span>
            </div>
        {progress > 0 && (
        <div style={styles.progressContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={styles.progressLabel}>Progress</span>
            <span style={styles.progressLabel}>{progress}%</span>
            </div>
            <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
        </div>
        )}
        <div style={styles.content}>
            <div style={styles.centerInfo}>
                <img src={course.center.logo} alt={course.center.name} style={styles.logoCenter}/>
                <span style={styles.centerName}>{course.center.name}</span>
                </div>
                <h3 style={styles.title}>{course.title}</h3>
                <p style={styles.instructor}>By instr.{course.instructor}</p>
                
                <div style={styles.meta}>
                    <div style={styles.rating}>
                        <FaStar style={styles.starIcon} />
                        <span>{course.rating}</span>
                        <span style={styles.reviews}>({course.reviews})</span>
                    </div>
                    <div style={styles.duration}>
                        <FaClock style={styles.clockIcon} />
                        <span>{course.duration}</span>
                    </div>
                </div>

                <div style={styles.footer}>
                    <p style={styles.price}>${course.price}</p>
                   <button style={styles.enrollLink} onClick={handleEnroll}>
                    {myCourses.includes(course.id) ? "Continue Learning" : "Enroll"}
                    </button>
                    </div>
                    </div>
                </div>        

    )
}

const styles = {
    card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        position: 'relative',
        height: '200px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease'
    },
    badge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        backgroundColor: '#15BE6A',
        color: 'white',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    content: {
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    centerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
    },
    logoCenter: {
        width: '25px',
        height: '25px',
        borderRadius: '5px'
    },
    centerName: {
        fontSize: '0.9rem',
        color: '#666'
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#333',
        lineHeight: '1.4'
    },
    instructor: {
        fontSize: '0.9rem',
        color: '#888',
        marginBottom: '1rem'
    },
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem'
    },
    starIcon: {
        color: '#FFD700',
        fontSize: '1rem'
    },
    reviews: {
        color: '#999',
        fontSize: '0.8rem'
    },
    duration: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        color: '#666',
        fontSize: '0.9rem'
    },
    clockIcon: {
        color: '#15BE6A',
        fontSize: '0.9rem'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        borderTop: '1px solid #f0f0f0',
        paddingTop: '1rem'
    },
    price: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#15BE6A'
    },
    enrollLink: {
        backgroundColor: 'transparent',
        color: '#15BE6A',
        border: '2px solid #15BE6A',
        padding: '8px 16px',
        borderRadius: '25px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }
}