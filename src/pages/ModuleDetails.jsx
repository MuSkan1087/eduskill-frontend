import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import {
    FaArrowLeft,
    FaBookOpen,
    FaPlayCircle,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";

function ModuleDetails() {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();

    const [completedLessons, setCompletedLessons] = useState([]);
    const [loadingProgress, setLoadingProgress] = useState(true);

    // Fetch user's course progress
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get("/users/progress");

                const courseProgress = res.data.find(
                    (item) =>
                        item.course?._id === courseId ||
                        item.course?.toString() === courseId
                );

                if (courseProgress) {
                    setCompletedLessons(
                        courseProgress.completedLessons || []
                    );
                }
            } catch (error) {
                console.error("Failed to fetch progress:", error);
            } finally {
                setLoadingProgress(false);
            }
        };

        fetchProgress();
    }, [courseId]);

    // Temporary curriculum
    const moduleData = {
        1: {
            title: "Introduction to the Course",
            duration: "45 min",
            lessons: [
                "Introduction to MERN Stack",
                "Understanding Full Stack Development",
                "MERN Architecture",
                "Development Environment Setup",
                "Course Roadmap",
            ],
        },

        2: {
            title: "Fundamentals & Basic Concepts",
            duration: "1 hr",
            lessons: [
                "Web Development Fundamentals",
                "Client and Server",
                "Frontend vs Backend",
                "HTTP & APIs",
                "Introduction to REST APIs",
                "Project Structure",
            ],
        },

        3: {
            title: "Understanding Core Concepts",
            duration: "50 min",
            lessons: [
                "MongoDB Fundamentals",
                "Express.js Fundamentals",
                "React.js Fundamentals",
                "Node.js Fundamentals",
                "How MERN Works Together",
            ],
        },

        4: {
            title: "Tools & Development Environment",
            duration: "1 hr 10 min",
            lessons: [
                "Installing Node.js",
                "Installing VS Code",
                "NPM & Packages",
                "Git & GitHub",
                "MongoDB Atlas Setup",
                "Postman Introduction",
                "Environment Variables",
            ],
        },

        5: {
            title: "Practical Implementation",
            duration: "1 hr 20 min",
            lessons: [
                "Creating the Backend",
                "Creating Express Routes",
                "Creating MongoDB Models",
                "Connecting Database",
                "Creating React Components",
                "API Integration",
                "Authentication",
                "Testing the Application",
            ],
        },

        6: {
            title: "Working with Real Projects",
            duration: "1 hr",
            lessons: [
                "Project Planning",
                "Frontend Structure",
                "Backend Structure",
                "Database Design",
                "API Development",
                "Frontend Integration",
            ],
        },

        7: {
            title: "Advanced Concepts",
            duration: "1 hr 15 min",
            lessons: [
                "Advanced React Concepts",
                "Context API",
                "State Management",
                "JWT Authentication",
                "Protected Routes",
                "Advanced API Handling",
                "Error Handling",
            ],
        },

        8: {
            title: "Best Practices & Optimization",
            duration: "55 min",
            lessons: [
                "Clean Code",
                "Reusable Components",
                "API Optimization",
                "Security Best Practices",
                "Performance Optimization",
            ],
        },

        9: {
            title: "Real-World Application",
            duration: "1 hr 30 min",
            lessons: [
                "Building a Real Project",
                "User Authentication",
                "Course Management",
                "Database Integration",
                "Payment Flow",
                "Deployment",
                "Testing",
                "Project Improvements",
            ],
        },

        10: {
            title: "Final Project & Assessment",
            duration: "1 hr 20 min",
            lessons: [
                "Final Project Introduction",
                "Project Requirements",
                "Project Development",
                "Testing & Debugging",
                "Final Assessment",
                "Project Submission",
            ],
        },
    };

    const module = moduleData[moduleId];

    if (!module) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="text-center">

                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Module Not Found
                    </h2>

                    <button
                        onClick={() =>
                            navigate(`/learning/${courseId}`)
                        }
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                    >
                        Back to Learning
                    </button>

                </div>
            </div>
        );
    }

    // Check whether lesson is completed
    const isLessonCompleted = (lessonId) => {
        return completedLessons.some(
            (lesson) =>
                Number(lesson.moduleId) === Number(moduleId) &&
                Number(lesson.lessonId) === Number(lessonId)
        );
    };

    // Count completed lessons for this module
    // Count only valid lessons that actually exist in this module.
    // This prevents invalid extra lesson records from showing 120% progress.
    const moduleCompletedCount = completedLessons.filter(
        (lesson) =>
            Number(lesson.moduleId) === Number(moduleId) &&
            Number(lesson.lessonId) >= 1 &&
            Number(lesson.lessonId) <= module.lessons.length
    ).length;

    const moduleProgress =
        module.lessons.length > 0
            ? Math.min(
                Math.round(
                    (moduleCompletedCount / module.lessons.length) * 100
                ),
                100
            )
            : 0;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Back */}
                <button
                    onClick={() =>
                        navigate(`/learning/${courseId}`)
                    }
                    className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:text-indigo-800"
                >
                    <FaArrowLeft />
                    Back to Modules
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg mb-8">

                    <div className="flex items-center gap-4 mb-5">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                            <FaBookOpen className="text-2xl" />
                        </div>

                        <div>

                            <p className="text-indigo-100 text-sm">
                                Module {moduleId}
                            </p>

                            <h1 className="text-3xl font-bold">
                                {module.title}
                            </h1>

                        </div>

                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-indigo-100">

                        <span>
                            📚 {module.lessons.length} Lessons
                        </span>

                        <span className="flex items-center gap-2">
                            <FaClock />
                            {module.duration}
                        </span>

                        <span>
                            🚀 Self-paced
                        </span>

                    </div>

                </div>

                {/* Lessons */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-bold text-slate-900">
                                Module Lessons
                            </h2>

                            <p className="text-slate-500 text-sm mt-1">
                                Complete each lesson step-by-step.
                            </p>

                        </div>

                        <span className="hidden sm:block px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-semibold text-sm">
                            {module.lessons.length} Lessons
                        </span>

                    </div>

                    <div className="space-y-3">

                        {module.lessons.map((lesson, index) => {

                            const lessonId = index + 1;
                            const completed =
                                isLessonCompleted(lessonId);

                            return (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between gap-4 p-4 rounded-2xl border transition ${
                                        completed
                                            ? "border-green-200 bg-green-50/50"
                                            : "border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30"
                                    }`}
                                >

                                    <div className="flex items-center gap-4">

                                        {/* Lesson Number */}
                                        <div
                                            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
                                                completed
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-indigo-50 text-indigo-600"
                                            }`}
                                        >
                                            {completed ? (
                                                <FaCheckCircle />
                                            ) : (
                                                lessonId
                                            )}
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-slate-900">
                                                Lesson {lessonId}: {lesson}
                                            </h3>

                                            <p
                                                className={`text-sm mt-1 ${
                                                    completed
                                                        ? "text-green-600 font-medium"
                                                        : "text-slate-500"
                                                }`}
                                            >
                                                {completed
                                                    ? "Lesson completed ✓"
                                                    : "Lecture content"}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/learning/${courseId}/module/${moduleId}/lesson/${lessonId}`
                                            )
                                        }
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition ${
                                            completed
                                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                                        }`}
                                    >

                                        {completed ? (
                                            <>
                                                <FaCheckCircle />

                                                <span className="hidden sm:inline">
                                                    Completed
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <FaPlayCircle />

                                                <span className="hidden sm:inline">
                                                    Start
                                                </span>
                                            </>
                                        )}

                                    </button>

                                </div>
                            );
                        })}

                    </div>

                </div>

                {/* Completion */}
                <div className="mt-6 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                <FaCheckCircle />
                            </div>

                            <div>

                                <h3 className="font-bold text-slate-900">
                                    Module Progress
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Complete all lessons to finish this module.
                                </p>

                            </div>

                        </div>

                        <div className="text-sm font-semibold text-indigo-600">
                            {loadingProgress
                                ? "Loading..."
                                : `${moduleCompletedCount} / ${module.lessons.length} Completed`}
                        </div>

                    </div>

                    {/* Progress Bar */}
                    <div className="mt-5">

                        <div className="flex justify-between text-sm mb-2">

                            <span className="text-slate-500">
                                Progress
                            </span>

                            <span className="font-semibold text-indigo-600">
                                {moduleProgress}%
                            </span>

                        </div>

                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                                style={{
                                    width: `${moduleProgress}%`,
                                }}
                            />

                        </div>

                    </div>

                    {/* Module Completed Message */}
                    {moduleCompletedCount >= module.lessons.length && (
                        <div className="mt-5 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 font-semibold flex items-center gap-3">
                            <FaCheckCircle />
                            🎉 Module completed successfully!
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default ModuleDetails;