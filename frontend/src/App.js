import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Centers from "./pages/Centers";
import Requests from "./pages/Requests";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import ActivityLogs from "./pages/ActivityLogs";
import CenterDetails from "./pages/CenterDetails";
import Notifications from "./pages/Notifications";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/centers" element={<Centers />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/activity-logs" element={<ActivityLogs />} />
      <Route path="/centers/:id" element={<CenterDetails />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;