import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaKey } from "react-icons/fa";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/verify-code", {
        email,
        code,
      });

      navigate("/resetPassword", {
        state: { email, code },
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid code");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Verify Code</h2>
        <p style={styles.subtitle}>
          Enter the verification code sent to your email
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Verification Code</label>

            <div style={styles.inputWrapper}>
              <FaKey style={styles.inputIcon} />

              <input
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" style={styles.loginButton}>
            Verify Code
          </button>
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
    color: "#15BE6A",
    padding: "5px"
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#f9fafb",
    borderRadius: "12px",
    padding: "12px 16px",
    border: "1px solid #e5e7eb"
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#111827",
    fontSize: "14px"
  },

  inputIcon: {
    marginRight: "12px",
    color: "#15BE6A"
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
  }
};