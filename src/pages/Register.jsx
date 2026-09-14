import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/users/register", {
        ...formData,
        role: "student",
      });

      alert("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT SECTION */}
      <div className="register-left">

        <div className="register-brand">
          <div className="brand-icon">🚀</div>

          <div>
            <h1>EntreSkill Hub</h1>
            <p>LEARN • BUILD • GROW</p>
          </div>
        </div>

        <div className="register-left-content">
          <span className="register-badge">
            ✨ Start Your Learning Journey
          </span>

          <h2>
            Build Skills.
            <br />
            <span>Build Your Future.</span>
          </h2>

          <p>
            Join EntreSkill Hub and learn industry-ready skills,
            explore courses and grow towards your career goals.
          </p>

          <div className="register-benefits">

            <div className="benefit-item">
              <div className="benefit-icon">📚</div>
              <div>
                <h3>Learn New Skills</h3>
                <p>Access structured learning resources.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <div>
                <h3>Track Your Progress</h3>
                <p>Monitor your learning journey easily.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <div>
                <h3>Grow Your Career</h3>
                <p>Develop skills for real-world opportunities.</p>
              </div>
            </div>

          </div>
        </div>

        <div className="register-left-footer">
          © 2026 EntreSkill Hub. Learn • Build • Grow
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="register-right">

        <div className="register-card">

          <div className="register-card-header">
            <span className="mobile-brand-icon">🚀</span>

            <h2>Create your account</h2>

            <p>
              Start your learning journey with EntreSkill Hub
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <span>✉️</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              <small>Password must contain at least 6 characters.</small>
            </div>

            {/* ROLE */}
            <div className="student-role">
              <div className="student-role-icon">🎓</div>

              <div>
                <span>Account Type</span>
                <strong>Student</strong>
              </div>

              <div className="role-check">✓</div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Student Account"}
              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="login-divider">
            <span>Already have an account?</span>
          </div>

          <Link to="/" className="login-link">
            Login to your account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;