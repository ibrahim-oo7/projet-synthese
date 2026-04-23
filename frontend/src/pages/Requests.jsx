import { useCallback, useEffect, useMemo, useState } from "react";
import SuperNavbar from "../components/SuperNavbar";
import api from "../services/api";
import { logout } from "../services/authService";
import "../style/Requests.css";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [actionLoading, setActionLoading] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectTargetId, setRejectTargetId] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    type: "success",
    message: "",
  });

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

  const fetchRequests = useCallback(async (manualRefresh = false) => {
    try {
      setError("");
      if (manualRefresh) setRefreshing(true);
      const response = await api.get("/center-requests");
      setRequests(response.data || []);
    } catch (err) {
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRefresh = () => {
    fetchRequests(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
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

  const handleViewDetails = async (requestItem) => {
    try {
      setDetailsOpen(true);
      setDetailsLoading(true);
      setSelectedRequest(requestItem);
      const response = await api.get(`/center-requests/${requestItem.id}`);
      setSelectedRequest(response.data.data || response.data || requestItem);
    } catch {
      setSelectedRequest(requestItem);
      showToast("error", "Failed to load full request details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetailsModal = () => {
    setDetailsOpen(false);
    setSelectedRequest(null);
    setDetailsLoading(false);
  };

  const openRejectModal = (id) => {
    setRejectTargetId(id);
    setRejectReason("");
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectReason("");
    setRejectTargetId(null);
  };

  const handleApprove = async (id) => {
    try {
      setRowLoading(id, true);
      const response = await api.post(`/center-requests/${id}/approve`);
      const generatedPassword =
        response?.data?.data?.generated_password ||
        response?.data?.generated_password;

      await fetchRequests();

      if (selectedRequest?.id === id) {
        const updated = await api.get(`/center-requests/${id}`);
        setSelectedRequest(updated.data.data || updated.data);
      }

      if (generatedPassword) {
        showToast(
          "success",
          `Request approved. Password: ${generatedPassword}`
        );
      } else {
        showToast("success", "Request approved successfully.");
      }
    } catch {
      showToast("error", "Failed to approve request.");
    } finally {
      setRowLoading(id, false);
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      showToast("error", "Please enter a rejection reason.");
      return;
    }

    try {
      setRowLoading(rejectTargetId, true);

      await api.post(`/center-requests/${rejectTargetId}/reject`, {
        reject_reason: rejectReason.trim(),
      });

      await fetchRequests();

      if (selectedRequest?.id === rejectTargetId) {
        const updated = await api.get(`/center-requests/${rejectTargetId}`);
        setSelectedRequest(updated.data.data || updated.data);
      }

      closeRejectModal();
      showToast("success", "Request rejected successfully.");
    } catch {
      showToast("error", "Failed to reject request.");
    } finally {
      setRowLoading(rejectTargetId, false);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.name?.toLowerCase().includes(search.toLowerCase()) ||
        request.center_name?.toLowerCase().includes(search.toLowerCase()) ||
        request.email?.toLowerCase().includes(search.toLowerCase()) ||
        request.city?.toLowerCase().includes(search.toLowerCase()) ||
        request.phone?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const accepted = requests.filter((r) => r.status === "accepted").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;
    return { total, pending, accepted, rejected };
  }, [requests]);

  if (loading) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box">Loading requests...</div>
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
        <div className="sup-state-box sup-error-box">
          <h2>Requests Error</h2>
          <p>{error}</p>
          <button className="sup-btn sup-btn-light" onClick={() => fetchRequests()}>
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
            <h1>Requests</h1>
            <p>
              {statusFilter === "pending" && "Pending requests that need your action."}
              {statusFilter === "accepted" && "Approved requests history."}
              {statusFilter === "rejected" && "Rejected requests history."}
              {statusFilter === "all" && "All requests overview."}
            </p>
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
              <option value="pending">Pending (Default)</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
          </div>
        </section>

        <section className="sup-cards sup-requests-stats">
          <div className="sup-card sup-animate-up">
            <span>Total Requests</span>
            <h3>{stats.total}</h3>
          </div>

          <div className="sup-card sup-animate-up">
            <span>Pending</span>
            <h3>{stats.pending}</h3>
          </div>

          <div className="sup-card sup-animate-up">
            <span>Accepted</span>
            <h3>{stats.accepted}</h3>
          </div>

          <div className="sup-card sup-animate-up">
            <span>Rejected</span>
            <h3>{stats.rejected}</h3>
          </div>
        </section>

        <section className="sup-panel sup-animate-up">
          <div className="sup-panel-head">
            <div>
              <h3>Requests List</h3>
              <p>{filteredRequests.length} result(s)</p>
            </div>
          </div>

          {filteredRequests.length > 0 ? (
            <div className="sup-table-wrap">
              <table className="sup-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="sup-actions-col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.name || request.center_name || "-"}</td>
                      <td>{request.email}</td>
                      <td>{request.phone || "-"}</td>
                      <td>{request.city || "-"}</td>
                      <td className="sup-message-cell">{request.message || "-"}</td>
                      <td>
                        <StatusBadge status={request.status} />
                      </td>
                      <td>{formatDate(request.created_at)}</td>
                      <td>
                        <div className="sup-table-actions">
                          <button
                            className="sup-btn sup-btn-light"
                            onClick={() => handleViewDetails(request)}
                          >
                            View Details
                          </button>

                          {request.status === "pending" ? (
                            <>
                              <button
                                className="sup-btn sup-btn-success"
                                onClick={() => handleApprove(request.id)}
                                disabled={!!actionLoading[request.id]}
                              >
                                {actionLoading[request.id] ? "Processing..." : "Approve"}
                              </button>

                              <button
                                className="sup-btn sup-btn-danger"
                                onClick={() => openRejectModal(request.id)}
                                disabled={!!actionLoading[request.id]}
                              >
                                {actionLoading[request.id] ? "Processing..." : "Reject"}
                              </button>
                            </>
                          ) : (
                            <span className="sup-no-action">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sup-empty">No requests found.</p>
          )}
        </section>
      </main>

      {detailsOpen && (
        <div className="sup-modal-overlay" onClick={closeDetailsModal}>
          <div
            className="sup-modal request-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sup-modal-head">
              <div>
                <h3>{selectedRequest?.name || selectedRequest?.center_name}</h3>
                <p>Full request details</p>
              </div>

              <button className="sup-modal-close" onClick={closeDetailsModal}>
                ×
              </button>
            </div>

            {detailsLoading ? (
              <div className="sup-modal-loading">Loading...</div>
            ) : (
              <>
                <div className="request-modal-grid">
                  <div className="request-modal-card">
                    <span>Email</span>
                    <strong>{selectedRequest?.email}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Phone</span>
                    <strong>{selectedRequest?.phone}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>City</span>
                    <strong>{selectedRequest?.city}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Status</span>
                    <strong>{selectedRequest?.status}</strong>
                  </div>

                  <div className="request-modal-card request-modal-card-full">
                    <span>Message</span>
                    <strong>{selectedRequest?.message}</strong>
                  </div>
                </div>

                <div className="sup-modal-footer">
                  <button className="sup-btn sup-btn-light" onClick={closeDetailsModal}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {rejectModalOpen && (
        <div className="sup-modal-overlay" onClick={closeRejectModal}>
          <div
            className="sup-modal reject-reason-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sup-modal-head">
              <div>
                <h3>Reject Request</h3>
              </div>

              <button className="sup-modal-close" onClick={closeRejectModal}>
                ×
              </button>
            </div>

            <div className="reject-reason-body">
              <textarea
                className="reject-reason-textarea"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Write reason..."
              />
            </div>

            <div className="sup-modal-footer">
              <button className="sup-btn sup-btn-light" onClick={closeRejectModal}>
                Cancel
              </button>

              <button
                className="sup-btn sup-btn-danger"
                onClick={handleConfirmReject}
                disabled={!!actionLoading[rejectTargetId]}
              >
                {actionLoading[rejectTargetId] ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const statusClasses = {
    pending: "sup-status-pending",
    accepted: "sup-status-active",
    rejected: "sup-status-disabled",
  };

  return (
    <span className={`sup-status-badge ${statusClasses[status] || ""}`}>
      {status}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

export default Requests;