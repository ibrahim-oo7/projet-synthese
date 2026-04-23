import { useCallback, useEffect, useState } from "react";
import SuperNavbar from "../components/SuperNavbar";
import api from "../services/api";
import { logout } from "../services/authService";
import { useSettings } from "../pages/SettingsContext"; // ⭐ NEW
import "../style/Settings.css";

function Settings() {
  const { setSettings } = useSettings(); // ⭐ NEW (LIVE NAV UPDATE)

  const [formData, setFormData] = useState({
    site_name: "",
    admin_email: "",
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 📥 FETCH SETTINGS
  const fetchSettings = useCallback(async (manualRefresh = false) => {
    try {
      setError("");
      setSuccessMessage("");

      if (manualRefresh) setRefreshing(true);

      const response = await api.get("/settings");

      setFormData({
        site_name: response.data?.site_name || "",
        admin_email: response.data?.admin_email || "",
      });

    } catch (err) {
      console.error("Settings fetch error:", err);
      setError("Failed to load settings.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleRefresh = () => {
    fetchSettings(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💾 SAVE SETTINGS (DB + LIVE NAV UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const res = await api.put("/settings", formData);

      // ⚡ UPDATE GLOBAL CONTEXT (NAVBAR LIVE CHANGE)
      setSettings(res.data?.data || formData);

      setSuccessMessage("Settings updated successfully.");

    } catch (err) {
      console.error("Settings update error:", err);
      setError(err?.response?.data?.message || "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="sup-page">

      <SuperNavbar
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onLogout={handleLogout}
      />

      <main className="sup-main">

        <section className="sup-topbar-row">
          <div className="sup-page-intro">
            <h1>Settings</h1>
            <p>Manage the main platform settings and administrator contact details.</p>
          </div>
        </section>

        <section className="sup-settings-layout">

          {/* 🟦 FORM PANEL */}
          <div className="sup-panel sup-animate-up">

            <div className="sup-panel-head">
              <div>
                <h3>General Settings</h3>
                <p>Update the main website information.</p>
              </div>
            </div>

            {error && (
              <div className="sup-alert sup-alert-error">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="sup-alert sup-alert-success">
                {successMessage}
              </div>
            )}

            <form className="sup-form" onSubmit={handleSubmit}>

              <div className="sup-form-group">
                <label className="sup-label">Site Name</label>
                <input
                  type="text"
                  name="site_name"
                  className="sup-input"
                  value={formData.site_name}
                  onChange={handleChange}
                  placeholder="Enter site name"
                  required
                />
              </div>

              <div className="sup-form-group">
                <label className="sup-label">Admin Email</label>
                <input
                  type="email"
                  name="admin_email"
                  className="sup-input"
                  value={formData.admin_email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div className="sup-form-actions">

                <button
                  type="button"
                  className="sup-btn sup-btn-light"
                  onClick={() => fetchSettings(true)}
                  disabled={refreshing}
                >
                  {refreshing ? "Refreshing..." : "Reload"}
                </button>

                <button
                  type="submit"
                  className="sup-btn sup-btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

          {/* 🟩 PREVIEW PANEL */}
          <div className="sup-panel sup-animate-up delay-1">

            <div className="sup-panel-head">
              <div>
                <h3>Settings Preview</h3>
                <p>Quick overview of the current platform information.</p>
              </div>
            </div>

            <div className="sup-preview-card">

              <div className="sup-preview-item">
                <span>Platform Name</span>
                <strong>{formData.site_name || "-"}</strong>
              </div>

              <div className="sup-preview-item">
                <span>Administrator Email</span>
                <strong>{formData.admin_email || "-"}</strong>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;