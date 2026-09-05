import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const { name, email, password, role } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/register", formData);

      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-12 text-white flex-col justify-between">

          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/10 rounded-full"></div>

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-16">

              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                🚀
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  EntreSkill Hub
                </h1>

                <p className="text-sm text-white/70">
                  Learn • Build • Grow
                </p>
              </div>

            </div>


            {/* Main Heading */}
            <h2 className="text-5xl font-bold leading-tight max-w-lg">

              Start Your
              <span className="block text-white/80">
                Learning Journey.
              </span>

            </h2>

            <p className="mt-6 text-lg text-white/75 max-w-md leading-relaxed">
              Join EntreSkill Hub and discover the skills,
              courses and opportunities that can shape your future.
            </p>


            {/* Features */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  📚
                </div>

                <div>
                  <h3 className="font-semibold">
                    Explore Courses
                  </h3>

                  <p className="text-sm text-white/65">
                    Learn skills that matter
                  </p>
                </div>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  🎯
                </div>

                <div>
                  <h3 className="font-semibold">
                    Track Your Progress
                  </h3>

                  <p className="text-sm text-white/65">
                    Stay focused on your goals
                  </p>
                </div>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  🚀
                </div>

                <div>
                  <h3 className="font-semibold">
                    Grow Your Career
                  </h3>

                  <p className="text-sm text-white/65">
                    Turn skills into opportunities
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Footer */}
          <div className="relative z-10 text-sm text-white/60">
            © 2026 EntreSkill Hub. Learn today. Grow tomorrow.
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-8">

              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-xl">
                🚀
              </div>

              <h1 className="text-xl font-bold text-slate-800">
                EntreSkill Hub
              </h1>

            </div>


            {/* Heading */}
            <div className="mb-7">

              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Get Started
              </p>

              <h2 className="text-4xl font-bold text-slate-900">
                Create your account
              </h2>

              <p className="text-slate-500 mt-3">
                Join our learning community and start growing today.
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="space-y-4"
              autoComplete="off"
            >

              {/* Full Name */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    👤
                  </span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={onChange}
                    autoComplete="off"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                  />

                </div>

              </div>


              {/* Email */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    ✉
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    🔒
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    className="w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>


              {/* Role */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Account Type
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                    🎓
                  </span>

                  <select
                    name="role"
                    value={role}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition appearance-none cursor-pointer"
                  >
                    <option value="student">
                      Student
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    ▼
                  </span>

                </div>

              </div>


              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Account
              </button>

            </form>


            {/* Login */}
            <div className="flex items-center gap-3 my-6">

              <div className="h-px bg-slate-200 flex-1"></div>

              <span className="text-xs text-slate-400">
                OR
              </span>

              <div className="h-px bg-slate-200 flex-1"></div>

            </div>


            <p className="text-center text-slate-500">

              Already have an account?

              <Link
                to="/"
                className="text-indigo-600 font-bold ml-2 hover:text-purple-600 transition"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;