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
        prevCourses.filter(
          (course) => course._id !== id
        )
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

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-8 md:px-8">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              📚 Explore Our Courses
            </h1>

            <p className="text-white/90 text-lg">
              Learn new skills and build your career.
            </p>

          </div>

          {/* Search */}
          <div className="flex justify-center mb-10">

            <div className="relative w-full max-w-2xl">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                🔎
              </span>

              <input
                type="text"
                placeholder="Search courses by title..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-white p-4 pl-12 rounded-2xl outline-none shadow-xl focus:ring-4 focus:ring-white/30"
              />

            </div>

          </div>

          {/* Loading */}
          {loading ? (
            <div className="text-center text-white text-2xl py-20">
              Loading Courses...
            </div>
          ) : filteredCourses.length === 0 ? (

            /* No Courses */
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-2xl mx-auto">

              <div className="text-6xl mb-5">
                😕
              </div>

              <h2 className="text-3xl font-bold mb-3">
                No Courses Found
              </h2>

              <p className="text-gray-500">
                Try searching with a different course name.
              </p>

            </div>

          ) : (

            <>
              {/* Course Count */}
              <div className="flex justify-between items-center mb-5 text-white">

                <p className="font-semibold">
                  {filteredCourses.length}{" "}
                  {filteredCourses.length === 1
                    ? "Course"
                    : "Courses"}{" "}
                  Available
                </p>

                {userRole === "admin" && (
                  <button
                    onClick={() =>
                      navigate("/add-course")
                    }
                    className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
                  >
                    ➕ Add Course
                  </button>
                )}

              </div>

              {/* Courses Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="group"
                  >

                    {/* Course Card */}
                    <div className="transition duration-300 group-hover:-translate-y-1">
                      <CourseCard course={course} />
                    </div>

                    {/* Admin Actions */}
                    {userRole === "admin" && (
                      <div className="flex gap-3 mt-3">

                        <button
                          onClick={() =>
                            handleEdit(course._id)
                          }
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-xl font-semibold transition shadow-md"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(course._id)
                          }
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-semibold transition shadow-md"
                        >
                          🗑️ Delete
                        </button>

                      </div>
                    )}

                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Courses;