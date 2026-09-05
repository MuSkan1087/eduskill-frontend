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

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

          <div className="text-center">

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-3xl shadow-lg animate-pulse">
              🚀
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Loading Dashboard...
            </h2>

            <p className="text-slate-500 mt-2">
              Preparing your learning journey
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ================= HERO / WELCOME ================= */}

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white p-7 sm:p-10 mb-8 shadow-xl">

            {/* Decorative circles */}

            <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/10"></div>

            <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div>

                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm mb-5">
                  <span>✨</span>
                  <span>Student Dashboard</span>
                </div>

                <p className="text-white/75 font-medium mb-2">
                  Welcome back 👋
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Hello, {userName}!
                </h1>

                <p className="mt-4 text-white/75 text-base sm:text-lg max-w-xl leading-relaxed">
                  Continue your learning journey, improve your skills
                  and move one step closer to your goals.
                </p>

              </div>


              {/* Profile Mini Card */}

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 min-w-[220px]">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {userName.charAt(0).toUpperCase()}
                  </div>

                  <div>

                    <p className="font-bold text-lg">
                      {userName}
                    </p>

                    <p className="text-white/70 text-sm capitalize">
                      {role}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* ================= STATISTICS ================= */}

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* Total Courses */}

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                  📚
                </div>

                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Available
                </span>

              </div>

              <p className="text-slate-500 mt-5 text-sm font-medium">
                Total Courses
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {courses.length}
              </h2>

            </div>


            {/* My Courses */}

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                  🎓
                </div>

                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Enrolled
                </span>

              </div>

              <p className="text-slate-500 mt-5 text-sm font-medium">
                My Courses
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {enrolledCount}
              </h2>

            </div>


            {/* Completed */}

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">
                  ✅
                </div>

                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Completed
                </span>

              </div>

              <p className="text-slate-500 mt-5 text-sm font-medium">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {completedCount}
              </h2>

            </div>


            {/* Progress */}

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
                  📈
                </div>

                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  Overall
                </span>

              </div>

              <p className="text-slate-500 mt-5 text-sm font-medium">
                Overall Progress
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {overallProgress}%
              </h2>

            </div>

          </section>


          {/* ================= PROGRESS + ACTION ================= */}

          <section className="grid lg:grid-cols-3 gap-6 mb-8">

            {/* Progress Card */}

            <div className="lg:col-span-2 bg-white rounded-3xl p-7 border border-slate-100 shadow-sm">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

                <div>

                  <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                    Your Journey
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Learning Progress
                  </h2>

                </div>

                <div className="text-3xl font-bold text-indigo-600">
                  {overallProgress}%
                </div>

              </div>


              {/* Progress bar */}

              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-700"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                ></div>

              </div>


              <div className="flex justify-between mt-3 text-sm">

                <span className="text-slate-500">
                  Overall completion
                </span>

                <span className="font-semibold text-slate-700">
                  {overallProgress}% completed
                </span>

              </div>


              {/* Progress message */}

              <div className="mt-7 rounded-2xl bg-indigo-50 p-5 flex items-start gap-4">

                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0">
                  🎯
                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Keep going!
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Every course you complete brings you closer
                    to your learning goals.
                  </p>

                </div>

              </div>

            </div>


            {/* Quick Start */}

            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-7">

              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-indigo-500/20"></div>

              <div className="relative z-10">

                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-2xl mb-6">
                  🚀
                </div>

                <h2 className="text-2xl font-bold">
                  Ready to learn?
                </h2>

                <p className="text-slate-400 mt-3 leading-relaxed">
                  Discover new courses and build skills that
                  can help shape your future.
                </p>

                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center w-full mt-7 bg-white text-slate-900 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition"
                >
                  Explore Courses
                  <span className="ml-2">
                    →
                  </span>
                </Link>

              </div>

            </div>

          </section>


          {/* ================= QUICK ACTIONS ================= */}

          <section>

            <div className="flex items-end justify-between mb-5">

              <div>

                <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                  Quick Access
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  What would you like to do?
                </h2>

              </div>

            </div>


            <div className="grid md:grid-cols-3 gap-5">

              {/* Browse Courses */}

              <Link
                to="/courses"
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                    🔍
                  </div>

                  <span className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition">
                    →
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  Browse Courses
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Explore available courses and find something
                  new to learn.
                </p>

              </Link>


              {/* My Learning */}

              <Link
                to="/mycourses"
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                    🎓
                  </div>

                  <span className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition">
                    →
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  My Learning
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Continue learning from your enrolled courses.
                </p>

              </Link>


              {/* Profile */}

              <Link
                to="/profile"
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">
                    👤
                  </div>

                  <span className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition">
                    →
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  My Profile
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  View and manage your profile information.
                </p>

              </Link>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}

export default Dashboard;