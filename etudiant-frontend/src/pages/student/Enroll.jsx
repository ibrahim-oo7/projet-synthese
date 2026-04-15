import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { enrollCourse } from "../../features/enrollments/enrollmentSlice";

export default function Enroll() {
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [motivation, setMotivation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [objectif, setObjectif] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !paymentMethod || !experienceLevel || !objectif || !acceptTerms) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/enroll/${id}`,
        {
          student_id: user.id,
          course_id: id,
          phone,
          payment_method: paymentMethod,
          experience_level: experienceLevel,
          objectif,
          motivation,
          accept_terms: acceptTerms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(enrollCourse({ courseId: Number(id) }));
      toast.success("Enrolled successfully!");
      navigate("/student/dashboard");
      window.scrollTo(0, 0); 
    } catch (error) {
      console.log(error.response?.data || error.message);
      console.log("token", token);
      alert("Something went wrong!!");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <div style={styles.leftSection}>
            <div style={styles.badge}>FormInnova</div>
            <h1 style={styles.title}>Course Enrollment</h1>
            <p style={styles.subtitle}>
              Complete the form below to confirm your enrollment and join your learning journey.
            </p>

            <div style={styles.infoBox}>
              <p style={styles.infoTitle}>Why enroll now?</p>
              <ul style={styles.list}>
                <li>Access your course instantly</li>
                <li>Track your progress easily</li>
                <li>Get your certificate after completion</li>
              </ul>
            </div>
          </div>

          <div style={styles.rightSection}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <h2 style={styles.formTitle}>Enrollment Form</h2>

              <div style={styles.group}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your phone number"
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  style={styles.input}
                >
                  <option value="">-- Select --</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Objectif</label>
                <select
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  style={styles.input}
                >
                  <option value="">-- Select --</option>
                  <option value="Trouver un emploi">Trouver un emploi</option>
                  <option value="Améliorer mes compétences">Améliorer mes compétences</option>
                  <option value="Changer de carrière">Changer de carrière</option>
                </select>
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={styles.input}
                >
                  <option value="">-- Select --</option>
                  <option value="Virement">Virement</option>
                  <option value="Carte">Carte</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div style={styles.group}>
                <label style={styles.label}>Motivation</label>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  rows={4}
                  style={{ ...styles.input, resize: "none", minHeight: "110px" }}
                  placeholder="Tell us why you want to join this course"
                />
              </div>

              <div style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  style={styles.checkbox}
                />
                <label style={styles.checkboxLabel}>
                  I accept the Terms & Conditions
                </label>
              </div>

              <button type="submit" style={styles.button}>
                Confirm Enrollment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #eafaf1 100%)",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    width: "100%",
    maxWidth: "1100px",
  },

  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    backgroundColor: "#fff",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    minHeight: "650px",
  },

  leftSection: {
    background: "linear-gradient(160deg, #15BE6A 0%, #119d58 100%)",
    color: "#fff",
    padding: "50px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.16)",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "20px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "16px",
    lineHeight: "1.2",
  },

  subtitle: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "rgba(255,255,255,0.92)",
    marginBottom: "30px",
  },

  infoBox: {
    backgroundColor: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "18px",
    padding: "22px",
  },

  infoTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "14px",
  },

  list: {
    margin: 0,
    paddingLeft: "18px",
    lineHeight: "1.9",
    fontSize: "15px",
  },

  rightSection: {
    padding: "45px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    width: "100%",
  },

  formTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1a2a3a",
    marginBottom: "28px",
  },

  group: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#344054",
    marginBottom: "8px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #dbe2ea",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#f9fbfc",
    color: "#1a2a3a",
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
    marginBottom: "24px",
  },

  checkbox: {
    width: "18px",
    height: "18px",
    accentColor: "#15BE6A",
    cursor: "pointer",
  },

  checkboxLabel: {
    fontSize: "14px",
    color: "#475467",
  },

  button: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #15BE6A 0%, #119d58 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(21,190,106,0.25)",
  },
};