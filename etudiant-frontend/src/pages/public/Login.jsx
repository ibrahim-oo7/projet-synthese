import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSucces } from "../../features/auth/authSlice";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaApple
} from "react-icons/fa";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/api/login",
        payload
      );

      localStorage.setItem("token", res.data.token);
      dispatch(loginSucces(res.data.user));
      navigate("/student/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);

      setErrors({
        email: "Invalid email or password",
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Welcome Back!</h2>
        <p style={styles.subtitle}>
          Log in to access your courses and continue learning
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>

          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>Keep me logged in</span>
            </label>

            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" style={styles.loginButton}>
            Log In
          </button>

          <div style={styles.socialContainer}>
            <p style={styles.orText}>Or continue with</p>
            <div style={styles.socialButtons}>
              <button type="button" style={{ ...styles.socialButton, ...styles.google }}>
                <FaGoogle />
              </button>

              <button type="button" style={{ ...styles.socialButton, ...styles.facebook }}>
                <FaFacebook />
              </button>

              <button type="button" style={{ ...styles.socialButton, ...styles.linkedin }}>
                <FaLinkedin />
              </button>

              <button type="button" style={{ ...styles.socialButton, ...styles.apple }}>
                <FaApple />
              </button>
            </div>
          </div>

          <p style={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Segoe UI, sans-serif"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    zIndex: 1
  },

  formWrapper: {
    position: "relative",
    zIndex: 10,
    width: "380px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 0 30px rgba(21,190,106,0.6)",
    color: "#fff"
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "14px",
    color: "#ccc",
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },

  label: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "0px",
    color: "#15BE6A",
    padding: "5px"
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#f9fafb",
    borderRadius: "12px",
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease"
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#111827",
    fontSize: "14px",
    fontWeight: "400"
  },

  inputIcon: {
    marginRight: "12px",
    color: "#15BE6A",
    fontSize: "16px"
  },

  eyeButton: {
    background: "none",
    border: "none",
    color: "#15BE6A",
    cursor: "pointer"
  },

  errorText: {
    color: "#ff6b6b",
    fontSize: "12px"
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#ccc"
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },

  checkbox: {},

  forgotLink: {
    color: "#15BE6A",
    textDecoration: "none"
  },

  loginButton: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#15BE6A,#0f9f5c)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(21,190,106,0.7)"
  },

  socialContainer: {
    textAlign: "center",
    marginTop: "15px"
  },

  orText: {
    fontSize: "13px",
    color: "#aaa",
    marginBottom: "10px"
  },

  socialButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },

  socialButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },

  google: { color: "#DB4437" },
  facebook: { color: "#1877F2" },
  linkedin: { color: "#0A66C2" },
  apple: { color: "#fff" },

  signupText: {
    marginTop: "15px",
    fontSize: "13px",
    textAlign: "center",
    color: "#ccc"
  },

  signupLink: {
    color: "#15BE6A",
    fontWeight: "bold",
    textDecoration: "none"
  }
};