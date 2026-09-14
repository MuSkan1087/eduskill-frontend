import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
    FaPlayCircle,
    FaBookOpen,
    FaCheckCircle,
    FaCertificate,
} from "react-icons/fa";

function LearningModules() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [completedLessons, setCompletedLessons] = useState([]);

    // Fetch course progress
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get("/users/progress");

                const courseProgress = res.data.find(
                    (item) => item.course?._id === courseId
                );

                if (courseProgress) {
                    setCompletedLessons(
                        courseProgress.completedLessons || []
                    );
                }
            } catch (error) {
                console.error("Failed to fetch progress:", error);
            }
        };

        fetchProgress();
    }, [courseId]);

    // Course curriculum
    const modules = [
        {
            id: 1,
            title: "Introduction to the Course",
            lessons: 5,
            duration: "45 min",
        },
        {
            id: 2,
            title: "Fundamentals & Basic Concepts",
            lessons: 6,
            duration: "1 hr",
        },
        {
            id: 3,
            title: "Understanding Core Concepts",
            lessons: 5,
            duration: "50 min",
        },
        {
            id: 4,
            title: "Tools & Development Environment",
            lessons: 7,
            duration: "1 hr 10 min",
        },
        {
            id: 5,
            title: "Practical Implementation",
            lessons: 8,
            duration: "1 hr 20 min",
        },
        {
            id: 6,
            title: "Working with Real Projects",
            lessons: 6,
            duration: "1 hr",
        },
        {
            id: 7,
            title: "Advanced Concepts",
            lessons: 7,
            duration: "1 hr 15 min",
        },
        {
            id: 8,
            title: "Best Practices & Optimization",
            lessons: 5,
            duration: "55 min",
        },
        {
            id: 9,
            title: "Real-World Application",
            lessons: 8,
            duration: "1 hr 30 min",
        },
        {
            id: 10,
            title: "Final Project & Assessment",
            lessons: 6,
            duration: "1 hr 20 min",
        },
    ];

    // Total lessons = 63
    const totalLessons = modules.reduce(
        (total, module) => total + module.lessons,
        0
    );

    // Keep only valid lesson records and ignore accidental extra/duplicate records.
    const validCompletedLessons = completedLessons.filter((lesson, index, array) => {
        const module = modules.find(
            (item) => item.id === Number(lesson.moduleId)
        );

        if (!module) return false;

        const lessonNumber = Number(lesson.lessonId);

        if (
            lessonNumber < 1 ||
            lessonNumber > module.lessons
        ) {
            return false;
        }

        const firstIndex = array.findIndex(
            (item) =>
                Number(item.moduleId) === Number(lesson.moduleId) &&
                Number(item.lessonId) === lessonNumber
        );

        return index === firstIndex;
    });

    // Overall course progress
    const overallProgress =
        totalLessons > 0
            ? Math.min(
                Math.round(
                    (validCompletedLessons.length / totalLessons) * 100
                ),
                100
            )
            : 0;

    // Course completion
    const courseCompleted =
        validCompletedLessons.length >= totalLessons;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Back */}
                <button
                    onClick={() => navigate("/my-courses")}
                    className="text-indigo-600 font-semibold mb-6 hover:text-indigo-800"
                >
                    ← Back
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-lg">

                    <div className="flex items-center gap-4 mb-4">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                            <FaBookOpen className="text-2xl" />
                        </div>

                        <div>
                            <p className="text-indigo-100 text-sm">
                                Learning Modules
                            </p>

                            <h1 className="text-3xl font-bold">
                                Course Curriculum
                            </h1>
                        </div>

                    </div>

                    <p className="text-indigo-100">
                        Follow the modules step-by-step and build your skills
                        through practical learning.
                    </p>

                    {/* Course Stats */}
                    <div className="flex flex-wrap gap-6 mt-6 text-sm">

                        <span>
                            📚 {modules.length} Modules
                        </span>

                        <span>
                            🎥 {totalLessons} Lessons
                        </span>

                        <span>
                            🚀 Self-paced Learning
                        </span>

                    </div>

                    {/* Overall Progress */}
                    <div className="mt-7">

                        <div className="flex items-center justify-between mb-2">

                            <span className="text-sm font-semibold">
                                Overall Course Progress
                            </span>

                            <span className="text-sm font-bold">
                                {validCompletedLessons.length}/{totalLessons} Lessons
                                ({overallProgress}%)
                            </span>

                        </div>

                        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{
                                    width: `${overallProgress}%`,
                                }}
                            ></div>

                        </div>

                    </div>

                    {/* Course Completed */}
                    {courseCompleted && (
                        <div className="mt-6 p-4 rounded-2xl bg-white/20 border border-white/30 flex items-center gap-3">
                            <FaCheckCircle className="text-2xl" />

                            <div>
                                <p className="font-bold text-lg">
                                    🎉 Course Completed!
                                </p>

                                <p className="text-indigo-100 text-sm">
                                    Congratulations! You have successfully completed all{" "}
                                    {totalLessons} lessons.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/certificate/${courseId}`)
                                }
                                className="mt-4 w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2"
                            >
                                <FaCertificate />
                                Download Certificate
                            </button>
                        </div>
                    )}

                </div>

                {/* Modules */}
                <div className="space-y-4">

                    {modules.map((module) => {

                        const moduleCompleted =
                            completedLessons.filter(
                                (lesson) =>
                                    Number(lesson.moduleId) === module.id &&
                                    Number(lesson.lessonId) >= 1 &&
                                    Number(lesson.lessonId) <= module.lessons
                            ).length;

                        const moduleFinished =
                            moduleCompleted >= module.lessons;


                        const moduleProgress =
                            module.lessons > 0
                                ? Math.min(
                                    Math.round(
                                        (moduleCompleted /
                                            module.lessons) *
                                        100
                                    ),
                                    100
                                )
                                : 0;
                        return (
                            <div
                                key={module.id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition p-5"
                            >

                                <div className="flex items-center justify-between gap-4">

                                    <div className="flex items-center gap-4">

                                        {/* Module Number */}
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${moduleFinished
                                                ? "bg-green-100 text-green-600"
                                                : "bg-indigo-50 text-indigo-600"
                                                }`}
                                        >
                                            {moduleFinished ? (
                                                <FaCheckCircle />
                                            ) : (
                                                module.id
                                            )}
                                        </div>

                                        <div>

                                            <h2 className="text-lg font-bold text-slate-900">
                                                Module {module.id}:{" "}
                                                {module.title}
                                            </h2>

                                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">

                                                <span>
                                                    🎥 {module.lessons} Lessons
                                                </span>

                                                <span>
                                                    ⏱ {module.duration}
                                                </span>

                                                <span
                                                    className={
                                                        moduleFinished
                                                            ? "text-green-600 font-semibold"
                                                            : "text-indigo-600 font-semibold"
                                                    }
                                                >
                                                    {moduleCompleted}/
                                                    {module.lessons} Completed
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Start Button */}
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/learning/${courseId}/module/${module.id}`
                                            )
                                        }
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition ${moduleFinished
                                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                                            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                                            }`}
                                    >
                                        {moduleFinished ? (
                                            <>
                                                <FaCheckCircle />
                                                Completed
                                            </>
                                        ) : (
                                            <>
                                                <FaPlayCircle />
                                                Start
                                            </>
                                        )}
                                    </button>

                                </div>

                                {/* Module Progress */}
                                <div className="mt-4">

                                    <div className="flex justify-between text-xs text-slate-500 mb-1">

                                        <span>
                                            Module Progress
                                        </span>

                                        <span>
                                            {moduleProgress}%
                                        </span>

                                    </div>

                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${moduleFinished
                                                ? "bg-green-500"
                                                : "bg-indigo-500"
                                                }`}
                                            style={{
                                                width: `${moduleProgress}%`,
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

                {/* Practice Skills */}
                <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div>

                            <h2 className="text-xl font-bold text-slate-900">
                                Practice Skills
                            </h2>

                            <p className="text-slate-500 text-sm mt-1">
                                Test your knowledge with course-specific
                                practice questions.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate(`/practice/${courseId}`)
                            }
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition"
                        >
                            Practice Questions →
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LearningModules;