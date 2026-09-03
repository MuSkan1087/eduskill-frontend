import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = localStorage.getItem("name") || "Student";
  const role = localStorage.getItem("role") || "student";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [coursesRes, myCoursesRes, progressRes] =
          await Promise.all([
            api.get("/courses"),
            api.get("/users/mycourses"),
            api.get("/users/progress"),
          ]);

        setCourses(coursesRes.data);
        setProgressData(progressRes.data);

        // Save enrolled courses temporarily for dashboard
        localStorage.setItem(
          "myCoursesCount",
          myCoursesRes.data.length
        );
      } catch (err) {
        console.log(err);

        alert(
          err.response?.data?.message ||
            "Dashboard data load nahi hua"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const enrolledCount = Number(
    localStorage.getItem("myCoursesCount") || 0
  );

  const completedCount = progressData.filter(
    (item) => item.progress === 100
  ).length;

  const overallProgress =
    progressData.length > 0
      ? Math.round(
          progressData.reduce(
            (total, item) => total + item.progress,
            0
          ) / progressData.length
        )
      : 0;

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-2xl font-bold">
            Loading Dashboard...
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

          {/* Welcome */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

            <p className="text-blue-600 font-semibold mb-2">
              Welcome back 👋
            </p>

            <h1 className="text-4xl font-bold mb-3">
              Hello, {userName}!
            </h1>

            <p className="text-gray-600 text-lg">
              Continue your learning journey and improve your skills.
            </p>

            <div className="mt-4 inline-block bg-gray-100 px-4 py-2 rounded-full">
              Role: <strong>{role}</strong>
            </div>

          </div>

          {/* Statistics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Total Courses */}
            <div className="bg-white rounded-2xl shadow-xl p-6">

              <div className="text-4xl mb-3">
                📚
              </div>

              <p className="text-gray-500">
                Total Courses
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {courses.length}
              </h2>

            </div>

            {/* Enrolled */}
            <div className="bg-white rounded-2xl shadow-xl p-6">

              <div className="text-4xl mb-3">
                🎓
              </div>

              <p className="text-gray-500">
                My Courses
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {enrolledCount}
              </h2>

            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl shadow-xl p-6">

              <div className="text-4xl mb-3">
                ✅
              </div>

              <p className="text-gray-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {completedCount}
              </h2>

            </div>

            {/* Overall Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-6">

              <div className="text-4xl mb-3">
                📈
              </div>

              <p className="text-gray-500">
                Overall Progress
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {overallProgress}%
              </h2>

            </div>

          </div>

          {/* Learning Progress */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

            <h2 className="text-2xl font-bold mb-5">
              📊 Learning Progress
            </h2>

            <div className="w-full bg-gray-200 rounded-full h-5">

              <div
                className="bg-blue-600 h-5 rounded-full transition-all duration-500"
                style={{
                  width: `${overallProgress}%`,
                }}
              ></div>

            </div>

            <div className="flex justify-between mt-3 text-gray-600">
              <span>Overall Progress</span>

              <span className="font-bold">
                {overallProgress}%
              </span>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">

            <Link
              to="/courses"
              className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition"
            >
              <div className="text-4xl mb-3">
                🔍
              </div>

              <h3 className="text-xl font-bold">
                Browse Courses
              </h3>

              <p className="text-gray-600 mt-2">
                Explore available courses.
              </p>
            </Link>

            <Link
              to="/mycourses"
              className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition"
            >
              <div className="text-4xl mb-3">
                🎓
              </div>

              <h3 className="text-xl font-bold">
                My Learning
              </h3>

              <p className="text-gray-600 mt-2">
                Continue your enrolled courses.
              </p>
            </Link>

            <Link
              to="/profile"
              className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition"
            >
              <div className="text-4xl mb-3">
                👤
              </div>

              <h3 className="text-xl font-bold">
                My Profile
              </h3>

              <p className="text-gray-600 mt-2">
                View your profile information.
              </p>
            </Link>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;