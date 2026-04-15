import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer(){
    return(
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.grid}>
                    <div style={styles.brand}>
                        <h3 style={styles.brandName}>FormInnova</h3>
                        <p style={styles.brandDesc}>Learn from the best education centers worldwide</p>
                        <div style={styles.social}>
                            <FaFacebook style={styles.socialIcon} />
                            <FaTwitter style={styles.socialIcon} />
                            <FaLinkedin style={styles.socialIcon} />
                            <FaInstagram style={styles.socialIcon} />
                            <FaYoutube style={styles.socialIcon} />
                        </div>
                    </div>

                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Platform</h3>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>Home</li>
                            <li style={styles.listItem}>Browse Courses</li>
                            <li style={styles.listItem}>Education Centers</li>
                            <li style={styles.listItem}>Pricing</li>
                            <li style={styles.listItem}>Blog</li>
                        </ul>
                    </div>

                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Students</h3>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>Login</li>
                            <li style={styles.listItem}>Register</li>
                            <li style={styles.listItem}>Dashboard</li>
                            <li style={styles.listItem}>My Learning</li>
                            <li style={styles.listItem}>Wishlist</li>
                        </ul>
                    </div>

                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Support</h3>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>Help Center</li>
                            <li style={styles.listItem}>FAQ</li>
                            <li style={styles.listItem}>Contact Us</li>
                            <li style={styles.listItem}>Terms of Service</li>
                            <li style={styles.listItem}>Privacy Policy</li>
                        </ul>
                    </div>

                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Contact</h3>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>📧 help@FormInnova.com</li>
                            <li style={styles.listItem}>📞 +1 234 567 890</li>
                            <li style={styles.listItem}>📍 New York, USA</li>
                        </ul>
                    </div>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.bottom}>
                    <p style={styles.copyright}>© 2026 FormInnova - All rights reserved</p>
                    <div style={styles.bottomLinks}>
                        <span style={styles.bottomLink}>Privacy</span>
                        <span style={styles.bottomLink}>Terms</span>
                        <span style={styles.bottomLink}>Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const styles = {
    footer: {
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: '4rem 5% 2rem',
        marginTop: '4rem'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
    },
    brand: {
        gridColumn: 'span 2'
    },
    brandName: {
        fontSize: '2rem',
        color: '#15BE6A',
        marginBottom: '1rem'
    },
    brandDesc: {
        color: '#b0b0b0',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
    },
    social: {
        display: 'flex',
        gap: '1rem'
    },
    socialIcon: {
        fontSize: '1.5rem',
        color: '#b0b0b0',
        cursor: 'pointer',
        transition: 'color 0.3s ease'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    columnTitle: {
        fontSize: '1.2rem',
        marginBottom: '1.5rem',
        color: '#15BE6A',
        position: 'relative',
        paddingBottom: '0.5rem'
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    listItem: {
        marginBottom: '0.8rem',
        color: '#b0b0b0',
        cursor: 'pointer',
        transition: 'color 0.3s ease'
    },
    divider: {
        height: '1px',
        backgroundColor: '#333',
        margin: '2rem 0'
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
    },
    copyright: {
        color: '#888',
        fontSize: '0.9rem'
    },
    bottomLinks: {
        display: 'flex',
        gap: '2rem'
    },
    bottomLink: {
        color: '#888',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'color 0.3s ease'
    }
}