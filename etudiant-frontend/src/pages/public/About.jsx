import { FaUsers, FaGraduationCap, FaCertificate, FaGlobe, FaHandshake, FaHeart, FaArrowRight, FaChalkboardTeacher, FaLaptop, FaMedal } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        About <span style={styles.heroHighlight}>FormInnova</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        An integrated digital platform that enables education centers to publish their courses online
                        <br />and provides learners with a distinguished educational experience with certified certificates
                    </p>
                </div>
            </section>

            {/* Our Mission Section */}
            <section style={styles.missionSection}>
                <div style={styles.containerInner}>
                    <div style={styles.missionGrid}>
                        <div style={styles.missionCard}>
                            <div style={styles.missionIcon}>🎯</div>
                            <h3 style={styles.missionTitle}>Our Mission</h3>
                            <p style={styles.missionText}>
                                To empower education centers to publish their courses online easily and professionally,
                                and provide distinguished learning opportunities for learners worldwide, while ensuring
                                quality and obtaining certified certificates.
                            </p>
                        </div>
                        <div style={styles.missionCard}>
                            <div style={styles.missionIcon}>👁️</div>
                            <h3 style={styles.missionTitle}>Our Vision</h3>
                            <p style={styles.missionText}>
                                To be the leading platform in the Arab world for distance education, where any education
                                center can easily publish their courses, and any student can learn from the best instructors
                                and obtain recognized certificates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={styles.howItWorksSection}>
                <div style={styles.containerInner}>
                    <h2 style={styles.sectionTitle}>How <span style={styles.highlight}>FormInnova</span> Works</h2>
                    <div style={styles.howItWorksGrid}>
                        <div style={styles.howItWorksCard}>
                            <div style={styles.stepNumber}>1</div>
                            <FaLaptop style={styles.howItWorksIcon} />
                            <h3 style={styles.howItWorksTitle}>Education Centers</h3>
                            <p style={styles.howItWorksText}>
                                Education centers publish their lessons and courses on the platform with complete content management
                            </p>
                        </div>
                        <div style={styles.howItWorksCard}>
                            <div style={styles.stepNumber}>2</div>
                            <FaChalkboardTeacher style={styles.howItWorksIcon} />
                            <h3 style={styles.howItWorksTitle}>Excellent Instructors</h3>
                            <p style={styles.howItWorksText}>
                                A select group of instructors and experts in various fields provide high-quality educational content
                            </p>
                        </div>
                        <div style={styles.howItWorksCard}>
                            <div style={styles.stepNumber}>3</div>
                            <FaMedal style={styles.howItWorksIcon} />
                            <h3 style={styles.howItWorksTitle}>Distinguished Certificates</h3>
                            <p style={styles.howItWorksText}>
                                Learners receive certified certificates upon successfully completing the courses
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section style={styles.storySection}>
                <div style={styles.containerInner}>
                    <div style={styles.storyGrid}>
                        <div style={styles.storyContent}>
                            <h2 style={styles.sectionTitle}>Our <span style={styles.highlight}>Story</span></h2>
                            <p style={styles.storyText}>
                                FormInnova platform was launched in 2024 with the aim of bridging the gap between education centers 
                                wanting to go digital and learners seeking quality online education.
                            </p>
                            <p style={styles.storyText}>
                                Today, we are proud to collaborate with more than 50 prestigious education centers, offer over 500 courses 
                                in various fields, with more than 15,000 learners benefiting from our services. 
                                We believe that quality education should be accessible to everyone, and that certified certificates open 
                                new horizons for learners in their professional paths.
                            </p>
                            <div style={styles.stats}>
                                <div style={styles.statItem}>
                                    <h3 style={styles.statNumber}>50+</h3>
                                    <p style={styles.statLabel}>Education Centers</p>
                                </div>
                                <div style={styles.statItem}>
                                    <h3 style={styles.statNumber}>500+</h3>
                                    <p style={styles.statLabel}>Courses</p>
                                </div>
                                <div style={styles.statItem}>
                                    <h3 style={styles.statNumber}>15k+</h3>
                                    <p style={styles.statLabel}>Learners</p>
                                </div>
                            </div>
                        </div>
                        <div style={styles.storyImage}>
                            <img 
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                                alt="Our Story" 
                                style={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section style={styles.valuesSection}>
                <div style={styles.containerInner}>
                    <h2 style={styles.sectionTitle}>Our <span style={styles.highlight}>Core Values</span></h2>
                    <div style={styles.valuesGrid}>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <FaGraduationCap />
                            </div>
                            <h3 style={styles.valueTitle}>Quality</h3>
                            <p style={styles.valueText}>
                                We guarantee the highest quality standards in all courses offered by our accredited centers
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <FaUsers />
                            </div>
                            <h3 style={styles.valueTitle}>Community</h3>
                            <p style={styles.valueText}>
                                We build an interactive educational community connecting learners with instructors and centers
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <FaCertificate />
                            </div>
                            <h3 style={styles.valueTitle}>Accreditation</h3>
                            <p style={styles.valueText}>
                                We provide certified certificates from education centers that validate learners' competencies
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <FaGlobe />
                            </div>
                            <h3 style={styles.valueTitle}>Accessibility</h3>
                            <p style={styles.valueText}>
                                We make education available to everyone from anywhere, at any time, with ease and simplicity
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <FaHandshake />
                            </div>
                            <h3 style={styles.valueTitle}>Partnership</h3>
                            <p style={styles.valueText}>
                                We believe in strong partnerships with education centers to achieve our shared goals
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIcon}>
                                <FaHeart />
                            </div>
                            <h3 style={styles.valueTitle}>Passion</h3>
                            <p style={styles.valueText}>
                                We work with passion and love to provide the best learning experience for our users
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section style={styles.teamSection}>
                <div style={styles.containerInner}>
                    <h2 style={styles.sectionTitle}>Our <span style={styles.highlight}>Team</span></h2>
                    <p style={styles.teamSubtitle}>
                        The dedicated team behind FormInnova, working tirelessly to provide the best learning experience
                    </p>
                    <div style={styles.teamGrid}>
                        <div style={styles.teamCard}>
                            <img 
                                src="https://randomuser.me/api/portraits/women/44.jpg" 
                                alt="Aya Rbib" 
                                style={styles.teamImage}
                            />
                            <h3 style={styles.teamName}>Aya Rbib</h3>
                            <p style={styles.teamRole}>Co-Founder & CEO</p>
                            <p style={styles.teamBio}>
                                Passionate about educational technology with 8+ years of experience in e-learning platforms
                            </p>
                        </div>
                        <div style={styles.teamCard}>
                            <img 
                                src="https://randomuser.me/api/portraits/men/32.jpg" 
                                alt="Brahim El Hichou" 
                                style={styles.teamImage}
                            />
                            <h3 style={styles.teamName}>Brahim El Hichou</h3>
                            <p style={styles.teamRole}>Co-Founder & CTO</p>
                            <p style={styles.teamBio}>
                                Full-stack developer and tech architect specializing in scalable learning management systems
                            </p>
                        </div>
                        <div style={styles.teamCard}>
                            <img 
                                src="https://randomuser.me/api/portraits/women/63.jpg" 
                                alt="Hanae Sanhayi" 
                                style={styles.teamImage}
                            />
                            <h3 style={styles.teamName}>Hanae Sanhayi</h3>
                            <p style={styles.teamRole}>Head of Education</p>
                            <p style={styles.teamBio}>
                                Curriculum design expert ensuring all courses meet the highest educational standards
                            </p>
                        </div>
                        <div style={styles.teamCard}>
                            <img 
                                src="https://randomuser.me/api/portraits/men/46.jpg" 
                                alt="Souhaib El Mizzari" 
                                style={styles.teamImage}
                            />
                            <h3 style={styles.teamName}>Souhaib El Mizzari</h3>
                            <p style={styles.teamRole}>Partnerships Director</p>
                            <p style={styles.teamBio}>
                                Building strong relationships with education centers and instructors worldwide
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section style={styles.partnersSection}>
                <div style={styles.containerInner}>
                    <h2 style={styles.sectionTitle}>Our <span style={styles.highlight}>Partner Centers</span></h2>
                    <p style={styles.partnersSubtitle}>
                        Trusted by leading education centers who publish their courses on our platform
                    </p>
                    <div style={styles.partnersGrid}>
                        <div style={styles.partnerCard}>Code Academy</div>
                        <div style={styles.partnerCard}>Design School</div>
                        <div style={styles.partnerCard}>Data Institute</div>
                        <div style={styles.partnerCard}>Business School</div>
                        <div style={styles.partnerCard}>Marketing Pro</div>
                        <div style={styles.partnerCard}>AI Institute</div>
                        <div style={styles.partnerCard}>Language Center</div>
                        <div style={styles.partnerCard}>Engineering Hub</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaContainer}>
                    <h2 style={styles.ctaTitle}>Ready to start your learning journey?</h2>
                    <p style={styles.ctaText}>
                        Join thousands of students and transform your career with FormInnova
                    </p>
                    <div style={styles.ctaButtons}>
                        <Link to="/courses" style={styles.ctaBtnPrimary}>
                            Browse Courses <FaArrowRight style={styles.ctaIcon} />
                        </Link>
                        <Link to="/contact" style={styles.ctaBtnSecondary}>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

const styles = {
    container: {
        width: '100%',
        overflow: 'hidden'
    },
    containerInner: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
    },
    
    // Hero Section
    hero: {
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
    },
    heroContent: {
        position: 'relative',
        zIndex: 2,
        color: 'white',
        maxWidth: '900px',
        padding: '0 20px'
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: '700',
        marginBottom: '1.5rem',
        lineHeight: '1.2'
    },
    heroHighlight: {
        color: '#15BE6A'
    },
    heroSubtitle: {
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        opacity: '0.95',
        lineHeight: '1.8'
    },

    // Mission Section
    missionSection: {
        padding: '5rem 0',
        backgroundColor: '#ffffff'
    },
    missionGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem'
    },
    missionCard: {
        backgroundColor: '#f9f9f9',
        padding: '3rem 2rem',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease'
    },
    missionIcon: {
        fontSize: '3.5rem',
        marginBottom: '1.5rem'
    },
    missionTitle: {
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '1rem',
        fontWeight: '600'
    },
    missionText: {
        fontSize: '1.1rem',
        color: '#666',
        lineHeight: '1.8'
    },

    // How It Works Section
    howItWorksSection: {
        padding: '5rem 0',
        backgroundColor: '#f9f9f9'
    },
    sectionTitle: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '3rem',
        fontWeight: '700',
        textAlign: 'center'
    },
    highlight: {
        color: '#15BE6A'
    },
    howItWorksGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem'
    },
    howItWorksCard: {
        backgroundColor: 'white',
        padding: '3rem 2rem',
        borderRadius: '20px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease'
    },
    stepNumber: {
        position: 'absolute',
        top: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#15BE6A',
        color: 'white',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        fontWeight: '700',
        boxShadow: '0 5px 15px rgba(21, 190, 106, 0.3)'
    },
    howItWorksIcon: {
        fontSize: '3rem',
        color: '#15BE6A',
        marginBottom: '1.5rem',
        marginTop: '0.5rem'
    },
    howItWorksTitle: {
        fontSize: '1.3rem',
        color: '#333',
        marginBottom: '1rem',
        fontWeight: '600'
    },
    howItWorksText: {
        fontSize: '1rem',
        color: '#666',
        lineHeight: '1.7'
    },

    // Story Section
    storySection: {
        padding: '5rem 0',
        backgroundColor: '#ffffff'
    },
    storyGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
    },
    storyContent: {
        paddingRight: '2rem'
    },
    storyText: {
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: '#666',
        marginBottom: '1.5rem'
    },
    stats: {
        display: 'flex',
        gap: '3rem',
        marginTop: '2rem'
    },
    statItem: {
        textAlign: 'left'
    },
    statNumber: {
        fontSize: '2.2rem',
        color: '#15BE6A',
        fontWeight: '700',
        marginBottom: '0.3rem'
    },
    statLabel: {
        fontSize: '1rem',
        color: '#888'
    },
    storyImage: {
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
    },

    // Values Section
    valuesSection: {
        padding: '5rem 0',
        backgroundColor: '#f9f9f9'
    },
    valuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        marginTop: '2rem'
    },
    valueCard: {
        padding: '2.5rem 2rem',
        backgroundColor: 'white',
        borderRadius: '20px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    },
    valueIcon: {
        fontSize: '2.5rem',
        color: '#15BE6A',
        marginBottom: '1.5rem'
    },
    valueTitle: {
        fontSize: '1.3rem',
        color: '#333',
        marginBottom: '1rem',
        fontWeight: '600'
    },
    valueText: {
        fontSize: '1rem',
        color: '#666',
        lineHeight: '1.6'
    },

    // Team Section
    teamSection: {
        padding: '5rem 0',
        backgroundColor: '#ffffff'
    },
    teamSubtitle: {
        fontSize: '1.2rem',
        color: '#666',
        textAlign: 'center',
        marginBottom: '3rem',
        maxWidth: '700px',
        margin: '0 auto 3rem'
    },
    teamGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem'
    },
    teamCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: '20px',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease'
    },
    teamImage: {
        width: '100%',
        height: '280px',
        objectFit: 'cover'
    },
    teamName: {
        fontSize: '1.3rem',
        color: '#333',
        margin: '1.5rem 0 0.3rem',
        fontWeight: '600'
    },
    teamRole: {
        fontSize: '0.95rem',
        color: '#15BE6A',
        marginBottom: '1rem',
        fontWeight: '500'
    },
    teamBio: {
        fontSize: '0.9rem',
        color: '#666',
        padding: '0 1.5rem 2rem',
        lineHeight: '1.6'
    },

    // Partners Section
    partnersSection: {
        padding: '5rem 0',
        backgroundColor: '#f9f9f9'
    },
    partnersSubtitle: {
        fontSize: '1.2rem',
        color: '#666',
        textAlign: 'center',
        marginBottom: '3rem'
    },
    partnersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem'
    },
    partnerCard: {
        padding: '2rem 1.5rem',
        backgroundColor: 'white',
        borderRadius: '15px',
        textAlign: 'center',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#333',
        border: '1px solid #f0f0f0',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
    },

    // CTA Section
    ctaSection: {
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #15BE6A 0%, #0e8c4c 100%)',
        textAlign: 'center'
    },
    ctaContainer: {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '0 20px'
    },
    ctaTitle: {
        fontSize: '2.5rem',
        color: 'white',
        marginBottom: '1rem',
        fontWeight: '700'
    },
    ctaText: {
        fontSize: '1.2rem',
        color: 'rgba(255,255,255,0.9)',
        marginBottom: '2.5rem'
    },
    ctaButtons: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    ctaBtnPrimary: {
        backgroundColor: 'white',
        color: '#15BE6A',
        textDecoration: 'none',
        padding: '1rem 2.5rem',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
    },
    ctaBtnSecondary: {
        backgroundColor: 'transparent',
        color: 'white',
        textDecoration: 'none',
        padding: '1rem 2.5rem',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: '600',
        border: '2px solid white',
        transition: 'all 0.3s ease'
    },
    ctaIcon: {
        fontSize: '1rem'
    },

    // Responsive Design
    '@media (max-width: 1024px)': {
        storyGrid: {
            gridTemplateColumns: '1fr',
            gap: '2rem'
        },
        storyContent: {
            paddingRight: 0
        },
        valuesGrid: {
            gridTemplateColumns: 'repeat(2, 1fr)'
        },
        teamGrid: {
            gridTemplateColumns: 'repeat(2, 1fr)'
        },
        partnersGrid: {
            gridTemplateColumns: 'repeat(3, 1fr)'
        }
    },
    '@media (max-width: 768px)': {
        missionGrid: {
            gridTemplateColumns: '1fr'
        },
        howItWorksGrid: {
            gridTemplateColumns: '1fr'
        },
        valuesGrid: {
            gridTemplateColumns: '1fr'
        },
        teamGrid: {
            gridTemplateColumns: '1fr'
        },
        partnersGrid: {
            gridTemplateColumns: '1fr'
        },
        stats: {
            flexDirection: 'column',
            gap: '1.5rem'
        }
    }
};