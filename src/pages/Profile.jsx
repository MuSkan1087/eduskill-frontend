import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

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

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-2xl font-bold">
            Loading Profile...
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-xl font-semibold">
            Profile not found
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">

        <div className="max-w-4xl mx-auto">

          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center">

            <div className="w-28 h-28 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold mb-5">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-4xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {user.email}
            </p>

            <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold capitalize">
              {user.role}
            </span>

          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              👤 Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-gray-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">
                  Full Name
                </p>

                <p className="text-lg font-semibold mt-1">
                  {user.name}
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">
                  Email Address
                </p>

                <p className="text-lg font-semibold mt-1 break-all">
                  {user.email}
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">
                  Account Role
                </p>

                <p className="text-lg font-semibold mt-1 capitalize">
                  {user.role}
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">
                  Enrolled Courses
                </p>

                <p className="text-lg font-semibold mt-1">
                  {user.enrolledCourses?.length || 0}
                </p>
              </div>

            </div>

          </div>

          {/* Account Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              ⚙️ Account Information
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-500">
                  Account Status
                </span>

                <span className="text-green-600 font-semibold">
                  ● Active
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-500">
                  User ID
                </span>

                <span className="font-medium text-sm break-all ml-4">
                  {user._id}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  Member Since
                </span>

                <span className="font-medium">
                  {user.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;