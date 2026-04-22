import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
 import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { fetchCourseById, normalizeCourse } from "../../services/courseApi";
import axios from "axios";
import {
  FaCertificate,
  FaDownload,
  FaPrint,
  FaShare,
  FaCheckCircle,
  FaCalendarAlt,
  FaAward,
  FaGraduationCap,
  FaSpinner,
  FaMapMarkerAlt,
  FaBuilding
} from "react-icons/fa";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "40px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  certificateWrapper: {
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease"
  },

  certificate: {
    padding: "40px 35px",
    background: "#ffffff",
    position: "relative",
    border: "1px solid #e9ecef"
  },

  decorativeBorder: {
    position: "absolute",
    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    border: "1px solid #15BE6A",
    opacity: 0.2,
    pointerEvents: "none",
    borderRadius: "8px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px"
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  logoIcon: {
    fontSize: "40px",
    color: "#15BE6A"
  },

  instituteText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1a2a3a",
    letterSpacing: "1px"
  },

  certificateBadge: {
    backgroundColor: "#15BE6A10",
    padding: "6px 14px",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  badgeIcon: {
    fontSize: "18px",
    color: "#15BE6A"
  },

  badgeText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#15BE6A",
    textTransform: "uppercase"
  },

  titleSection: {
    textAlign: "center",
    marginBottom: "25px"
  },

  certTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#15BE6A",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "5px"
  },

  subTitle: {
    fontSize: "14px",
    color: "#6c757d",
    letterSpacing: "1px"
  },

  studentInfo: {
    textAlign: "center",
    marginBottom: "25px"
  },

  thisIsToCertify: {
    fontSize: "15px",
    color: "#6c757d",
    marginBottom: "8px"
  },

  studentName: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a2a3a",
    fontFamily: "'Georgia', serif",
    marginBottom: "8px"
  },

  underline: {
    width: "80px",
    height: "3px",
    backgroundColor: "#15BE6A",
    margin: "0 auto"
  },

  completionText: {
    fontSize: "15px",
    color: "#6c757d",
    margin: "20px 0 10px"
  },

  courseName: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#15BE6A",
    marginBottom: "20px"
  },

  centerInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    padding: "15px 20px",
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },

  centerDetail: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  centerIcon: {
    fontSize: "20px",
    color: "#15BE6A"
  },

  centerText: {
    fontSize: "14px",
    color: "#1a2a3a",
    fontWeight: "500"
  },

  centerSub: {
    fontSize: "12px",
    color: "#6c757d"
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    margin: "20px 0",
    textAlign: "center"
  },

  detailCard: {
    backgroundColor: "#f8f9fa",
    padding: "12px",
    borderRadius: "10px"
  },

  detailLabel: {
    fontSize: "12px",
    color: "#6c757d",
    marginBottom: "5px"
  },

  detailValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a2a3a"
  },

  gradeSection: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    margin: "25px 0",
    flexWrap: "wrap"
  },

  gradeCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "#15BE6A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 8px",
    boxShadow: "0 4px 10px rgba(21,190,106,0.3)"
  },

  gradeLetter: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff"
  },

  gradeLabel: {
    fontSize: "12px",
    color: "#6c757d"
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e9ecef",
    flexWrap: "wrap",
    gap: "20px"
  },

  signatureBox: {
    textAlign: "center"
  },

  signatureLine: {
    width: "180px",
    height: "2px",
    backgroundColor: "#1a2a3a",
    marginBottom: "8px"
  },

  signatureName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a2a3a"
  },

  signatureTitle: {
    fontSize: "11px",
    color: "#6c757d"
  },

  dateBox: {
    textAlign: "center"
  },

  certId: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "11px",
    color: "#adb5bd",
    fontFamily: "monospace"
  },

  actionButtons: {
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderTop: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease"
  },

  downloadButton: {
    backgroundColor: "#15BE6A",
    color: "#fff"
  },

  printButton: {
    backgroundColor: "#1a2a3a",
    color: "#fff"
  },

  shareButton: {
    backgroundColor: "#e9ecef",
    color: "#495057"
  },

  backButton: {
    backgroundColor: "#fff",
    color: "#15BE6A",
    border: "1px solid #15BE6A"
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "16px"
  },

  spinner: {
    animation: "spin 1s linear infinite",
    fontSize: "48px",
    color: "#15BE6A"
  },

  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#15BE6A",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 1000,
    animation: "slideIn 0.3s ease"
  },

  errorBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center"
  }
};

export default function Certificate() {
  const { courseId } = useParams();
  const authUser = useSelector((state) => state.auth?.user);
  const user = authUser || JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const certificateRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [certificateData, setCertificateData] = useState({
    studentName: "",
    courseName: "",
    completionDate: "",
    grade: "A",
    score: 0,
    certificateId: "",
    duration: "40 hours",
    instructor: "FormInnova Team",
    centerName: "FormInnova Learning Center",
    centerLocation: "Online / Worldwide"
  });
useEffect(() => {
  const fetchCertificate = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const certificateResponse = await axios.get(
        `http://127.0.0.1:8000/api/certificates/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const cert = certificateResponse.data?.data || certificateResponse.data || {};
      console.log("CERTIFICATE RESPONSE:", cert);

      let rawCourse = null;
      let normalizedCourse = null;

      try {
        const courseResponse = await fetchCourseById(courseId);
        console.log("RAW COURSE RESPONSE:", courseResponse);

        rawCourse =
          courseResponse?.data?.course ||
          courseResponse?.data ||
          courseResponse?.course ||
          courseResponse ||
          {};

        normalizedCourse = normalizeCourse(rawCourse);
        console.log("NORMALIZED COURSE:", normalizedCourse);
      } catch (courseError) {
        console.log("COURSE FETCH ERROR:", courseError.response?.data || courseError.message);
      }

      const fallbackCourseName =
        rawCourse?.title ||
        rawCourse?.name ||
        normalizedCourse?.title ||
        cert.course?.title ||
        cert.course?.name;

      const fallbackCenterName =
        rawCourse?.center?.name ||
        rawCourse?.centre?.name ||
        rawCourse?.education_center?.name ||
        rawCourse?.educationCenter?.name ||
        normalizedCourse?.center?.name;

      const fallbackCenterLocation =
        rawCourse?.center?.location ||
        rawCourse?.centre?.location ||
        rawCourse?.education_center?.location ||
        rawCourse?.educationCenter?.location ||
        normalizedCourse?.center?.location;

      const courseNameFromCert =
        cert.course_name && cert.course_name.startsWith("Course #")
          ? fallbackCourseName
          : cert.course_name;

      const centerNameFromCert =
        !cert.center_name || cert.center_name === "FormInnova"
          ? fallbackCenterName
          : cert.center_name;

      setCertificateData({
        studentName: cert.student_name || user?.name || "Student",
        courseName: courseNameFromCert || fallbackCourseName || "Course",
        completionDate: cert.issued_at || cert.completion_date || "",
        grade: cert.grade || "A",
        score: Number(cert.score || 0),
        certificateId: cert.certificate_id || cert.id || "",
        duration:
          cert.duration ||
          rawCourse?.duration ||
          normalizedCourse?.duration ||
          cert.course?.duration ||
          "40 hours",
        instructor:
          cert.instructor ||
          rawCourse?.teacher?.name ||
          rawCourse?.teacher?.full_name ||
          rawCourse?.formateur?.name ||
          normalizedCourse?.instructor ||
          "FormInnova Team",
        centerName:
          centerNameFromCert && centerNameFromCert !== "Unknown Center"
            ? centerNameFromCert
            : "FormInnova Learning Center",
        centerLocation:
          cert.center_location ||
          fallbackCenterLocation ||
          "Online / Worldwide",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Certificate not found"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchCertificate();
}, [courseId, user, navigate]);

  const handleDownload = async () => {
    try {
      const element = certificateRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 8;
      const availableWidth = pdfWidth - margin * 2;
      const availableHeight = pdfHeight - margin * 2;

      const ratio = Math.min(
        availableWidth / canvas.width,
        availableHeight / canvas.height
      );

      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Certificate - ${certificateData.courseName}`,
          text: `I completed ${certificateData.courseName} on FormInnova!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage("Link copied!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} />
        <p>Generating your certificate...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div style={styles.container}>
        <div style={styles.errorBox}>
          <h2>{errorMessage}</h2>
          <button
            onClick={() => { window.scrollTo(0, 0); navigate("/student/my-certificates"); }}
            style={{ ...styles.button, ...styles.backButton, marginTop: "20px" }}
          >
            Back to Certificates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.certificateWrapper}>
        <div style={styles.certificate} ref={certificateRef}>
          <div style={styles.decorativeBorder}></div>

          <div style={styles.header}>
            <div style={styles.logoArea}>
              <FaGraduationCap style={styles.logoIcon} />
              <span style={styles.instituteText}>FormInnova</span>
            </div>
            <div style={styles.certificateBadge}>
              <FaCertificate style={styles.badgeIcon} />
              <span style={styles.badgeText}>Certificate of Completion</span>
            </div>
          </div>

          <div style={styles.titleSection}>
            <div style={styles.certTitle}>CERTIFICATE</div>
            <div style={styles.subTitle}>OF ACHIEVEMENT</div>
          </div>

          <div style={styles.studentInfo}>
            <div style={styles.thisIsToCertify}>
              This certificate is proudly presented to
            </div>
            <div style={styles.studentName}>{certificateData.studentName}</div>
            <div style={styles.underline}></div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={styles.completionText}>
              for successfully completing the course
            </div>
            <div style={styles.courseName}>{certificateData.courseName}</div>
          </div>

          <div style={styles.centerInfo}>
            <div style={styles.centerDetail}>
              <FaBuilding style={styles.centerIcon} />
              <div>
                <div style={styles.centerText}>{certificateData.centerName}</div>
                <div style={styles.centerSub}>Education Center</div>
              </div>
            </div>
            <div style={styles.centerDetail}>
              <FaMapMarkerAlt style={styles.centerIcon} />
              <div>
                <div style={styles.centerText}>{certificateData.centerLocation}</div>
                <div style={styles.centerSub}>Location</div>
              </div>
            </div>
          </div>

          <div style={styles.detailsGrid}>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Duration</div>
              <div style={styles.detailValue}>{certificateData.duration}</div>
            </div>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Instructor</div>
              <div style={styles.detailValue}>{certificateData.instructor}</div>
            </div>
            <div style={styles.detailCard}>
              <div style={styles.detailLabel}>Final Score</div>
              <div style={styles.detailValue}>{certificateData.score}%</div>
            </div>
          </div>

          <div style={styles.gradeSection}>
            <div>
              <div style={styles.gradeCircle}>
                <div style={styles.gradeLetter}>{certificateData.grade}</div>
              </div>
              <div style={styles.gradeLabel}>Grade</div>
            </div>
            <div>
              <div style={styles.gradeCircle}>
                <FaAward style={{ fontSize: "32px", color: "#fff" }} />
              </div>
              <div style={styles.gradeLabel}>Honor</div>
            </div>
          </div>

          <div style={styles.footer}>
            <div style={styles.signatureBox}>
              <div style={styles.signatureLine}></div>
              <div style={styles.signatureName}>FormInnova Team</div>
              <div style={styles.signatureTitle}>Academic Director</div>
            </div>
            <div style={styles.dateBox}>
              <FaCalendarAlt style={{ color: "#15BE6A", marginBottom: "8px" }} />
              <div style={styles.signatureName}>{certificateData.completionDate}</div>
              <div style={styles.signatureTitle}>Date Issued</div>
            </div>
          </div>

          <div style={styles.certId}>
            ID: {certificateData.certificateId}
          </div>
        </div>

        <div style={styles.actionButtons}>
          <button
            onClick={handleDownload}
            style={{ ...styles.button, ...styles.downloadButton }}
          >
            <FaDownload /> Download PDF
          </button>
          <button
            onClick={handlePrint}
            style={{ ...styles.button, ...styles.printButton }}
          >
            <FaPrint /> Print
          </button>
          <button
            onClick={handleShare}
            style={{ ...styles.button, ...styles.shareButton }}
          >
            <FaShare /> Share
          </button>
        </div>
      </div>

      {showToast && (
        <div style={styles.toast}>
          <FaCheckCircle />
          {toastMessage}
        </div>
      )}
  

      <style>{`
  @page {
    size: A4 landscape;
    margin: 8mm;
  }

  @media print {
    html, body {
      width: 297mm;
      height: 210mm;
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      overflow: hidden !important;
    }

    body * {
      visibility: hidden !important;
    }

    .print-wrapper,
    .print-wrapper * {
      visibility: visible !important;
    }

    .print-wrapper {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 281mm !important;
      min-height: 194mm !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      box-shadow: none !important;
      overflow: hidden !important;
      transform: scale(0.94);
      transform-origin: top left;
    }

    .print-certificate {
      width: 100% !important;
      min-height: 194mm !important;
      margin: 0 !important;
      padding: 24px 28px !important;
      box-sizing: border-box !important;
      border: 1px solid #e9ecef !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      background: #ffffff !important;
      overflow: hidden !important;
    }

    .print-actions,
    .no-print,
    button {
      display: none !important;
    }

    .print-certificate * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .print-certificate .decorative-border {
      position: absolute !important;
      top: 15px !important;
      left: 15px !important;
      right: 15px !important;
      bottom: 15px !important;
      border: 1px solid #15BE6A !important;
      opacity: 0.2 !important;
      border-radius: 8px !important;
      pointer-events: none !important;
    }

    .print-certificate .cert-title {
      font-size: 24px !important;
      line-height: 1.2 !important;
      margin-bottom: 4px !important;
    }

    .print-certificate .student-name {
      font-size: 30px !important;
      line-height: 1.2 !important;
      margin-bottom: 8px !important;
    }

    .print-certificate .course-name {
      font-size: 20px !important;
      line-height: 1.3 !important;
      margin-bottom: 16px !important;
    }

    .print-certificate .details-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 12px !important;
      margin: 16px 0 !important;
    }

    .print-certificate .grade-section {
      display: flex !important;
      justify-content: center !important;
      gap: 28px !important;
      margin: 18px 0 !important;
      flex-wrap: wrap !important;
    }

    .print-certificate .footer-section {
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-end !important;
      margin-top: 20px !important;
      padding-top: 14px !important;
      border-top: 1px solid #e9ecef !important;
      gap: 20px !important;
      flex-wrap: wrap !important;
    }

    .print-certificate .center-info {
      margin: 16px 0 !important;
      padding: 12px 16px !important;
    }

    .print-certificate .certificate-id {
      margin-top: 14px !important;
      font-size: 11px !important;
      text-align: center !important;
    }
  }

  @media screen {
    .print-wrapper {
      width: 100%;
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`}</style>
    </div>
  );
}