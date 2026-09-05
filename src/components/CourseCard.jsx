import { Link } from "react-router-dom";
import { FaClock, FaStar, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import api from "../services/api";

function CourseCard({ course }) {
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(course.isEnrolled || false);

  const enrollCourse = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        `/courses/${course._id}/enroll`
      );

      alert(res.data.message);
      setEnrolled(true);

    } catch (err) {

      if (
        err.response?.data?.message ===
        "Already enrolled in this course"
      ) {
        setEnrolled(true);
      }

      alert(
        err.response?.data?.message ||
        "Enrollment failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      {/* Course Image */}
      <div className="relative overflow-hidden">

        <img
          src={
            course.image ||
            "https://via.placeholder.com/600x350?text=EntreSkill+Hub"
          }
          alt={course.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://via.placeholder.com/600x350?text=EntreSkill+Hub";
          }}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">

          <span className="bg-white/95 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {course.category || "Development"}
          </span>

        </div>

        {/* Level Badge */}
        <div className="absolute top-4 right-4">

          <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {course.level || "Beginner"}
          </span>

        </div>

      </div>


      {/* Content */}
      <div className="p-6">

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1 group-hover:text-purple-600 transition">
          {course.title}
        </h2>


        {/* Description */}
        <p className="text-gray-500 text-sm leading-6 mb-5 line-clamp-2">
          {course.description}
        </p>


        {/* Course Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-5">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <FaClock className="text-blue-600 text-sm" />
            </div>

            <span>
              {course.duration || "8 Weeks"}
            </span>

          </div>


          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
              <FaStar className="text-yellow-500 text-sm" />
            </div>

            <span className="font-medium text-gray-700">
              {course.rating || "4.8"}
            </span>

          </div>

        </div>


        {/* Divider */}
        <div className="border-t border-gray-100 mb-5"></div>


        {/* Price */}
        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-xs text-gray-400 mb-1">
              Course Price
            </p>

            <h3 className="text-2xl font-bold text-slate-900">
              ₹{course.price || 4999}
            </h3>

          </div>


          <div className="text-right">

            <p className="text-xs text-gray-400 mb-1">
              Learning
            </p>

            <p className="text-sm font-semibold text-purple-600">
              Self-paced
            </p>

          </div>

        </div>


        {/* Buttons */}
        <div className="flex gap-3">

          {/* View Details */}
          <Link
            to={`/courses/${course._id}`}
            className="flex-1"
          >

            <button
              className="w-full flex items-center justify-center gap-2 border border-purple-200 text-purple-600 hover:bg-purple-50 py-3 rounded-xl font-semibold transition"
            >
              Details
              <FaArrowRight className="text-xs" />
            </button>

          </Link>


          {/* Enroll */}
          <button
            onClick={enrollCourse}
            disabled={loading || enrolled}
            className={`flex-1 py-3 rounded-xl text-white font-semibold transition-all duration-200 ${enrolled
                ? "bg-emerald-500 cursor-default"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg"
              }`}
          >

            {loading
              ? "Enrolling..."
              : enrolled
                ? "✓ Enrolled"
                : "Enroll Now"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default CourseCard;