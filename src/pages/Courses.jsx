import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Courses load nahi hue"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete Course
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/courses/${id}`);

      alert("Course deleted successfully");

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id)
      );
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete course"
      );
    }
  };

  // Edit Course
  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  // Search
  const filteredCourses = courses.filter((course) =>
    course.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* ================= HERO SECTION ================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700">

          {/* Decorative circles */}

          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full" />

          <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-white/10 rounded-full" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5 backdrop-blur-sm">
                <span>✨</span>
                <span>LEARN • BUILD • GROW</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Explore Courses
                <span className="block text-white/80">
                  Build Your Future.
                </span>
              </h1>

              <p className="mt-5 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
                Discover courses designed to help you learn new
                skills, improve your knowledge and move closer
                to your career goals.
              </p>

            </div>

          </div>

        </section>


        {/* ================= MAIN CONTENT ================= */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

          {/* ================= SEARCH + ACTION ================= */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-8">

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

              {/* Search */}

              <div className="relative w-full lg:max-w-2xl">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search courses by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />

              </div>


              {/* Admin Add Course */}

              {userRole === "admin" && (
                <button
                  onClick={() => navigate("/add-course")}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-lg">+</span>
                  Add New Course
                </button>
              )}

            </div>

          </div>


          {/* ================= PAGE INFO ================= */}

          {!loading && filteredCourses.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

              <div>

                <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                  Available Learning
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                  Browse All Courses
                </h2>

              </div>

              <div className="inline-flex items-center self-start sm:self-auto bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">

                <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2" />

                <span className="text-sm font-semibold text-slate-600">
                  {filteredCourses.length}{" "}
                  {filteredCourses.length === 1
                    ? "Course"
                    : "Courses"}{" "}
                  Available
                </span>

              </div>

            </div>
          )}


          {/* ================= LOADING ================= */}

          {loading ? (

            <div className="flex justify-center items-center py-24">

              <div className="text-center">

                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-5" />

                <h3 className="text-xl font-semibold text-slate-800">
                  Loading Courses...
                </h3>

                <p className="text-slate-500 mt-1">
                  Please wait while we fetch the latest courses.
                </p>

              </div>

            </div>

          ) : filteredCourses.length === 0 ? (

            /* ================= NO COURSES ================= */

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-10 md:p-16 text-center max-w-2xl mx-auto">

              <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center text-4xl mb-6">
                🔍
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                No Courses Found
              </h2>

              <p className="text-slate-500 leading-relaxed">
                We couldn't find any course matching{" "}
                <span className="font-semibold text-slate-700">
                  "{search}"
                </span>
                .
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                >
                  Clear Search
                </button>
              )}

            </div>

          ) : (

            /* ================= COURSES ================= */

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredCourses.map((course) => (

                <div
                  key={course._id}
                  className="group flex flex-col h-full"
                >

                  {/* Course Card */}

                  <div className="h-full transition-all duration-300 group-hover:-translate-y-2">
                    <CourseCard course={course} />
                  </div>


                  {/* ================= ADMIN ACTIONS ================= */}

                  {userRole === "admin" && (

                    <div className="flex gap-3 mt-5 pb-2">

                      <button
                        onClick={() => handleEdit(course._id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300 py-2.5 rounded-xl font-semibold shadow-sm transition"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => handleDelete(course._id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-2.5 rounded-xl font-semibold shadow-sm transition"
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ================= BOTTOM CTA ================= */}

        {!loading && filteredCourses.length > 0 && (

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

            <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-10">

              <div className="absolute -right-20 -top-20 w-56 h-56 bg-indigo-600/30 rounded-full" />

              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wide mb-2">
                    Keep Learning
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Your next opportunity starts here.
                  </h2>

                  <p className="text-slate-400 mt-2 max-w-xl">
                    Choose a course, build your skills and take
                    the next step toward your goals.
                  </p>

                </div>

                <button
                  onClick={() => navigate("/mycourses")}
                  className="shrink-0 bg-white text-slate-900 hover:bg-indigo-50 px-6 py-3 rounded-xl font-bold transition"
                >
                  View My Courses →
                </button>

              </div>

            </div>

          </section>

        )}

      </main>
    </>
  );
}

export default Courses;