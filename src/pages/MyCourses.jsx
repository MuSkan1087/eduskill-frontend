import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  FaClock,
  FaLayerGroup,
  FaSignal,
  FaCheckCircle,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingCourse, setUpdatingCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, progressRes] = await Promise.all([
          api.get("/users/mycourses"),
          api.get("/users/progress"),
        ]);

        setCourses(coursesRes.data);
        setProgressData(progressRes.data);
      } catch (err) {
        console.log(err);

        alert(
          err.response?.data?.message ||
            "Failed to load your courses"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get progress of a particular course
  const getProgress = (courseId) => {
    const item = progressData.find(
      (item) =>
        item.course?._id === courseId ||
        item.course === courseId
    );

    return item ? item.progress : 0;
  };

  // Update Course Progress
  const updateCourseProgress = async (courseId, newProgress) => {
    try {
      setUpdatingCourse(courseId);

      const res = await api.put(
        `/users/progress/${courseId}`,
        {
          progress: newProgress,
        }
      );

      setProgressData((prev) =>
        prev.map((item) =>
          item.course?._id === courseId ||
          item.course === courseId
            ? {
                ...item,
                progress: res.data.progress,
              }
            : item
        )
      );

      alert("Progress updated successfully");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to update progress"
      );
    } finally {
      setUpdatingCourse(null);
    }
  };

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-slate-600 font-medium">
              Loading your courses...
            </p>
          </div>
        </div>
      </>
    );
  }

  // Stats
  const completedCourses = courses.filter(
    (course) => getProgress(course._id) === 100
  ).length;

  const inProgressCourses = courses.filter((course) => {
    const progress = getProgress(course._id);
    return progress > 0 && progress < 100;
  }).length;

  const overallProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (total, course) =>
              total + getProgress(course._id),
            0
          ) / courses.length
        )
      : 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* Hero */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="flex items-center gap-3 text-white/80 text-sm font-medium mb-5">
              <FaBookOpen />
              <span>My Learning</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              My Courses
            </h1>

            <p className="text-white/85 text-base sm:text-lg max-w-2xl">
              Track your learning journey, continue your courses,
              and build your skills step by step.
            </p>

          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Stats */}
          {courses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

              {/* Total */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">
                      Enrolled Courses
                    </p>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                      {courses.length}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                    <FaBookOpen />
                  </div>
                </div>
              </div>

              {/* In Progress */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">
                      In Progress
                    </p>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                      {inProgressCourses}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-xl">
                    📖
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">
                      Completed
                    </p>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                      {completedCourses}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
                    <FaCheckCircle />
                  </div>
                </div>
              </div>

              {/* Overall */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">
                      Overall Progress
                    </p>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                      {overallProgress}%
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                    🚀
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* No Courses */}
          {courses.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 sm:p-16 text-center">

              <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-4xl mx-auto mb-6">
                📚
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                No Courses Yet
              </h2>

              <p className="text-slate-500 max-w-md mx-auto mb-7">
                You haven't enrolled in any course yet.
                Explore our courses and start your learning journey.
              </p>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-all"
              >
                Browse Courses
                <FaArrowRight className="text-sm" />
              </Link>

            </div>
          ) : (

            <>
              {/* Section Heading */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">

                <div>
                  <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mb-1">
                    Your Learning
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Continue Learning
                  </h2>
                </div>

                <Link
                  to="/courses"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm inline-flex items-center gap-2"
                >
                  Browse More Courses
                  <FaArrowRight />
                </Link>

              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                {courses.map((course) => {
                  const progress = getProgress(course._id);
                  const isUpdating =
                    updatingCourse === course._id;

                  return (
                    <div
                      key={course._id}
                      className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >

                      {/* Image */}
                      <div className="relative overflow-hidden">

                        {course.image ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling.style.display =
                                "flex";
                            }}
                            className="w-full h-52 object-cover"
                          />
                        ) : null}

                        <div
                          className={`w-full h-52 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 items-center justify-center ${
                            course.image ? "hidden" : "flex"
                          }`}
                        >
                          <div className="text-center text-white">
                            <div className="text-5xl mb-2">
                              🚀
                            </div>
                            <p className="font-bold text-lg">
                              {course.title}
                            </p>
                          </div>
                        </div>

                        {/* Level */}
                        <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 text-indigo-700 text-xs font-bold shadow-sm">
                          {course.level}
                        </span>

                      </div>

                      {/* Content */}
                      <div className="p-6">

                        <div className="mb-4">
                          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                            {course.category}
                          </span>

                          <h2 className="text-xl font-bold text-slate-900 mt-2 line-clamp-2">
                            {course.title}
                          </h2>

                          <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-6">
                            {course.description}
                          </p>
                        </div>

                        {/* Course Info */}
                        <div className="grid grid-cols-2 gap-3 mb-5">

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <FaClock className="text-indigo-600" />
                            <span>{course.duration}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <FaSignal className="text-purple-600" />
                            <span>{course.level}</span>
                          </div>

                        </div>

                        {/* Progress */}
                        <div className="mb-5">

                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-700">
                              Learning Progress
                            </span>

                            <span
                              className={`text-sm font-bold ${
                                progress === 100
                                  ? "text-green-600"
                                  : "text-indigo-600"
                              }`}
                            >
                              {progress}%
                            </span>
                          </div>

                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">

                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                progress === 100
                                  ? "bg-green-500"
                                  : "bg-gradient-to-r from-indigo-500 to-purple-600"
                              }`}
                              style={{
                                width: `${progress}%`,
                              }}
                            ></div>

                          </div>

                        </div>

                        {/* Progress Buttons */}
                        {progress < 100 && (
                          <div className="grid grid-cols-4 gap-2 mb-5">

                            {[25, 50, 75, 100].map((value) => (
                              <button
                                key={value}
                                disabled={isUpdating}
                                onClick={() =>
                                  updateCourseProgress(
                                    course._id,
                                    value
                                  )
                                }
                                className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                                  value === 100
                                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                } ${
                                  isUpdating
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                {value}%
                              </button>
                            ))}

                          </div>
                        )}

                        {/* Status */}
                        <div className="mb-5">

                          {progress === 100 ? (
                            <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                              <FaCheckCircle />
                              Course Completed
                            </div>
                          ) : progress > 0 ? (
                            <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                              📖
                              <span>Continue Learning</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                              🚀
                              <span>Not Started</span>
                            </div>
                          )}

                        </div>

                        {/* View Course */}
                        <Link
                          to={`/courses/${course._id}`}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
                        >
                          View Course
                          <FaArrowRight className="text-sm" />
                        </Link>

                      </div>
                    </div>
                  );
                })}

              </div>
            </>
          )}

        </section>

      </main>
    </>
  );
}

export default MyCourses;