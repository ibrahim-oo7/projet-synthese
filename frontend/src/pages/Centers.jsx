import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperNavbar from "../components/SuperNavbar";
import api from "../services/api";
import { logout } from "../services/authService";
import "../style/Centers.css";

function Centers() {
  const navigate = useNavigate();

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState({});

  const [toast, setToast] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({
      open: true,
      type,
      message,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    if (!toast.open) return;

    const timer = setTimeout(() => {
      closeToast();
    }, 3200);

    return () => clearTimeout(timer);
  }, [toast.open, closeToast]);

  const fetchCenters = useCallback(async (manualRefresh = false) => {
    try {
      setError("");
      if (manualRefresh) {
        setRefreshing(true);
      }

      const response = await api.get("/centers");
      setCenters(response.data || []);
    } catch (err) {
      console.error("Centers fetch error:", err);
      setError("Failed to load centers.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCenters();
  }, [fetchCenters]);

  const handleRefresh = () => {
    fetchCenters(true);
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

  const setRowLoading = (id, value) => {
    setActionLoading((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDisable = async (id) => {
    try {
      setRowLoading(id, true);
      await api.patch(`/centers/${id}/disable`);
      await fetchCenters();
      showToast("success", "Center disabled successfully.");
    } catch (err) {
      console.error("Disable center error:", err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to disable center."
      );
    } finally {
      setRowLoading(id, false);
    }
  };

  const handleActivate = async (id) => {
    try {
      setRowLoading(id, true);
      await api.patch(`/centers/${id}/activate`);
      await fetchCenters();
      showToast("success", "Center activated successfully.");
    } catch (err) {
      console.error("Activate center error:", err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to activate center."
      );
    } finally {
      setRowLoading(id, false);
    }
  };

  const openDeleteModal = (center) => {
    setDeleteTarget(center);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setRowLoading(deleteTarget.id, true);
      await api.delete(`/centers/${deleteTarget.id}`);
      await fetchCenters();
      closeDeleteModal();
      showToast("success", "Center deleted successfully.");
    } catch (err) {
      console.error("Delete center error:", err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to delete center."
      );
    } finally {
      setRowLoading(deleteTarget?.id, false);
    }
  };

  const filteredCenters = useMemo(() => {
    return centers.filter((center) => {
      const matchesSearch =
        center.name?.toLowerCase().includes(search.toLowerCase()) ||
        center.email?.toLowerCase().includes(search.toLowerCase()) ||
        center.city?.toLowerCase().includes(search.toLowerCase()) ||
        center.phone?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : center.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [centers, search, statusFilter]);

  const stats = useMemo(() => {
    const total = centers.length;
    const active = centers.filter((c) => c.status === "active").length;
    const disabled = centers.filter((c) => c.status === "disabled").length;

    return { total, active, disabled };
  }, [centers]);

  if (loading) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box">Loading centers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />

        {toast.open && (
          <div className={`sup-toast sup-toast-${toast.type}`}>
            <div className="sup-toast-content">
              <strong>{toast.type === "success" ? "Success" : "Error"}</strong>
              <span>{toast.message}</span>
            </div>
            <button className="sup-toast-close" onClick={closeToast}>
              ×
            </button>
          </div>
        )}

        <div className="sup-state-box sup-error-box">
          <h2>Centers Error</h2>
          <p>{error}</p>
          <button className="sup-btn sup-btn-light" onClick={() => fetchCenters()}>
            Retry
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

      {toast.open && (
        <div className={`sup-toast sup-toast-${toast.type}`}>
          <div className="sup-toast-content">
            <strong>{toast.type === "success" ? "Success" : "Error"}</strong>
            <span>{toast.message}</span>
          </div>
          <button className="sup-toast-close" onClick={closeToast}>
            ×
          </button>
        </div>
      )}

      <main className="sup-main">
        <section className="sup-topbar-row">
          <div className="sup-page-intro">
            <h1>Centers</h1>
            <p>Manage all registered centers from one place.</p>
          </div>

          <div className="sup-filters">
            <input
              type="text"
              placeholder="Search by name, email, city or phone"
              className="sup-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="sup-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </section>

        <section className="sup-cards sup-centers-stats">
          <div className="sup-card sup-animate-up">
            <span>Total Centers</span>
            <h3>{stats.total}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.06s" }}>
            <span>Active Centers</span>
            <h3>{stats.active}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.12s" }}>
            <span>Disabled Centers</span>
            <h3>{stats.disabled}</h3>
          </div>
        </section>

        <section className="sup-panel sup-animate-up">
          <div className="sup-panel-head">
            <div>
              <h3>Centers List</h3>
              <p>{filteredCenters.length} result(s)</p>
            </div>
          </div>

          {filteredCenters.length > 0 ? (
            <div className="sup-table-wrap">
              <table className="sup-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th className="sup-actions-col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCenters.map((center) => (
                    <tr key={center.id}>
                      <td>{center.name}</td>
                      <td>{center.email}</td>
                      <td>{center.phone}</td>
                      <td>{center.city}</td>
                      <td>{center.address || "-"}</td>
                      <td>
                        <span
                          className={`sup-status-badge ${
                            center.status === "active"
                              ? "sup-status-active"
                              : "sup-status-disabled"
                          }`}
                        >
                          {center.status}
                        </span>
                      </td>
                      <td>
                        <div className="sup-table-actions">
                          <button
                            className="sup-btn sup-btn-light"
                            onClick={() => navigate(`/centers/${center.id}`)}
                          >
                            View Details
                          </button>

                          {center.status === "active" ? (
                            <button
                              className="sup-btn sup-btn-warning"
                              onClick={() => handleDisable(center.id)}
                              disabled={!!actionLoading[center.id]}
                            >
                              {actionLoading[center.id] ? "Processing..." : "Disable"}
                            </button>
                          ) : (
                            <button
                              className="sup-btn sup-btn-light"
                              onClick={() => handleActivate(center.id)}
                              disabled={!!actionLoading[center.id]}
                            >
                              {actionLoading[center.id] ? "Processing..." : "Activate"}
                            </button>
                          )}

                          <button
                            className="sup-btn sup-btn-danger"
                            onClick={() => openDeleteModal(center)}
                            disabled={!!actionLoading[center.id]}
                          >
                            {actionLoading[center.id] ? "Processing..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sup-empty">No centers found.</p>
          )}
        </section>
      </main>

      {deleteModalOpen && (
        <div className="sup-modal-overlay" onClick={closeDeleteModal}>
          <div
            className="sup-modal delete-center-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sup-modal-head">
              <div>
                <h3>Delete Center</h3>
                <p>
                  This action will permanently remove this center from the platform.
                </p>
              </div>

              <button className="sup-modal-close" onClick={closeDeleteModal}>
                ×
              </button>
            </div>

            <div className="delete-center-body">
              <div className="delete-center-warning">
                <span>Center Name</span>
                <strong>{deleteTarget?.name || "-"}</strong>
              </div>

              <p className="delete-center-text">
                Are you sure you want to delete this center? This action cannot be undone.
              </p>
            </div>

            <div className="sup-modal-footer">
              <button className="sup-btn sup-btn-light" onClick={closeDeleteModal}>
                Cancel
              </button>

              <button
                className="sup-btn sup-btn-danger"
                onClick={handleConfirmDelete}
                disabled={!!actionLoading[deleteTarget?.id]}
              >
                {actionLoading[deleteTarget?.id] ? "Processing..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Centers;