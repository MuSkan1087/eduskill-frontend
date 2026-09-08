import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===============================
  // Make Admin
  // ===============================
  const handleMakeAdmin = async (userId, userName) => {
    const confirmPromote = window.confirm(
      `Are you sure you want to make ${userName} an admin?`
    );

    if (!confirmPromote) return;

    try {
      setPromoting(userId);

      const res = await api.put(`/users/${userId}/make-admin`);

      alert(res.data.message || "User promoted successfully");

      fetchUsers();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to promote user"
      );
    } finally {
      setPromoting(null);
    }
  };

  // ===============================
  // Remove Admin
  // ===============================
  const handleRemoveAdmin = async (userId, userName) => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove admin role from ${userName}?`
    );

    if (!confirmRemove) return;

    try {
      setPromoting(userId);

      const res = await api.put(`/users/${userId}/remove-admin`);

      alert(
        res.data.message ||
          "Admin role removed successfully"
      );

      fetchUsers();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to remove admin role"
      );
    } finally {
      setPromoting(null);
    }
  };

  // ===============================
  // Delete User
  // ===============================
  const handleDeleteUser = async (userId, userName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete ${userName}?`
    );

    if (!confirmDelete) return;

    try {
      setPromoting(userId);

      const res = await api.delete(`/users/${userId}`);

      alert(
        res.data.message ||
          "User deleted successfully"
      );

      fetchUsers();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete user"
      );
    } finally {
      setPromoting(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6">

            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
              Admin Panel
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Manage Users
            </h1>

            <p className="text-gray-600 mt-2">
              Manage registered users, admin privileges and user accounts.
            </p>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            {/* Total Users */}
            <div className="bg-white rounded-2xl shadow-lg p-5">

              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                {users.length}
              </h2>

            </div>

            {/* Students */}
            <div className="bg-white rounded-2xl shadow-lg p-5">

              <p className="text-gray-500 text-sm">
                Students
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-1">
                {
                  users.filter(
                    (user) => user.role === "student"
                  ).length
                }
              </h2>

            </div>

            {/* Admins */}
            <div className="bg-white rounded-2xl shadow-lg p-5">

              <p className="text-gray-500 text-sm">
                Admins
              </p>

              <h2 className="text-3xl font-bold text-purple-600 mt-1">
                {
                  users.filter(
                    (user) => user.role === "admin"
                  ).length
                }
              </h2>

            </div>

          </div>

          {/* Users */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="p-5 sm:p-6 border-b">

              <h2 className="text-xl font-bold text-gray-900">
                Registered Users
              </h2>

            </div>

            {loading ? (

              <div className="p-10 text-center">

                <p className="text-gray-600">
                  Loading users...
                </p>

              </div>

            ) : users.length === 0 ? (

              <div className="p-10 text-center">

                <p className="text-gray-600">
                  No users found.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                        User
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                        Email
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                        Role
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y">

                    {users.map((user) => (

                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition"
                      >

                        {/* User */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold">

                              {user.name
                                ?.charAt(0)
                                ?.toUpperCase()}

                            </div>

                            <div>

                              <p className="font-semibold text-gray-900">
                                {user.name}
                              </p>

                              <p className="text-xs text-gray-500">
                                User ID: {user._id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 text-gray-600">
                          {user.email}
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">

                          {user.role === "admin" ? (

                            <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                              Admin
                            </span>

                          ) : (

                            <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                              Student
                            </span>

                          )}

                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">

                          <div className="flex flex-wrap gap-2">

                            {user.role === "admin" ? (

                              <button
                                onClick={() =>
                                  handleRemoveAdmin(
                                    user._id,
                                    user.name
                                  )
                                }
                                disabled={
                                  promoting === user._id
                                }
                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                              >
                                {promoting === user._id
                                  ? "Processing..."
                                  : "Remove Admin"}
                              </button>

                            ) : (

                              <button
                                onClick={() =>
                                  handleMakeAdmin(
                                    user._id,
                                    user.name
                                  )
                                }
                                disabled={
                                  promoting === user._id
                                }
                                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                              >
                                {promoting === user._id
                                  ? "Processing..."
                                  : "Make Admin"}
                              </button>

                            )}

                            {/* Delete */}
                            <button
                              onClick={() =>
                                handleDeleteUser(
                                  user._id,
                                  user.name
                                )
                              }
                              disabled={
                                promoting === user._id
                              }
                              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                            >
                              {promoting === user._id
                                ? "Processing..."
                                : "Delete"}
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>
      </div>
    </>
  );
}

export default ManageUsers;