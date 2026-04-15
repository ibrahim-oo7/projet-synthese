import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/my-certificates", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setCertificates(res.data || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <p>Loading certificates...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Certificates</h2>

      {certificates.length === 0 ? (
        <p>No certificates yet.</p>
      ) : (
        certificates.map((cert) => (
          <div
            key={cert.id}
            style={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginBottom: "12px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/certificate/${cert.course_id}`)}
          >
            <h4>{cert.course?.title || `Course #${cert.course_id}`}</h4>
            <p>Issued at: {cert.issued_at}</p>
          </div>
        ))
      )}
    </div>
  );
}