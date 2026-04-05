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
  const [statusFilter, setStatusFilter] = useState("all");
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
      if (manualRefresh) {
        setRefreshing(true);
      }

      const response = await api.get("/center-requests");
      setRequests(response.data || []);
    } catch (err) {
      console.error("Requests fetch error:", err);
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

  const handleViewDetails = async (requestItem) => {
    try {
      setDetailsOpen(true);
      setDetailsLoading(true);
      setSelectedRequest(requestItem);

      const response = await api.get(`/center-requests/${requestItem.id}`);
      setSelectedRequest(response.data.data || response.data || requestItem);
    } catch (err) {
      console.error("Request details error:", err);
      setSelectedRequest(requestItem);
      showToast("error", err?.response?.data?.message || "Failed to load full request details.");
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
          `Request approved successfully. Generated password: ${generatedPassword}`
        );
      } else {
        showToast("success", "Request approved successfully.");
      }
    } catch (err) {
      console.error("Approve request error:", err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to approve request."
      );
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
    } catch (err) {
      console.error("Reject request error:", err);
      showToast(
        "error",
        err?.response?.data?.message || "Failed to reject request."
      );
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
            <p>Review and manage center registration requests.</p>
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
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </section>

        <section className="sup-cards sup-requests-stats">
          <div className="sup-card sup-animate-up">
            <span>Total Requests</span>
            <h3>{stats.total}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.06s" }}>
            <span>Pending Requests</span>
            <h3>{stats.pending}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.12s" }}>
            <span>Accepted Requests</span>
            <h3>{stats.accepted}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.18s" }}>
            <span>Rejected Requests</span>
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
                            <span className="sup-no-action">No actions available</span>
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
                <h3>{selectedRequest?.name || selectedRequest?.center_name || "Request Details"}</h3>
                <p>Review the full request information before making a decision.</p>
              </div>

              <button className="sup-modal-close" onClick={closeDetailsModal}>
                ×
              </button>
            </div>

            {detailsLoading ? (
              <div className="sup-modal-loading">Loading request details...</div>
            ) : selectedRequest ? (
              <>
                <div className="request-modal-top">
                  <StatusBadge status={selectedRequest.status} />

                  <div className="request-modal-actions">
                    {selectedRequest.status === "pending" && (
                      <>
                        <button
                          className="sup-btn sup-btn-success"
                          onClick={() => handleApprove(selectedRequest.id)}
                          disabled={!!actionLoading[selectedRequest.id]}
                        >
                          {actionLoading[selectedRequest.id] ? "Processing..." : "Approve"}
                        </button>

                        <button
                          className="sup-btn sup-btn-danger"
                          onClick={() => openRejectModal(selectedRequest.id)}
                          disabled={!!actionLoading[selectedRequest.id]}
                        >
                          {actionLoading[selectedRequest.id] ? "Processing..." : "Reject"}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="request-modal-grid">
                  <div className="request-modal-card">
                    <span>Center Name</span>
                    <strong>{selectedRequest.name || selectedRequest.center_name || "-"}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Manager Name</span>
                    <strong>{selectedRequest.manager_name || "-"}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Email Address</span>
                    <strong>{selectedRequest.email || "-"}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Phone Number</span>
                    <strong>{selectedRequest.phone || "-"}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>City</span>
                    <strong>{selectedRequest.city || "-"}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Submitted Date</span>
                    <strong>{formatDate(selectedRequest.created_at)}</strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Reviewed Date</span>
                    <strong>
                      {formatDate(
                        selectedRequest.reviewed_at ||
                          selectedRequest.approved_at ||
                          selectedRequest.rejected_at
                      )}
                    </strong>
                  </div>

                  <div className="request-modal-card">
                    <span>Status</span>
                    <strong>{selectedRequest.status || "-"}</strong>
                  </div>

                  <div className="request-modal-card request-modal-card-full">
                    <span>Full Address</span>
                    <strong>{selectedRequest.address || "No address provided."}</strong>
                  </div>

                  <div className="request-modal-card request-modal-card-full">
                    <span>Complete Message</span>
                    <strong>{selectedRequest.message || "No message provided."}</strong>
                  </div>
                </div>

                <div className="request-history-box">
                  <h4>Admin Action History</h4>

                  <div className="request-history-list-modal">
                    <div className="request-history-item-modal">
                      <span>Request Submitted</span>
                      <strong>{formatDate(selectedRequest.created_at)}</strong>
                    </div>

                    <div className="request-history-item-modal">
                      <span>Reviewed Date</span>
                      <strong>
                        {formatDate(
                          selectedRequest.reviewed_at ||
                            selectedRequest.approved_at ||
                            selectedRequest.rejected_at
                        )}
                      </strong>
                    </div>

                    <div className="request-history-item-modal">
                      <span>Current Status</span>
                      <strong>{selectedRequest.status || "-"}</strong>
                    </div>
                  </div>

                  {selectedRequest.reject_reason && (
                    <div className="request-reject-reason-box">
                      <span>Reject Reason</span>
                      <p>{selectedRequest.reject_reason}</p>
                    </div>
                  )}
                </div>

                <div className="sup-modal-footer">
                  <button className="sup-btn sup-btn-light" onClick={closeDetailsModal}>
                    Close
                  </button>
                </div>
              </>
            ) : (
              <div className="sup-modal-loading">No request data found.</div>
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
                <p>Please write the reason for rejecting this request.</p>
              </div>

              <button className="sup-modal-close" onClick={closeRejectModal}>
                ×
              </button>
            </div>

            <div className="reject-reason-body">
              <label className="reject-reason-label">Reject Reason</label>
              <textarea
                className="reject-reason-textarea"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Write the rejection reason here..."
                rows={5}
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
                {actionLoading[rejectTargetId] ? "Processing..." : "Confirm Reject"}
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