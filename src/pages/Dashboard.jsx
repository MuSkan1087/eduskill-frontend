import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalMentors: 0,
    totalEnrollments: 0,
  });
  const [courseEnrollmentStats, setCourseEnrollmentStats] = useState([]);

  const userName = localStorage.getItem("name") || "Student";
  const role = localStorage.getItem("role") || "student";

  // ===============================
  // Fetch Dashboard Data
  // ===============================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const coursesRes = await api.get("/courses");

        setCourses(coursesRes.data);
        if (role === "admin") {
          const [usersRes, statsRes, enrollmentRes] = await Promise.all([
            api.get("/users"),
            api.get("/users/admin-stats"),
            api.get("/users/course-enrollment-stats"),
          ]);

          setUsers(usersRes.data);
          setAdminStats(statsRes.data);
          setCourseEnrollmentStats(enrollmentRes.data);
          // You can also set enrollment stats if needed
          // setEnrollmentStats(enrollmentStatsRes.data);
        }

        else {
          const [myCoursesRes, progressRes] =
            await Promise.all([
              api.get("/users/mycourses"),
              api.get("/users/progress"),
            ]);

          setProgressData(progressRes.data);

          localStorage.setItem(
            "myCoursesCount",
            myCoursesRes.data.length
          );
        }
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
  }, [role]);

  // ===============================
  // Student Statistics
  // ===============================
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

  // ===============================
  // Admin Statistics
  // ===============================
  const studentCount = users.filter(
    (user) => user.role === "student"
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "admin"
  ).length;

  const recentUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const recentCourses = [...courses]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  // ===============================
  // Chart Data
  // ===============================

  const userChartData = [
    {
      name: "Students",
      value: adminStats.totalStudents,
    },
    {
      name: "Admins",
      value: adminStats.totalAdmins,
    },
  ];

  const courseChartData = courseEnrollmentStats.map((course) => ({
    name: course.title,
    enrollments: course.enrollments,
  }));

  // ===============================
  // Loading
  // ===============================
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
              Preparing your dashboard
            </p>

          </div>
        </div>
      </>
    );
  }

  // =========================================================
  // ADMIN DASHBOARD
  // =========================================================
  if (role === "admin") {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* ================= HERO ================= */}

            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white p-7 sm:p-10 mb-8 shadow-xl">

              <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/10"></div>

              <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10"></div>

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                <div>

                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm mb-5">
                    <span>👑</span>
                    <span>Admin Dashboard</span>
                  </div>

                  <p className="text-white/75 font-medium mb-2">
                    Welcome back 👋
                  </p>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Hello, {userName}!
                  </h1>

                  <p className="mt-4 text-white/75 text-base sm:text-lg max-w-xl leading-relaxed">
                    Manage users, courses and platform activity
                    from your admin dashboard.
                  </p>

                </div>

                {/* Admin Profile */}

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 min-w-[220px]">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg">
                      {userName.charAt(0).toUpperCase()}
                    </div>

                    <div>

                      <p className="font-bold text-lg">
                        {userName}
                      </p>

                      <p className="text-white/70 text-sm">
                        Administrator
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* ================= STATISTICS ================= */}

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  gap-5 mb-8">

              {/* Total Users */}

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                    👥
                  </div>

                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Users
                  </span>

                </div>

                <p className="text-slate-500 mt-5 text-sm font-medium">
                  Total Users
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  {users.length}
                </h2>

              </div>

              {/* Students */}

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                    🎓
                  </div>

                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Students
                  </span>

                </div>

                <p className="text-slate-500 mt-5 text-sm font-medium">
                  Total Students
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  {studentCount}
                </h2>

              </div>

              {/* Admins */}

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                    👑
                  </div>

                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    Admins
                  </span>

                </div>

                <p className="text-slate-500 mt-5 text-sm font-medium">
                  Total Admins
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  {adminCount}
                </h2>

              </div>
              
              {/* Courses */}

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
                    📚
                  </div>

                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    Courses
                  </span>

                </div>

                <p className="text-slate-500 mt-5 text-sm font-medium">
                  Total Courses
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  {courses.length}
                </h2>

              </div>
              {/* Total Enrollments */}

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">
                    🎯
                  </div>

                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Enrollments
                  </span>

                </div>

                <p className="text-slate-500 mt-5 text-sm font-medium">
                  Total Enrollments
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  {adminStats.totalEnrollments}
                </h2>

              </div>

            </section>

            {/* ================= QUICK ACTIONS ================= */}

            <section className="mb-8">

              <div className="mb-5">

                <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                  Admin Controls
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Manage Platform
                </h2>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Manage Users */}

                <Link
                  to="/manage-users"
                  className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                      👥
                    </div>

                    <span className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition">
                      →
                    </span>

                  </div>
                  ha
                  <h3 className="text-lg font-bold text-slate-900 mt-5">
                    Manage Users
                  </h3>

                  <p className="text-slate-500 text-sm mt-2">
                    View users, promote admins, remove admin
                    roles and delete accounts.
                  </p>

                </Link>

                {/* Add Course */}

                <Link
                  to="/add-course"
                  className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                      ➕
                    </div>

                    <span className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition">
                      →
                    </span>

                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-5">
                    Add Course
                  </h3>

                  <p className="text-slate-500 text-sm mt-2">
                    Create and publish a new course on the
                    platform.
                  </p>

                </Link>

                {/* Manage Courses */}

                <Link
                  to="/courses"
                  className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
                      📚
                    </div>

                    <span className="text-slate-300 group-hover:text-orange-600 group-hover:translate-x-1 transition">
                      →
                    </span>

                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-5">
                    Manage Courses
                  </h3>

                  <p className="text-slate-500 text-sm mt-2">
                    View, edit and manage all available courses.
                  </p>

                </Link>

              </div>

            </section>

            {/* ================= ANALYTICS ================= */}

            <section className="mb-8">

              <div className="mb-5">
                <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                  Analytics
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Platform Overview
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Quick insights about your platform activity.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Distribution */}

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

                  <div className="flex items-center justify-between mb-6">

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        User Distribution
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Students and administrators
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                      👥
                    </div>

                  </div>

                  {/* Pie Chart */}

                  <div className="h-72">

                    <ResponsiveContainer width="100%" height="100%">

                      <PieChart>

                        <Pie
                          data={userChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label
                        >

                          <Cell fill="#6366f1" />
                          <Cell fill="#8b5cf6" />

                        </Pie>

                        <Tooltip />

                        <Legend />

                      </PieChart>

                    </ResponsiveContainer>

                  </div>

                </div>
                
              </div>


              {/* Course & Enrollment Overview */}

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Course & Enrollment Overview
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Learning activity on the platform
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
                    📊
                  </div>
                </div>

                {/* Courses */}

                <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 mb-4">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                      📚
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Available Courses
                      </p>

                      <p className="text-xs text-slate-500">
                        Total published courses
                      </p>
                    </div>
                  </div>

                  <span className="text-2xl font-bold text-orange-600">
                    {courses.length}
                  </span>

                </div>


                {/* Enrollments */}

                <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                      🎯
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Total Enrollments
                      </p>

                      <p className="text-xs text-slate-500">
                        Students enrolled in courses
                      </p>
                    </div>
                  </div>

                  <span className="text-2xl font-bold text-emerald-600">
                    {adminStats.totalEnrollments}
                  </span>

                </div>

              </div>



            </section>

            {/* ================= COURSE ENROLLMENT ANALYTICS ================= */}

            <section className="mb-8">

              <div className="mb-5">

                <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                  Course Analytics
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Course Enrollment Performance
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  See how many students are enrolled in each course.
                </p>

              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

                {courseEnrollmentStats.length === 0 ? (

                  <div className="text-center py-10">

                    <div className="text-4xl mb-3">
                      📚
                    </div>

                    <p className="text-slate-500">
                      No course enrollments yet.
                    </p>

                  </div>

                ) : (

                  <div className="w-full h-80">

                    <ResponsiveContainer width="100%" height="100%">

                      <BarChart
                        data={courseChartData}
                        margin={{
                          top: 20,
                          right: 20,
                          left: 0,
                          bottom: 20,
                        }}
                      >

                        <CartesianGrid strokeDasharray="3 3" />


                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12 }}
                          angle={-25}
                          textAnchor="end"
                          height={70}
                          interval={0}
                          tickFormatter={(value) =>
                            value.length > 18 ? value.substring(0, 18) + "..." : value
                          }
                        />

                        <YAxis
                          allowDecimals={false}
                        />

                        <Tooltip
                          cursor={{ fill: "transparent" }}
                        />

                        

                        <Bar
                          dataKey="enrollments"
                          fill="#6366f1"
                          radius={[10, 10, 0, 0]}
                          label={{
                            position: "top",
                            fill: "#1e293b",
                            fontSize: 13,
                          }}
                        />

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                )}

              </div>

            </section>



            {/* ================= RECENT DATA ================= */}

            <section className="grid lg:grid-cols-2 gap-6">

              {/* Recent Users */}

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

                <div className="p-6 border-b flex items-center justify-between">

                  <div>

                    <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
                      Users
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      Recent Users
                    </h2>

                  </div>

                  <Link
                    to="/manage-users"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View All →
                  </Link>

                </div>

                <div className="divide-y">

                  {recentUsers.length === 0 ? (

                    <div className="p-6 text-center text-slate-500">
                      No users found.
                    </div>

                  ) : (

                    recentUsers.map((user) => (

                      <div
                        key={user._id}
                        className="p-5 flex items-center justify-between gap-4"
                      >

                        <div className="flex items-center gap-3 min-w-0">

                          <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div className="min-w-0">

                            <p className="font-semibold text-slate-900 truncate">
                              {user.name}
                            </p>

                            <p className="text-sm text-slate-500 truncate">
                              {user.email}
                            </p>

                          </div>

                        </div>

                        {user.role === "admin" ? (

                          <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                            Admin
                          </span>

                        ) : (

                          <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                            Student
                          </span>

                        )}

                      </div>

                    ))

                  )}

                </div>

              </div>

              {/* Recent Courses */}

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

                <div className="p-6 border-b flex items-center justify-between">

                  <div>

                    <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                      Courses
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      Recent Courses
                    </h2>

                  </div>

                  <Link
                    to="/courses"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View All →
                  </Link>

                </div>

                <div className="divide-y">

                  {recentCourses.length === 0 ? (

                    <div className="p-6 text-center text-slate-500">
                      No courses found.
                    </div>

                  ) : (

                    recentCourses.map((course) => (

                      <div
                        key={course._id}
                        className="p-5 flex items-center justify-between gap-4"
                      >

                        <div className="min-w-0">

                          <p className="font-semibold text-slate-900 truncate">
                            {course.title}
                          </p>

                          <p className="text-sm text-slate-500 truncate">
                            {course.category} • {course.level}
                          </p>

                        </div>

                        <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          Course
                        </span>

                      </div>

                    ))

                  )}

                </div>

              </div>

            </section>

          </div >

        </main >
      </>
    );
  }

  // =========================================================
  // STUDENT DASHBOARD
  // =========================================================

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ================= HERO / WELCOME ================= */}

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white p-7 sm:p-10 mb-8 shadow-xl">

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

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

            {/* Enrolled Courses */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                  📚
                </div>

                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Learning
                </span>

              </div>

              <p className="text-slate-500 mt-5 text-sm font-medium">
                Enrolled Courses
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {enrolledCount}
              </h2>

            </div>


            {/* Completed Courses */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
                  ✅
                </div>

                <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Completed
                </span>

              </div>

              <p className="text-slate-500 mt-5 text-sm font-medium">
                Completed Courses
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {completedCount}
              </h2>

            </div>


            {/* Overall Progress */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                  📈
                </div>

                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Progress
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