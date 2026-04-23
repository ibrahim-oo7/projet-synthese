import { useEffect, useState } from "react";
import SuperNavbar from "../components/SuperNavbar";
import {
  getNotifications,
  markNotificationAsRead
} from "../services/notificationsService";
import { logout } from "../services/authService";
import "../style/Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📥 fetch
  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ mark as read
  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read_at: new Date() } : n
      )
    );
  };

  // 🚪 logout
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
                className={`notif-card ${!n.read_at ? "unread" : ""}`}
                onClick={() => handleMarkAsRead(n.id)}
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