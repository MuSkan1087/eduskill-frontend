import { Link } from "react-router-dom";
import { FaClock, FaStar } from "react-icons/fa";
import { useState } from "react";
import api from "../services/api";

function CourseCard({ course }) {
  const [loading, setLoading] = useState(false);

  // Backend se status aayega
  const [enrolled, setEnrolled] = useState(course.isEnrolled || false);

  const enrollCourse = async () => {
    try {
      setLoading(true);

      const res = await api.post(`/courses/${course._id}/enroll`);

      alert(res.data.message);

      setEnrolled(true);
    } catch (err) {
      if (err.response?.data?.message === "Already enrolled in this course") {
        setEnrolled(true);
      }

      alert(err.response?.data?.message || "Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={course.image || "https://via.placeholder.com/400x220?text=Course"}
        alt={course.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-3">
          {course.title}
        </h2>

        <p className="text-gray-600 mb-5">
          {course.description}
        </p>

        <div className="flex justify-between text-gray-600 mb-4">

          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span>{course.duration || "8 Weeks"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span>{course.rating || "4.8"}</span>
          </div>

        </div>

        <h3 className="text-2xl font-bold text-green-600 mb-5">
          ₹{course.price || 4999}
        </h3>

        <div className="flex gap-3">

          <Link to={`/courses/${course._id}`} className="flex-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
              View Details
            </button>
          </Link>

          <button
            onClick={enrollCourse}
            disabled={loading || enrolled}
            className={`flex-1 py-3 rounded-xl text-white font-semibold ${
              enrolled
                ? "bg-green-600"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading
              ? "Enrolling..."
              : enrolled
              ? "Enrolled ✓"
              : "Enroll Now"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default CourseCard;