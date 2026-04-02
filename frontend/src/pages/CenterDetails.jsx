import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SuperNavbar from "../components/SuperNavbar";
import api from "../services/api";
import { logout } from "../services/authService";
import "../style/CenterDetails.css";

export default function CenterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [center, setCenter] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDetails = async (manualRefresh = false) => {
    try {
      setError("");
      if (manualRefresh) setRefreshing(true);

      const [centerRes, paymentsRes] = await Promise.all([
        api.get(`/centers/${id}`),
        api.get(`/centers/${id}/payments`),
      ]);

      setCenter(centerRes.data.data || centerRes.data);
      setPayments(paymentsRes.data.data || paymentsRes.data || []);
    } catch (err) {
      console.error("Center details error:", err);
      setError("Failed to load center details.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleRefresh = () => {
    fetchDetails(true);
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

  const handleDisable = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/centers/${id}/disable`);
      await fetchDetails();
    } catch (err) {
      console.error("Disable center error:", err);
      alert(err?.response?.data?.message || "Failed to disable center.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivate = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/centers/${id}/activate`);
      await fetchDetails();
    } catch (err) {
      console.error("Activate center error:", err);
      alert(err?.response?.data?.message || "Failed to activate center.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this center?"
    );
    if (!confirmed) return;

    try {
      setActionLoading(true);
      await api.delete(`/centers/${id}`);
      navigate("/centers");
    } catch (err) {
      console.error("Delete center error:", err);
      alert(err?.response?.data?.message || "Failed to delete center.");
    } finally {
      setActionLoading(false);
    }
  };

  const totalPaid = useMemo(() => {
    return payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [payments]);

  const latestPayment = useMemo(() => {
    if (!payments.length) return null;
    return payments[0];
  }, [payments]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  const getMonthName = (month) => {
    const months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return months[month] || "-";
  };

  if (loading) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box">Loading center details...</div>
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box sup-error-box">
          <h2>Center Details Error</h2>
          <p>{error || "Center not found."}</p>
          <button
            className="sup-btn sup-btn-light"
            onClick={() => navigate("/centers")}
          >
            Back to Centers
          </button>
        </div>
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

      <main className="sup-main center-profile-page">
        <section className="center-profile-header sup-animate-up">
          <div className="center-profile-topbar">
            <div className="center-profile-topbar-left">
              <button
                className="sup-btn sup-btn-light center-top-back-btn"
                onClick={() => navigate("/centers")}
              >
                ← Centers
              </button>
            </div>

            <div className="center-profile-actions">
              {center.status === "active" ? (
                <button
                  className="sup-btn sup-btn-warning"
                  onClick={handleDisable}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Disable"}
                </button>
              ) : (
                <button
                  className="sup-btn sup-btn-light"
                  onClick={handleActivate}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Activate"}
                </button>
              )}

              <button
                className="sup-btn sup-btn-danger"
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "Delete"}
              </button>
            </div>
          </div>

          <div className="center-profile-main center-profile-main-no-avatar">
            <div className="center-profile-text center-profile-text-full">
              <div className="center-profile-title-row">
                <h1>{center.name || "Center Profile"}</h1>
                <span
                  className={`sup-status-badge ${
                    center.status === "active"
                      ? "sup-status-active"
                      : "sup-status-disabled"
                  }`}
                >
                  {center.status || "-"}
                </span>
              </div>

              <p>
                Professional overview of this center account, contact details,
                and payment history.
              </p>

              <div className="center-profile-tags">
                <span>{center.email || "No email"}</span>
                <span>{center.phone || "No phone"}</span>
                <span>{center.city || "No city"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="center-profile-stats">
          <div className="sup-card sup-animate-up">
            <span>Total Payments</span>
            <h3>{payments.length}</h3>
            <p>Recorded transactions</p>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.05s" }}>
            <span>Total Paid</span>
            <h3>{formatCurrency(totalPaid)}</h3>
            <p>Overall paid amount</p>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.1s" }}>
            <span>Created Date</span>
            <h3>
              {center.created_at
                ? new Date(center.created_at).toLocaleDateString()
                : "-"}
            </h3>
            <p>Account creation date</p>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.15s" }}>
            <span>Latest Payment</span>
            <h3>
              {latestPayment ? formatCurrency(latestPayment.amount) : "No payment"}
            </h3>
            <p>
              {latestPayment
                ? `${getMonthName(latestPayment.month)} ${latestPayment.year}`
                : "No payment history"}
            </p>
          </div>
        </section>

        <section className="center-profile-grid">
          <div className="sup-panel sup-animate-up">
            <div className="sup-panel-head">
              <div>
                <h3>Basic Information</h3>
                <p>Main center account information.</p>
              </div>
            </div>

            <div className="center-info-grid">
              <div className="center-info-box">
                <span>Center Name</span>
                <strong>{center.name || "-"}</strong>
              </div>

              <div className="center-info-box">
                <span>Email Address</span>
                <strong>{center.email || "-"}</strong>
              </div>

              <div className="center-info-box">
                <span>Phone Number</span>
                <strong>{center.phone || "-"}</strong>
              </div>

              <div className="center-info-box">
                <span>City</span>
                <strong>{center.city || "-"}</strong>
              </div>

              <div className="center-info-box center-info-box-full">
                <span>Address</span>
                <strong>{center.address || "-"}</strong>
              </div>

              <div className="center-info-box">
                <span>Status</span>
                <strong>{center.status || "-"}</strong>
              </div>

              <div className="center-info-box">
                <span>Created At</span>
                <strong>{formatDate(center.created_at)}</strong>
              </div>
            </div>
          </div>

          <div className="sup-panel sup-animate-up">
            <div className="sup-panel-head">
              <div>
                <h3>Summary</h3>
                <p>Quick overview of this center.</p>
              </div>
            </div>

            <div className="center-summary-list">
              <div className="center-summary-item">
                <span>Center ID</span>
                <strong>#{center.id}</strong>
              </div>

              <div className="center-summary-item">
                <span>Current Status</span>
                <strong>{center.status || "-"}</strong>
              </div>

              <div className="center-summary-item">
                <span>Total Payments</span>
                <strong>{payments.length}</strong>
              </div>

              <div className="center-summary-item">
                <span>Total Paid</span>
                <strong>{formatCurrency(totalPaid)}</strong>
              </div>

              <div className="center-summary-item">
                <span>Latest Payment Date</span>
                <strong>
                  {latestPayment ? formatDate(latestPayment.created_at) : "-"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section className="sup-panel sup-animate-up">
          <div className="sup-panel-head">
            <div>
              <h3>Payments History</h3>
              <p>All payments linked to this center account.</p>
            </div>
          </div>

          {payments.length > 0 ? (
            <div className="sup-table-wrap">
              <table className="sup-table center-payments-table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Method</th>
                    <th>Note</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{formatCurrency(payment.amount)}</td>
                      <td>{getMonthName(payment.month)}</td>
                      <td>{payment.year || "-"}</td>
                      <td>{payment.payment_method || "-"}</td>
                      <td>{payment.note || "-"}</td>
                      <td>{formatDate(payment.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sup-empty">No payments found for this center.</p>
          )}
        </section>
      </main>
    </div>
  );
}