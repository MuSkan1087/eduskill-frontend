import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
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

            {/* Main heading */}
            <h2 className="text-5xl font-bold leading-tight max-w-lg">
              Turn Your Skills
              <span className="block text-white/80">
                Into Your Future.
              </span>
            </h2>

            <p className="mt-6 text-lg text-white/75 max-w-md leading-relaxed">
              Learn new skills, explore opportunities and build
              your future with EntreSkill Hub.
            </p>

            {/* Feature cards */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  📚
                </div>

                <div>
                  <h3 className="font-semibold">
                    Learn New Skills
                  </h3>

                  <p className="text-sm text-white/65">
                    Explore courses designed for your growth
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
                    Keep your learning journey organized
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  🚀
                </div>

                <div>
                  <h3 className="font-semibold">
                    Build Your Future
                  </h3>

                  <p className="text-sm text-white/65">
                    Turn knowledge into real opportunities
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom text */}
          <div className="relative z-10 text-sm text-white/60">
            © 2026 EntreSkill Hub. Learn today. Grow tomorrow.
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-10">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-xl">
                🚀
              </div>

              <h1 className="text-xl font-bold text-slate-800">
                EntreSkill Hub
              </h1>
            </div>


            {/* Heading */}
            <div className="mb-8">

              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Welcome Back
              </p>

              <h2 className="text-4xl font-bold text-slate-900">
                Login to your account
              </h2>

              <p className="text-slate-500 mt-3">
                Continue your learning journey with us.
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              autoComplete="off"
            >

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
                    autoComplete="new-password"
                    value={form.email}
                    onChange={handleChange}
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
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
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


              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Login
              </button>

            </form>


            {/* Register */}
            <div className="flex items-center gap-3 my-7">
              <div className="h-px bg-slate-200 flex-1"></div>

              <span className="text-xs text-slate-400">
                OR
              </span>

              <div className="h-px bg-slate-200 flex-1"></div>
            </div>


            <p className="text-center text-slate-500">
              Don't have an account?
              <Link
                to="/register"
                className="text-indigo-600 font-bold ml-2 hover:text-purple-600 transition"
              >
                Create Account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;