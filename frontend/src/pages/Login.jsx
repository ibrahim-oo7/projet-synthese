import { useState } from "react";
import { login } from "../services/authService";
import "../style/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const data = await login(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      setMessage("Login successful 🚀");

      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT DECOR */}
      <div className="login-left">
        <div className="login-brand">
          <h1>FormInnova</h1>
          <p>Admin Control Center</p>
        </div>

        <div className="login-glow"></div>
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">

        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Welcome Back 👋</h2>
          <p>Login to your admin dashboard</p>

          {error && <div className="login-error">{error}</div>}
          {message && <div className="login-success">{message}</div>}

          <div className="login-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="login-footer">
            © {new Date().getFullYear()} FormInnova. All rights reserved.
          </p>
        </form>

      </div>
    </div>
  );
}

export default Login;