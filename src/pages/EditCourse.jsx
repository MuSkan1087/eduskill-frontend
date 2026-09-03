import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fetch Existing Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category || "",
          duration: res.data.duration || "",
          level: res.data.level || "",
          price: res.data.price ?? "",
          image: res.data.image || "",
        });
      } catch (err) {
        console.log(err);

        alert(
          err.response?.data?.message ||
            "Course load nahi hua"
        );

        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setImageError(false);
    }
  };

  // Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.title.trim()) {
      alert("Please enter course title");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter course description");
      return;
    }

    if (!form.category.trim()) {
      alert("Please enter course category");
      return;
    }

    if (!form.duration.trim()) {
      alert("Please enter course duration");
      return;
    }

    if (!form.level) {
      alert("Please select course level");
      return;
    }

    if (form.price === "" || Number(form.price) < 0) {
      alert("Please enter a valid price");
      return;
    }

    try {
      setUpdating(true);

      const courseData = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        duration: form.duration.trim(),
        level: form.level,
        price: Number(form.price),
        image: form.image.trim(),
      };

      console.log("UPDATING COURSE:", courseData);

      await api.put(`/courses/${id}`, courseData);

      alert("Course updated successfully 🎉");

      navigate("/courses");
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update course"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-2xl font-bold">
            Loading Course...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-10">

        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center text-white mb-8">

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              ✏️ Edit Course
            </h1>

            <p className="text-white/90 text-lg">
              Update the course information below.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8"
          >

            {/* Course Title */}
            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Course Title *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Course Title"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Description */}
            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Course Description"
                rows="5"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Category */}
            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Category *
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Web Development"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Duration */}
            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Duration *
              </label>

              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 3 Months"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Level */}
            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Course Level *
              </label>

              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select Course Level
                </option>

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>
              </select>

            </div>

            {/* Price */}
            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Price (₹) *
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 4999"
                min="0"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Image URL */}
            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Course Image URL
              </label>

              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Image Preview */}
            {form.image && !imageError && (
              <div className="mb-6">

                <p className="font-semibold text-gray-700 mb-2">
                  Image Preview
                </p>

                <img
                  src={form.image}
                  alt="Course Preview"
                  onError={() => setImageError(true)}
                  className="w-full h-52 object-cover rounded-2xl border"
                />

              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
              >
                {updating
                  ? "Updating..."
                  : "💾 Update Course"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/courses")}
                disabled={updating}
                className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
              >
                ← Cancel
              </button>

            </div>

          </form>

        </div>

      </div>
    </>
  );
}

export default EditCourse;