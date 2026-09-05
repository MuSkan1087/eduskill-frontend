import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { FaClock, FaLayerGroup, FaSignal, FaCheckCircle } from "react-icons/fa";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // Fetch Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.log(err);
        alert("Course load nahi hua");
      }
    };

    fetchCourse();
  }, [id]);

  // Enroll Course
  const handleEnroll = async () => {
    try {
      setEnrolling(true);

      const res = await api.post(`/courses/${id}/enroll`);

      alert(res.data.message || "Enrolled successfully");

      setEnrolled(true);
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);

      const message =
        err.response?.data?.message || "Enrollment failed";

      alert(message);

      if (message.toLowerCase().includes("already enrolled")) {
        setEnrolled(true);
      }
    } finally {
      setEnrolling(false);
    }
  };

  // Loading
  if (!course) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-slate-600 font-medium">
              Loading course...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* Hero Header */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-8 transition"
            >
              ← Back to Courses
            </Link>

            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-semibold backdrop-blur-sm mb-5">
                {course.category}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                {course.title}
              </h1>

              <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div>

          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Course Image */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                <div className="relative overflow-hidden">

                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                      className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
                    />
                  ) : null}

                  {/* Fallback */}
                  <div
                    className={`w-full h-64 sm:h-80 lg:h-[420px] bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 items-center justify-center ${course.image ? "hidden" : "flex"
                      }`}
                  >
                    <div className="text-center text-white">
                      <div className="text-7xl mb-4">🚀</div>

                      <h3 className="text-2xl font-bold">
                        {course.title}
                      </h3>

                      <p className="text-white/80 mt-2">
                        Learn • Build • Grow
                      </p>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-indigo-700 text-sm font-bold shadow-md">
                      {course.level}
                    </span>
                  </div>

                </div>

                <div className="p-6 sm:p-8">

                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    About This Course
                  </h2>

                  <p className="text-slate-600 leading-7 text-base">
                    {course.description}
                  </p>

                </div>
              </div>

              {/* Course Information */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">

                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Course Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">

                  {/* Category */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-indigo-50">
                    <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                      <FaLayerGroup />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Category
                      </p>

                      <p className="font-bold text-slate-800 mt-1">
                        {course.category}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-purple-50">
                    <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                      <FaClock />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Duration
                      </p>

                      <p className="font-bold text-slate-800 mt-1">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-violet-50">
                    <div className="w-11 h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center">
                      <FaSignal />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Skill Level
                      </p>

                      <p className="font-bold text-slate-800 mt-1">
                        {course.level}
                      </p>
                    </div>
                  </div>

                  {/* Certificate */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-green-50">
                    <div className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Learning
                      </p>

                      <p className="font-bold text-slate-800 mt-1">
                        Practical Skills
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Enrollment Card */}
            <div className="lg:sticky lg:top-24">

              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                {/* Price Header */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-7">

                  <p className="text-slate-400 text-sm font-medium mb-2">
                    Course Price
                  </p>

                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">
                      ₹{course.price}
                    </span>

                    <span className="text-slate-400 text-sm mb-1">
                      one-time
                    </span>
                  </div>

                </div>

                {/* Enrollment Content */}
                <div className="p-6">

                  <div className="space-y-4 mb-6">

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">
                        Course
                      </span>

                      <span className="font-semibold text-slate-800 text-right max-w-[180px]">
                        {course.title}
                      </span>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">
                        Level
                      </span>

                      <span className="font-semibold text-slate-800">
                        {course.level}
                      </span>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">
                        Duration
                      </span>

                      <span className="font-semibold text-slate-800">
                        {course.duration}
                      </span>
                    </div>

                  </div>

                  {/* Enroll Button */}
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling || enrolled}
                    className={`w-full py-3.5 rounded-xl text-white font-bold transition-all duration-200 shadow-sm ${enrolled
                        ? "bg-green-600"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-lg"
                      }`}
                  >
                    {enrolling
                      ? "Enrolling..."
                      : enrolled
                        ? "✓ Enrolled"
                        : "Enroll Now"}
                  </button>

                  {/* Go To My Courses */}
                  {enrolled && (
                    <button
                      onClick={() => navigate("/mycourses")}
                      className="w-full mt-3 bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 rounded-xl font-bold transition"
                    >
                      Go to My Courses →
                    </button>
                  )}

                  <p className="text-center text-xs text-slate-400 mt-5">
                    Start learning and build your skills today 🚀
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default CourseDetails;