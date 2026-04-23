import { useEffect, useState } from "react";
import SuperNavbar from "../components/SuperNavbar";
import api from "../services/api";
import { logout } from "../services/authService";
import "../style/Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ⚡ mark as read
  const markAsRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date() } : n
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // ⚡ real-time fake (polling)
    const interval = setInterval(fetchNotifications, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="sup-page">
      <SuperNavbar onLogout={handleLogout} />

      <main className="sup-main">
        <div className="sup-page-intro">
          <h1>Notifications</h1>
          <p>All system alerts and activities</p>
        </div>

        {loading ? (
          <div className="sup-state-box">Loading...</div>
        ) : notifications.length > 0 ? (
          <div className="notif-list">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}  
                className={`notif-card ${!n.read_at ? "unread" : ""}`}
              >
                <div className="notif-content">
                  <p>{n.data.message}</p>
                  <span>
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="sup-empty">No notifications</p>
        )}
      </main>
    </div>
  );
}

export default Notifications;