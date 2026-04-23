import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";
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

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <header className="sup-navbar">
      <div className="sup-navbar-brand">
        <div className="sup-brand-mark">F</div>
        <div className="sup-brand-text">
          <h2>FormInnova</h2>
          <p>Welcome back, Admin</p>
        </div>
      </div>

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

      <div className="sup-navbar-actions">
        <div className="sup-notif">
          <button onClick={() => setOpen(!open)}>
            🔔
            {unreadCount > 0 && (
              <span className="sup-notif-badge">{unreadCount}</span>
            )}
          </button>

          {open && (
            <div className="sup-notif-dropdown">
              {notifications.length > 0 ? (
                <>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="sup-notif-item"
                      onClick={() => {
                        navigate("/notifications");
                        setOpen(false);
                      }}
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

        <button
          className="sup-btn sup-btn-light"
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>

        <button className="sup-btn sup-btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default SuperNavbar;