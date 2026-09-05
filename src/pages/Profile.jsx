import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaShieldAlt,
  FaCalendarAlt,
  FaIdCard,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data);
      } catch (err) {
        console.log(err);

        alert(
          err.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-slate-600 font-medium">
              Loading profile...
            </p>
          </div>
        </div>
      </>
    );
  }

  // Profile not found
  if (!user) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 text-center">
            <div className="text-5xl mb-4">👤</div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Profile Not Found
            </h2>

            <p className="text-slate-500">
              We couldn't load your profile information.
            </p>
          </div>
        </div>
      </>
    );
  }

  const initials =
    user.name?.charAt(0).toUpperCase() || "U";

  const enrolledCount =
    user.enrolledCourses?.length || 0;

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "N/A";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* Hero */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="flex items-center gap-3 text-white/80 text-sm font-medium mb-5">
              <FaUser />
              <span>My Account</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Profile
            </h1>

            <p className="text-white/85 text-base sm:text-lg max-w-2xl">
              Manage your account information and view your
              learning details.
            </p>

          </div>
        </section>

        {/* Main */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Profile Header Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-7">

            {/* Top Gradient */}
            <div className="h-28 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600"></div>

            <div className="px-6 sm:px-10 pb-8">

              <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14">

                {/* Avatar */}
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-5xl font-bold border-8 border-white shadow-lg">
                  {initials}
                </div>

                {/* User Info */}
                <div className="flex-1 pb-1">

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {user.name}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {user.email}
                  </p>

                </div>

                {/* Role */}
                <div className="pb-1">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm capitalize">
                    <FaShieldAlt />
                    {user.role}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">

            {/* Courses */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400 font-medium">
                    Enrolled Courses
                  </p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {enrolledCount}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                  <FaBookOpen />
                </div>

              </div>
            </div>

            {/* Role */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400 font-medium">
                    Account Role
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-3 capitalize">
                    {user.role}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  <FaShieldAlt />
                </div>

              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400 font-medium">
                    Account Status
                  </p>

                  <h3 className="text-xl font-bold text-green-600 mt-3">
                    Active
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>
            </div>

          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-7">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FaUser />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Personal Information
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Your basic account details
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Name */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">

                <div className="flex items-center gap-3 mb-3">
                  <FaUser className="text-indigo-600" />

                  <p className="text-sm text-slate-400 font-medium">
                    Full Name
                  </p>
                </div>

                <p className="text-lg font-bold text-slate-800">
                  {user.name}
                </p>

              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">

                <div className="flex items-center gap-3 mb-3">
                  <FaEnvelope className="text-purple-600" />

                  <p className="text-sm text-slate-400 font-medium">
                    Email Address
                  </p>
                </div>

                <p className="text-lg font-bold text-slate-800 break-all">
                  {user.email}
                </p>

              </div>

              {/* Role */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">

                <div className="flex items-center gap-3 mb-3">
                  <FaGraduationCap className="text-violet-600" />

                  <p className="text-sm text-slate-400 font-medium">
                    Account Role
                  </p>
                </div>

                <p className="text-lg font-bold text-slate-800 capitalize">
                  {user.role}
                </p>

              </div>

              {/* Courses */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">

                <div className="flex items-center gap-3 mb-3">
                  <FaBookOpen className="text-green-600" />

                  <p className="text-sm text-slate-400 font-medium">
                    Enrolled Courses
                  </p>
                </div>

                <p className="text-lg font-bold text-slate-800">
                  {enrolledCount}
                </p>

              </div>

            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-7">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FaIdCard />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Account Information
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Details about your EntreSkill Hub account
                </p>
              </div>

            </div>

            <div className="space-y-0">

              {/* Status */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-5 border-b border-slate-100">

                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-green-600" />

                  <span className="text-slate-500">
                    Account Status
                  </span>
                </div>

                <span className="text-green-600 font-bold">
                  ● Active
                </span>

              </div>

              {/* User ID */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-5 border-b border-slate-100">

                <div className="flex items-center gap-3">
                  <FaIdCard className="text-indigo-600" />

                  <span className="text-slate-500">
                    User ID
                  </span>
                </div>

                <span className="font-medium text-slate-700 text-sm break-all sm:text-right max-w-md">
                  {user._id}
                </span>

              </div>

              {/* Member Since */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-5">

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-purple-600" />

                  <span className="text-slate-500">
                    Member Since
                  </span>
                </div>

                <span className="font-semibold text-slate-700">
                  {memberSince}
                </span>

              </div>

            </div>
          </div>

          {/* Learning CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-7 sm:p-8 text-white">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              <div>

                <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-2">
                  Keep Learning
                </p>

                <h2 className="text-2xl font-bold mb-2">
                  Continue your learning journey 🚀
                </h2>

                <p className="text-white/80 text-sm">
                  Explore more courses and build new skills.
                </p>

              </div>

              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-xl font-bold transition whitespace-nowrap"
              >
                Browse Courses
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>
      </main>
    </>
  );
}

export default Profile;