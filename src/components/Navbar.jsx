import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive(path)
        ? "text-indigo-600 bg-indigo-50"
        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP NAVBAR ================= */}

        <div className="h-[76px] flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
              🚀
            </div>

            <div className="hidden sm:block">

              <h1 className="text-xl font-bold text-slate-900 leading-tight">
                EntreSkill Hub
              </h1>

              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                LEARN • BUILD • GROW
              </p>

            </div>

          </Link>


          {/* ================= DESKTOP MENU ================= */}

          <div className="hidden lg:flex items-center gap-1">

            <Link
              to="/dashboard"
              className={linkClass("/dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/courses"
              className={linkClass("/courses")}
            >
              Courses
            </Link>

            <Link
              to="/mycourses"
              className={linkClass("/mycourses")}
            >
              My Courses
            </Link>

            {/* Admin Only */}

            {role === "admin" && (
              <Link
                to="/add-course"
                className={linkClass("/add-course")}
              >
                <span className="mr-1">+</span>
                Add Course
              </Link>
            )}

            <Link
              to="/profile"
              className={linkClass("/profile")}
            >
              Profile
            </Link>

          </div>


          {/* ================= RIGHT SECTION ================= */}

          <div className="hidden lg:flex items-center gap-4">

            {/* User */}

            <Link
              to="/profile"
              className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl hover:bg-slate-50 transition"
            >

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                {(name || "U").charAt(0).toUpperCase()}
              </div>

              <div className="text-left">

                <p className="text-sm font-semibold text-slate-800 leading-tight">
                  {name || "User"}
                </p>

                <p className="text-xs text-slate-400 capitalize">
                  {role || "student"}
                </p>

              </div>

            </Link>


            {/* Logout */}

            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-red-500 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Logout
            </button>

          </div>


          {/* ================= MOBILE BUTTON ================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}

        {menuOpen && (

          <div className="lg:hidden border-t border-slate-100 py-5">

            <div className="flex flex-col gap-2">

              <Link
                to="/dashboard"
                onClick={closeMenu}
                className={linkClass("/dashboard")}
              >
                🏠 Dashboard
              </Link>

              <Link
                to="/courses"
                onClick={closeMenu}
                className={linkClass("/courses")}
              >
                📚 Courses
              </Link>

              <Link
                to="/mycourses"
                onClick={closeMenu}
                className={linkClass("/mycourses")}
              >
                🎓 My Courses
              </Link>

              {role === "admin" && (
                <Link
                  to="/add-course"
                  onClick={closeMenu}
                  className={linkClass("/add-course")}
                >
                  ➕ Add Course
                </Link>
              )}

              <Link
                to="/profile"
                onClick={closeMenu}
                className={linkClass("/profile")}
              >
                👤 Profile
              </Link>


              {/* Mobile User */}

              <div className="mt-3 pt-4 border-t border-slate-100">

                <div className="flex items-center gap-3 px-3 py-3">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">
                    {(name || "U").charAt(0).toUpperCase()}
                  </div>

                  <div>

                    <p className="font-semibold text-slate-800">
                      {name || "User"}
                    </p>

                    <p className="text-xs text-slate-400 capitalize">
                      {role || "student"}
                    </p>

                  </div>

                </div>


                {/* Mobile Logout */}

                <button
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                  className="w-full mt-3 bg-slate-900 hover:bg-red-500 text-white py-3 rounded-xl font-semibold transition"
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;