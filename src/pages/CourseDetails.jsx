import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // Fetch Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.log(err);
        alert("Course load nahi hua");
      }
    };

    fetchCourse();
  }, [id]);

  // Enroll Course
  const handleEnroll = async () => {
    try {
      setEnrolling(true);

      const res = await api.post(`/courses/${id}/enroll`);

      alert(res.data.message || "Enrolled successfully");

      setEnrolled(true);

    } catch (err) {
      console.log(err);
      console.log(err.response?.data);

      const message =
        err.response?.data?.message || "Enrollment failed";

      alert(message);

      // Agar already enrolled hai
      if (message.toLowerCase().includes("already enrolled")) {
        setEnrolled(true);
      }

    } finally {
      setEnrolling(false);
    }
  };

  if (!course) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-2xl font-bold">
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center p-8">

        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-3xl">

          {/* Course Image */}
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6 text-lg">
            {course.description}
          </p>

          {/* Course Information */}
          <div className="space-y-3 text-lg">

            <p>
              <strong>Category:</strong>{" "}
              {course.category}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {course.duration}
            </p>

            <p>
              <strong>Level:</strong>{" "}
              {course.level}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              ₹{course.price}
            </p>

          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            disabled={enrolling || enrolled}
            className={`mt-8 w-full text-white py-3 rounded-xl font-semibold transition ${
              enrolled
                ? "bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {enrolling
              ? "Enrolling..."
              : enrolled
              ? "✓ Enrolled"
              : "Enroll Now"}
          </button>

          {/* My Courses */}
          {enrolled && (
            <button
              onClick={() => navigate("/mycourses")}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
            >
              Go to My Courses
            </button>
          )}

          {/* Back */}
          <Link to="/courses">
            <button className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl">
              ← Back to Courses
            </button>
          </Link>

        </div>
      </div>
    </>
  );
}

export default CourseDetails;