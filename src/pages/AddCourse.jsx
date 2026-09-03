import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AddCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setImageError(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Extra validation
    if (!formData.title.trim()) {
      alert("Please enter course title");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter course description");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter course category");
      return;
    }

    if (!formData.duration.trim()) {
      alert("Please enter course duration");
      return;
    }

    if (!formData.level) {
      alert("Please select course level");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      alert("Please enter a valid price");
      return;
    }

    try {
      setLoading(true);

      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        duration: formData.duration.trim(),
        level: formData.level,
        price: Number(formData.price),
        image: formData.image.trim(),
      };

      console.log("SENDING COURSE DATA:", courseData);

      await api.post("/courses", courseData);

      alert("Course Added Successfully 🎉");

      navigate("/courses");
    } catch (err) {
      console.log("ERROR:", err);
      console.log("BACKEND RESPONSE:", err.response?.data);

      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to add course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-10">

        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center text-white mb-8">

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              ➕ Add New Course
            </h1>

            <p className="text-white/90 text-lg">
              Create a new learning course for students.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={submitHandler}
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
                value={formData.title}
                placeholder="e.g. MERN Stack Development"
                onChange={handleChange}
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
                value={formData.description}
                placeholder="Enter course description..."
                onChange={handleChange}
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
                value={formData.category}
                placeholder="e.g. Web Development"
                onChange={handleChange}
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
                value={formData.duration}
                placeholder="e.g. 3 Months"
                onChange={handleChange}
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
                value={formData.level}
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
                value={formData.price}
                placeholder="e.g. 4999"
                min="0"
                onChange={handleChange}
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
                value={formData.image}
                placeholder="https://example.com/course-image.jpg"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Image Preview */}
            {formData.image && !imageError && (
              <div className="mb-6">

                <p className="font-semibold text-gray-700 mb-2">
                  Image Preview
                </p>

                <img
                  src={formData.image}
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
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
              >
                {loading
                  ? "Adding Course..."
                  : "➕ Add Course"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/courses")}
                disabled={loading}
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

export default AddCourse;