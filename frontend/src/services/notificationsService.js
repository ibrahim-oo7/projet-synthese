import api from "./api";

/**
 * 📥 Get all notifications
 */
export const getNotifications = async () => {
  try {
    const res = await api.get("/notifications");
    return res.data || [];
  } catch (err) {
    console.error("getNotifications error:", err);
    return [];
  }
};

/**
 * 🔔 Get unread notifications count
 */
export const getUnreadCount = async () => {
  try {
    const res = await api.get("/notifications/unread-count");
    return res.data?.count || 0;
  } catch (err) {
    console.error("getUnreadCount error:", err);
    return 0;
  }
};

/**
 * ✅ Mark one notification as read
 */
export const markNotificationAsRead = async (id) => {
  try {
    const res = await api.post(`/notifications/${id}/read`);
    return res.data;
  } catch (err) {
    console.error("markNotificationAsRead error:", err);
    return null;
  }
};

/**
 * ✅ Mark all notifications as read (optional feature)
 */
export const markAllAsRead = async () => {
  try {
    const res = await api.post("/notifications/mark-all-read");
    return res.data;
  } catch (err) {
    console.error("markAllAsRead error:", err);
    return null;
  }
};

