import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getNotifications,
  markNotificationAsRead
} from "../services/notificationsService";
import "../style/Navbar.css";

function SuperNavbar({ onRefresh, refreshing, onLogout }) {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Requests", to: "/requests" },
    { label: "Centers", to: "/centers" },
    { label: "Payments", to: "/payments" },
    { label: "Activity Logs", to: "/activity-logs" },
    { label: "Settings", to: "/settings" },
  ];

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // 📥 fetch notifications
  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  // 🔔 click notification
  const handleNotifClick = async (n) => {
    if (!n.read_at) {
      await markNotificationAsRead(n.id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === n.id ? { ...item, read_at: new Date() } : item
        )
      );
    }

    navigate("/notifications");
    setOpen(false);
  };

  return (
    <header className="sup-navbar">

      {/* BRAND */}
      <div className="sup-navbar-brand">
        <div className="sup-brand-mark">F</div>
        <div className="sup-brand-text">
          <h2>FormInnova</h2>
          <p>Welcome back, Admin</p>
        </div>
      </div>

      {/* NAV */}
      <nav className="sup-navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sup-nav-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ACTIONS */}
      <div className="sup-navbar-actions">

        {/* 🔔 NOTIFICATIONS */}
        <div className="sup-notif">
          <button onClick={() => setOpen(!open)}>
            🔔
            {unreadCount > 0 && (
              <span className="sup-notif-badge">
                {unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="sup-notif-dropdown">

              {notifications.length > 0 ? (
                <>
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className={`sup-notif-item ${
                        !n.read_at ? "unread" : ""
                      }`}
                      onClick={() => handleNotifClick(n)}
                    >
                      {n.data.message}
                    </div>
                  ))}

                  <div
                    className="sup-notif-viewall"
                    onClick={() => {
                      navigate("/notifications");
                      setOpen(false);
                    }}
                  >
                    View all notifications
                  </div>
                </>
              ) : (
                <p className="sup-empty">No notifications</p>
              )}

            </div>
          )}
        </div>

        {/* REFRESH */}
        <button
          className="sup-btn sup-btn-light"
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>

        {/* LOGOUT */}
        <button className="sup-btn sup-btn-danger" onClick={onLogout}>
          Logout
        </button>

      </div>
    </header>
  );
}

export default SuperNavbar;