import { Link, useNavigate } from "react-router-dom"
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa"
import logo from "../assets/images/logo.jpeg"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
export default function Navbar(){
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState("");
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const handleLogout = () => {
      dispatch(logout());
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <img src={logo} alt="logo" style={styles.logoImg} />
                <span style={styles.logoText}>
                    <span style={styles.logoGreen}>Form</span>
                    <span style={styles.logoDark}>Innova</span>
                </span>
            </div>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search for courses..."
                    style={{
                        ...styles.searchInput,
                        ...(focus ? styles.searchFocus : {})
                    }}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    />
                <FaSearch style={styles.searchIcon} />
            </div>

            <div style={styles.links}>
            <Link to="/" style={{
                ...styles.link,
                ...(active === "home" ? styles.activeLink : {})
            }}
            onMouseEnter={() => setActive("home")}
            onMouseLeave={() => setActive("")}
            >Home</Link>

            <Link to="/about" style={{
                ...styles.link,
                ...(active === "about" ? styles.activeLink : {})
            }}
            onMouseEnter={() =>{ setActive("about")
                                window.scrollTo(0, 0);
            }}
            onMouseLeave={() => setActive("")}
            >about</Link>

            <Link to="/courses" style={{
                ...styles.link,
                ...(active === "courses" ? styles.activeLink : {})
            }}
            onMouseEnter={() => {setActive("courses")
                                 window.scrollTo(0, 0);
            }}
            onMouseLeave={() => setActive("")}
            >Courses</Link>
            

            </div>

            <div style={styles.actions}>
                {isAuthenticated ? (
                <div style={styles.auth}>
                <Link
                to="/student/my-courses"
                style={{
                  ...styles.link,
                  ...(active === "mycourses" ? styles.activeLink : {})
                }}
                onMouseEnter={() => {
                  setActive("mycourses")
                  window.scrollTo(0, 0);
                }}
                onMouseLeave={() => setActive("")}
              >
                My Courses
              </Link>
                  <button onClick={handleLogout} style={styles.registerBtn}>
                Logout
              </button>
              <Link
              to="/student/dashboard"
              style={styles.link}
              onMouseEnter={() => setActive("dashboard")}
              onMouseLeave={() => setActive("")}
            >
              Dashboard
            </Link>
                  <div 
  style={styles.userIcon} 
  onClick={() => {
    navigate("/student/profile")
    window.scrollTo(0, 0);
  }}
>
  <FaUser />
</div>
                </div>
              ) : (
                <div style={styles.auth}>
                  <Link to="/login" style={styles.link}>Login</Link>
                  <Link to="/register" style={styles.registerBtn}>Register</Link>
                </div>
              )}
            </div>
        </nav>
    )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 5%',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    flexWrap: 'wrap',
    gap: '1rem'
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },

  logoImg: {
    width: '50px',
    height: '50px',
  },

  logoText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },

  logoGreen: {
    color: '#15BE6A'
  },

  logoDark: {
    color: '#111'
  },
  searchContainer: {
    position: 'relative',
    flex: '0 1 300px'
  },

  searchInput: {
    width: '100%',
    padding: '0.8rem 2.5rem 0.8rem 1rem',
    borderRadius: '25px',
    border: '1px solid #e0e0e0',
    fontSize: '0.9rem',
    outline: 'none',
    transition: '0.3s'
  },
  searchFocus: {
    transform: 'scale(1.05)',
    border: '1px solid #15BE6A',
    boxShadow: '0 0 10px rgba(21,190,106,0.5)'
  },

  searchIcon: {
    position: 'absolute',
    right: '-3rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#15BE6A',
    cursor: 'pointer'
  },

  links: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },

  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1rem',
    fontWeight: '500',
    position: 'relative',
    paddingBottom: '5px',
    transition: '0.3s'
  },

  activeLink: {
    color: '#15BE6A',
    borderBottom: '2px solid #15BE6A'
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },

  icon: {
    fontSize: '1.3rem',
    color: '#666',
    cursor: 'pointer',
    transition: '0.3s'
  },

  iconHover: {
    color: '#15BE6A',
    transform: 'scale(1.2)'
  },

  auth: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },

  registerBtn: {
    backgroundColor: '#15BE6A',
    color: 'white',
    padding: '0.5rem 1.3rem',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxShadow: '0 0 10px rgba(21,190,106,0.4)',
    transition: '0.3s'
  },

  userIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#15BE6A',
    transition: '0.3s'
  }
};