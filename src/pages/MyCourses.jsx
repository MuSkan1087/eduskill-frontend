import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

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

      // Update UI
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

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-2xl font-bold">
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">

        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold mb-3">
              🎓 My Courses
            </h1>

            <p className="text-gray-600 text-lg">
              Track your enrolled courses and learning progress.
            </p>
          </div>

          {/* No Courses */}
          {courses.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

              <div className="text-6xl mb-5">
                📚
              </div>

              <h2 className="text-3xl font-bold mb-3">
                No Courses Yet
              </h2>

              <p className="text-gray-600 mb-6">
                You haven't enrolled in any course yet.
              </p>

              <Link
                to="/courses"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Browse Courses
              </Link>

            </div>
          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {courses.map((course) => {
                const progress = getProgress(course._id);
                const isUpdating =
                  updatingCourse === course._id;

                return (
                  <div
                    key={course._id}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                  >

                    {/* Image */}
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-5xl">
                        📚
                      </div>
                    )}

                    <div className="p-6">

                      {/* Course Title */}
                      <h2 className="text-2xl font-bold mb-3">
                        {course.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 mb-5">
                        {course.description}
                      </p>

                      {/* Course Info */}
                      <div className="space-y-2 text-gray-700 mb-5">

                        <p>
                          <strong>Category:</strong>{" "}
                          {course.category}
                        </p>

                        <p>
                          <strong>Duration:</strong>{" "}
                          {course.duration}
                        </p>

                        <p>
                          <strong>Level:</strong>{" "}
                          {course.level}
                        </p>

                      </div>

                      {/* Progress */}
                      <div className="mb-4">

                        <div className="flex justify-between mb-2">

                          <span className="font-semibold">
                            Progress
                          </span>

                          <span className="font-bold text-blue-600">
                            {progress}%
                          </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3">

                          <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{
                              width: `${progress}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                      {/* Progress Buttons */}
                      {progress < 100 && (
                        <div className="grid grid-cols-4 gap-2 mb-5">

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateCourseProgress(
                                course._id,
                                25
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold"
                          >
                            25%
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateCourseProgress(
                                course._id,
                                50
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold"
                          >
                            50%
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateCourseProgress(
                                course._id,
                                75
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold"
                          >
                            75%
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateCourseProgress(
                                course._id,
                                100
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold"
                          >
                            100%
                          </button>

                        </div>
                      )}

                      {/* Status */}
                      <div className="mb-5">

                        {progress === 100 ? (
                          <span className="text-green-600 font-semibold">
                            ✅ Course Completed
                          </span>
                        ) : progress > 0 ? (
                          <span className="text-orange-500 font-semibold">
                            📖 Continue Learning
                          </span>
                        ) : (
                          <span className="text-gray-500 font-semibold">
                            🚀 Not Started
                          </span>
                        )}

                      </div>

                      {/* View Course */}
                      <Link
                        to={`/courses/${course._id}`}
                        className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                      >
                        View Course
                      </Link>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default MyCourses;