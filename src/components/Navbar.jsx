import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("myCoursesCount");

    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Top Navbar */}
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="text-2xl font-bold text-blue-600"
          >
            🎓 LMS Portal
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">

            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>

            <Link
              to="/courses"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Courses
            </Link>

            <Link
              to="/mycourses"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              My Courses
            </Link>

            {/* Admin Only */}
            {role === "admin" && (
              <Link
                to="/add-course"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                ➕ Add Course
              </Link>
            )}

            {/* Profile */}
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              👤 Profile
            </Link>

            {/* Name */}
            <span className="text-gray-600">
              Hi, <strong>{name || "User"}</strong>
            </span>

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-5 border-t pt-4">

            <div className="flex flex-col gap-4">

              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                🏠 Dashboard
              </Link>

              <Link
                to="/courses"
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                📚 Courses
              </Link>

              <Link
                to="/mycourses"
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                🎓 My Courses
              </Link>

              {/* Admin Only */}
              {role === "admin" && (
                <Link
                  to="/add-course"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  ➕ Add Course
                </Link>
              )}

              <Link
                to="/profile"
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                👤 Profile
              </Link>

              <div className="text-gray-600">
                Hi, <strong>{name || "User"}</strong>
              </div>

              <button
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;