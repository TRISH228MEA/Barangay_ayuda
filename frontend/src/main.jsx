import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const API_URL = "http://localhost:5000";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    age: "",
    barangay: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed.");
      }

      setSubmitted(true);
      setShowForm(false);

      setForm({
        full_name: "",
        email: "",
        age: "",
        barangay: ""
      });
    } catch (error) {
      setMessage(
        error.message || "Unable to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS PAGE
  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>

          <h1 style={styles.successTitle}>
            Application Submitted
          </h1>

          <p style={styles.successText}>
            Your application has been submitted successfully.
          </p>

          <button
            style={styles.primaryButton}
            onClick={() => setSubmitted(false)}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>

          <div style={styles.brand}>
            <div style={styles.logo}>
              BA
            </div>

            <div>
              <div style={styles.brandTitle}>
                Barangay Ayuda
              </div>

              <div style={styles.brandSubtitle}>
                Community Assistance Portal
              </div>
            </div>
          </div>

          <button
            style={styles.headerButton}
            onClick={() => {
              setShowForm(true);
              setMessage("");
            }}
          >
            Apply Now
          </button>

        </div>
      </header>


      {/* MAIN CONTENT */}
      <main style={styles.main}>

        <section style={styles.hero}>

          {/* LEFT SIDE */}
          <div style={styles.heroText}>

            <div style={styles.badge}>
              COMMUNITY ASSISTANCE
            </div>

            <h1 style={styles.heroTitle}>
              Apply for
              <br />
              <span style={styles.heroAccent}>
                Barangay Assistance
              </span>
            </h1>

            <p style={styles.heroDescription}>
              Submit your application online and provide
              the information needed for community
              assistance processing.
            </p>

            <button
              style={styles.primaryButton}
              onClick={() => {
                setShowForm(true);
                setMessage("");
              }}
            >
              Start Application →
            </button>

          </div>


          {/* RIGHT SIDE */}
          <div style={styles.infoCard}>

            <div style={styles.infoIcon}>
              ▣
            </div>

            <h2 style={styles.infoTitle}>
              Application Requirements
            </h2>

            <div style={styles.requirement}>
              <span style={styles.check}>✓</span>
              <p style={styles.requirementText}>
                Complete applicant information
              </p>
            </div>

            <div style={styles.requirement}>
              <span style={styles.check}>✓</span>
              <p style={styles.requirementText}>
                Valid email address
              </p>
            </div>

            <div style={styles.requirement}>
              <span style={styles.check}>✓</span>
              <p style={styles.requirementText}>
                Barangay information
              </p>
            </div>

            <div style={styles.requirementLast}>
              <span style={styles.check}>✓</span>
              <p style={styles.requirementText}>
                Valid age information
              </p>
            </div>

          </div>

        </section>


        {/* NOTICE */}
        <section style={styles.notice}>
          <strong>Important:</strong>{" "}
          Please provide accurate information using
          authorized/test information for this school project.
        </section>

      </main>


      {/* APPLICATION MODAL */}
      {showForm && (
        <div style={styles.overlay}>

          <div style={styles.modal}>

            {/* CLOSE BUTTON */}
            <button
              style={styles.closeButton}
              onClick={() => {
                setShowForm(false);
                setMessage("");
              }}
            >
              ×
            </button>


            <h2 style={styles.modalTitle}>
              Application Form
            </h2>

            <p style={styles.modalSubtitle}>
              Please complete all required fields.
            </p>


            {/* ERROR MESSAGE */}
            {message && (
              <div style={styles.error}>
                {message}
              </div>
            )}


            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* FULL NAME */}
              <label style={styles.label}>
                Full Name
              </label>

              <input
                style={styles.input}
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />


              {/* EMAIL */}
              <label style={styles.label}>
                Email Address
              </label>

              <input
                style={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />


              {/* AGE */}
              <label style={styles.label}>
                Age
              </label>

              <input
                style={styles.input}
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                min="1"
                max="120"
                placeholder="Enter age"
                required
              />


              {/* BARANGAY */}
              <label style={styles.label}>
                Barangay
              </label>

              <input
                style={styles.input}
                type="text"
                name="barangay"
                value={form.barangay}
                onChange={handleChange}
                placeholder="Enter barangay"
                required
              />


              {/* SUBMIT */}
              <button
                style={{
                  ...styles.submitButton,
                  opacity: loading ? 0.7 : 1
                }}
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Application"}
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f8fc",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    color: "#1f2937"
  },


  /* HEADER */

  header: {
    background: "#ffffff",
    borderBottom:
      "1px solid #e5e7eb"
  },

  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  logo: {
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "15px"
  },

  brandTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827"
  },

  brandSubtitle: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "2px"
  },

  headerButton: {
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "11px 18px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px"
  },


  /* MAIN */

  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "70px 24px"
  },


  /* HERO */

  hero: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1.2fr) minmax(300px, 0.8fr)",
    gap: "50px",
    alignItems: "center"
  },

  heroText: {
    padding: "20px 0"
  },

  badge: {
    display: "inline-block",
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "7px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "18px",
    letterSpacing: "0.5px"
  },

  heroTitle: {
    fontSize: "52px",
    lineHeight: "1.08",
    margin: "0 0 20px",
    color: "#111827"
  },

  heroAccent: {
    color: "#2563eb"
  },

  heroDescription: {
    maxWidth: "600px",
    color: "#6b7280",
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "28px"
  },


  /* BUTTON */

  primaryButton: {
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "14px 22px",
    borderRadius: "9px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  },


  /* INFO CARD */

  infoCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    boxShadow:
      "0 15px 40px rgba(15, 23, 42, 0.08)",
    border:
      "1px solid #e5e7eb"
  },

  infoIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#eff6ff",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    marginBottom: "18px"
  },

  infoTitle: {
    margin: "0 0 22px",
    fontSize: "22px",
    color: "#111827"
  },

  requirement: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px 0",
    borderBottom:
      "1px solid #f0f0f0"
  },

  requirementLast: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px 0"
  },

  check: {
    color: "#16a34a",
    fontWeight: "700",
    fontSize: "18px"
  },

  requirementText: {
    margin: 0,
    color: "#4b5563",
    fontSize: "14px"
  },


  /* NOTICE */

  notice: {
    marginTop: "55px",
    background: "#ffffff",
    border:
      "1px solid #dbeafe",
    padding: "18px 20px",
    borderRadius: "10px",
    color: "#475569",
    fontSize: "14px",
    lineHeight: "1.6"
  },


  /* MODAL */

  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(15, 23, 42, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 1000
  },

  modal: {
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.2)",
    boxSizing: "border-box"
  },

  closeButton: {
    position: "absolute",
    right: "18px",
    top: "12px",
    border: "none",
    background: "transparent",
    fontSize: "30px",
    color: "#6b7280",
    cursor: "pointer",
    lineHeight: "1"
  },

  modalTitle: {
    margin: "0 0 6px",
    fontSize: "28px",
    color: "#111827"
  },

  modalSubtitle: {
    margin: "0 0 24px",
    color: "#6b7280",
    fontSize: "14px"
  },


  /* FORM */

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "7px",
    marginTop: "16px",
    color: "#374151"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border:
      "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    background: "#ffffff"
  },

  submitButton: {
    width: "100%",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "9px",
    marginTop: "24px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  },


  /* ERROR */

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "12px",
    lineHeight: "1.5"
  },


  /* SUCCESS */

  successCard: {
    width: "min(500px, calc(100% - 40px))",
    margin: "100px auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "45px",
    textAlign: "center",
    boxShadow:
      "0 20px 60px rgba(15, 23, 42, 0.1)",
    boxSizing: "border-box"
  },

  successIcon: {
    width: "65px",
    height: "65px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    background: "#dcfce7",
    color: "#16a34a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "700"
  },

  successTitle: {
    margin: "0 0 12px",
    fontSize: "28px",
    color: "#111827"
  },

  successText: {
    color: "#6b7280",
    marginBottom: "25px",
    lineHeight: "1.6"
  }

};


/* =========================================================
   START REACT
========================================================= */

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);