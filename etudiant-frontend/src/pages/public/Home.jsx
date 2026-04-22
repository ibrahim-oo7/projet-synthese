import CourseCard from "../../components/CourseCard";
import HeroSection from "../../components/HeroSection";
import { useEffect, useState } from "react";
import { fetchAllCourses, normalizeCourse } from "../../services/courseApi";
import { FaGraduationCap, FaChartLine, FaCertificate, FaUsers, FaStar, FaArrowRight } from "react-icons/fa";

export default function Home(){
     const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourses();

        const list =
          Array.isArray(data) ? data :
          Array.isArray(data.data) ? data.data :
          Array.isArray(data.courses) ? data.courses :
          [];

        setCourses(list.map(normalizeCourse));
      } catch (error) {
        console.log("HOME COURSES ERROR:", error.response?.data || error.message);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);
    return(
        <div>
            <HeroSection/>
            
            <section style={styles.aboutSection}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>What is <span style={styles.highlight}>FormInnova</span>?</h2>
                    <div style={styles.aboutContent}>
                        <p style={styles.aboutText}>
                            FormInnova is an online learning marketplace where certified education centers 
                            publish professional courses and students can enroll in them to improve their skills. 
                            Discover structured courses, earn certificates, and learn from professional instructors.
                        </p>
                    </div>
                </div>
            </section>

            <section style={styles.featuresSection}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>Why Choose <span style={styles.highlight}>FormInnova</span>?</h2>
                    <div style={styles.featuresGrid}>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>
                                <FaGraduationCap />
                            </div>
                            <h3 style={styles.featureTitle}>Certified Centers</h3>
                            <p style={styles.featureDesc}>Learn from accredited, professional education centers worldwide.</p>
                        </div>

                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>
                                <FaChartLine />
                            </div>
                            <h3 style={styles.featureTitle}>Structured Courses</h3>
                            <p style={styles.featureDesc}>Well-organized modules and lessons for effective learning.</p>
                        </div>

                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>
                                <FaCertificate />
                            </div>
                            <h3 style={styles.featureTitle}>Earn Certificates</h3>
                            <p style={styles.featureDesc}>Get verified certificates upon course completion.</p>
                        </div>

                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>
                                <FaUsers />
                            </div>
                            <h3 style={styles.featureTitle}>Expert Instructors</h3>
                            <p style={styles.featureDesc}>Learn from industry professionals and experienced educators.</p>
                        </div>
                    </div>
                </div>
            </section>

           <section style={styles.popularSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Popular Courses</h2>
                    <button style={styles.viewAllBtn}>
                        View All <FaArrowRight style={styles.viewAllIcon} />
                    </button>
                    </div>

                    {loadingCourses ? (
                    <h3 style={{ textAlign: "center", padding: "2rem" }}>Loading courses...</h3>
                    ) : courses.length > 0 ? (
                    <div style={styles.coursesGrid}>
                        {courses.slice(0, 6).map((course) => (
                        <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                    ) : (
                    <h3 style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                        No courses found
                    </h3>
                    )}
                </div>
                </section>

            <section style={styles.reviewsSection}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>Student <span style={styles.highlight}>Reviews</span></h2>
                    <div style={styles.reviewsGrid}>
                        <div style={styles.reviewCard}>
                            <div style={styles.reviewHeader}>
                                <div style={styles.reviewerInfo}>
                                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Youssef" style={styles.reviewerImg} />
                                    <div>
                                        <h3 style={styles.reviewerName}>Youssef M.</h3>
                                        <div style={styles.reviewStars}>
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={styles.reviewText}>"Best React course I've ever taken! The projects were incredibly practical and the instructor was amazing."</p>
                        </div>

                        <div style={styles.reviewCard}>
                            <div style={styles.reviewHeader}>
                                <div style={styles.reviewerInfo}>
                                    <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Amina" style={styles.reviewerImg} />
                                    <div>
                                        <h3 style={styles.reviewerName}>Amina K.</h3>
                                        <div style={styles.reviewStars}>
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starHalf} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={styles.reviewText}>"Transformed my design skills completely. The Figma section was outstanding and very detailed."</p>
                        </div>

                        <div style={styles.reviewCard}>
                            <div style={styles.reviewHeader}>
                                <div style={styles.reviewerInfo}>
                                    <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Hassan" style={styles.reviewerImg} />
                                    <div>
                                        <h3 style={styles.reviewerName}>Hassan B.</h3>
                                        <div style={styles.reviewStars}>
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starEmpty} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={styles.reviewText}>"Very comprehensive ML course. Some sections could use more examples but overall great content."</p>
                        </div>

                        <div style={styles.reviewCard}>
                            <div style={styles.reviewHeader}>
                                <div style={styles.reviewerInfo}>
                                    <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Fatima" style={styles.reviewerImg} />
                                    <div>
                                        <h3 style={styles.reviewerName}>Fatima Z.</h3>
                                        <div style={styles.reviewStars}>
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                            <FaStar style={styles.starFilled} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={styles.reviewText}>"Perfect for beginners. I went from zero to building data pipelines! The support team is very helpful."</p>
                        </div>
                    </div>
                </div>
            </section>

            <section style={styles.ctaSection}>
                <div style={styles.ctaContainer}>
                    <h2 style={styles.ctaTitle}>Ready to Start Learning?</h2>
                    <p style={styles.ctaText}>Join thousands of students and start your learning journey today</p>
                    <button style={styles.ctaBtn}>
                        Get Started Now <FaArrowRight style={styles.ctaIcon} />
                    </button>
                </div>
            </section>
        </div>
    )
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
    },
    aboutSection: {
        padding: '5rem 0',
        backgroundColor: '#f9f9f9'
    },
    sectionTitle: {
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333'
    },
    highlight: {
        color: '#15BE6A'
    },
    aboutContent: {
        maxWidth: '800px',
        margin: '0 auto'
    },
    aboutText: {
        fontSize: '1.2rem',
        lineHeight: '1.8',
        textAlign: 'center',
        color: '#666'
    },
    featuresSection: {
        padding: '5rem 0',
        backgroundColor: 'white'
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
    },
    featureCard: {
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '15px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    featureIcon: {
        fontSize: '3rem',
        color: '#15BE6A',
        marginBottom: '1.5rem'
    },
    featureTitle: {
        fontSize: '1.3rem',
        marginBottom: '1rem',
        color: '#333'
    },
    featureDesc: {
        color: '#666',
        lineHeight: '1.6'
    },
    popularSection: {
        padding: '5rem 0',
        backgroundColor: '#f9f9f9'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
    },
    viewAllBtn: {
        backgroundColor: 'transparent',
        color: '#15BE6A',
        border: '2px solid #15BE6A',
        padding: '0.8rem 2rem',
        borderRadius: '25px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease'
    },
    viewAllIcon: {
        fontSize: '0.9rem'
    },
    coursesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
    },
    reviewsSection: {
        padding: '5rem 0',
        backgroundColor: 'white'
    },
    reviewsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
    },
    reviewCard: {
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
    },
    reviewHeader: {
        marginBottom: '1rem'
    },
    reviewerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    reviewerImg: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    reviewerName: {
        fontSize: '1.1rem',
        color: '#333',
        marginBottom: '0.3rem'
    },
    reviewStars: {
        display: 'flex',
        gap: '0.2rem'
    },
    starFilled: {
        color: '#FFD700',
        fontSize: '0.9rem'
    },
    starHalf: {
        color: '#FFD700',
        fontSize: '0.9rem'
    },
    starEmpty: {
        color: '#ddd',
        fontSize: '0.9rem'
    },
    reviewText: {
        color: '#666',
        lineHeight: '1.6',
        fontStyle: 'italic'
    },
    ctaSection: {
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #15BE6A 0%, #0e8c4c 100%)',
        textAlign: 'center'
    },
    ctaContainer: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 20px'
    },
    ctaTitle: {
        fontSize: '2.5rem',
        color: 'white',
        marginBottom: '1rem'
    },
    ctaText: {
        fontSize: '1.2rem',
        color: 'rgba(255,255,255,0.9)',
        marginBottom: '2rem'
    },
    ctaBtn: {
        backgroundColor: 'white',
        color: '#15BE6A',
        border: 'none',
        padding: '1rem 3rem',
        borderRadius: '50px',
        fontSize: '1.2rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
    },
    ctaIcon: {
        fontSize: '1rem'
    }
}