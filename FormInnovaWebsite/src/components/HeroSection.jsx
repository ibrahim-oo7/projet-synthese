import { FaArrowRight, FaPlay } from "react-icons/fa";
import background from "../assets/images/background.jpg"

export default function HeroSection(){
    return(
        <section style={styles.hero}>
            <div style={styles.overlay}></div>
            <div style={styles.content}>
                <h1 style={styles.title}>Welcome to <span style={styles.highlight}>FormInnova</span></h1>
                <p style={styles.subtitle}>
                    A platform where you can discover courses from multiple education
                    centers and learn from the best instructors worldwide
                </p>
                <div style={styles.buttons}>
                    <button style={styles.btnPrimary}>
                        Explore Courses <FaArrowRight style={styles.btnIcon} />
                    </button>
                    <button style={styles.btnSecondary}>
                        <FaPlay style={styles.playIcon} /> Watch Demo
                    </button>
                </div>
                <div style={styles.stats}>
                    <div style={styles.stat}>
                        <h3 style={styles.statNumber}>500+</h3>
                        <p style={styles.statLabel}>Courses</p>
                    </div>
                    <div style={styles.stat}>
                        <h3 style={styles.statNumber}>50+</h3>
                        <p style={styles.statLabel}>Centers</p>
                    </div>
                    <div style={styles.stat}>
                        <h3 style={styles.statNumber}>10k+</h3>
                        <p style={styles.statLabel}>Students</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const styles = {
    hero: {
        position: 'relative',
        height: '90vh',
        minHeight: '600px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
    },
    content: {
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
        padding: '0 20px'
    },
    title: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        color: 'white',
        marginBottom: '1.5rem',
        fontWeight: '700',
        lineHeight: '1.2'
    },
    highlight: {
        color: '#15BE6A',
        textShadow: '0 0 20px rgba(21, 190, 106, 0.5)'
    },
    subtitle: {
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        color: '#e0e0e0',
        marginBottom: '2.5rem',
        lineHeight: '1.8',
        maxWidth: '700px',
        margin: '0 auto 2.5rem'
    },
    buttons: {
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        marginBottom: '4rem',
        flexWrap: 'wrap'
    },
    btnPrimary: {
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
    btnSecondary: {
        backgroundColor: 'transparent',
        color: 'white',
        border: '2px solid white',
        padding: '1rem 2.5rem',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease'
    },
    btnIcon: {
        fontSize: '1rem'
    },
    playIcon: {
        fontSize: '0.9rem'
    },
    stats: {
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        flexWrap: 'wrap'
    },
    stat: {
        textAlign: 'center'
    },
    statNumber: {
        fontSize: '2.5rem',
        color: '#15BE6A',
        fontWeight: '700',
        marginBottom: '0.5rem'
    },
    statLabel: {
        color: 'white',
        fontSize: '1.1rem',
        opacity: '0.9'
    }
}