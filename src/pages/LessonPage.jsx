import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
    FaArrowLeft,
    FaArrowRight,
    FaBookOpen,
    FaCheckCircle,
    FaPlayCircle,
} from "react-icons/fa";

function LessonPage() {
    const { courseId, moduleId, lessonId } = useParams();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const [completing, setCompleting] = useState(false);

    // Exact lesson count for every module
    const moduleLessonCounts = {
        1: 5,
        2: 6,
        3: 5,
        4: 7,
        5: 8,
        6: 6,
        7: 7,
        8: 5,
        9: 8,
        10: 6,
    };

    const totalModuleLessons =
        moduleLessonCounts[Number(moduleId)] || 0;
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get("/users/progress");

                const progressData = res.data;

                const courseProgress = progressData.find(
                    (item) =>
                        item.course?._id === courseId ||
                        item.course === courseId
                );

                if (courseProgress) {
                    const lessonCompleted =
                        courseProgress.completedLessons?.some(
                            (lesson) =>
                                lesson.moduleId === Number(moduleId) &&
                                lesson.lessonId === Number(lessonId)
                        );

                    setCompleted(!!lessonCompleted);
                }
            } catch (error) {
                console.log("Failed to fetch progress:", error);
            }
        };

        fetchProgress();
    }, [courseId, moduleId, lessonId]);

    const lessonData = {
        1: {
            1: {
                title: "Introduction to MERN Stack",
                content:
                    "MERN is a popular JavaScript-based technology stack used to build modern full-stack web applications.",
                topics: [
                    "What is MERN Stack?",
                    "MongoDB for database management",
                    "Express.js for backend APIs",
                    "React.js for frontend development",
                    "Node.js for server-side JavaScript",
                ],
            },

            2: {
                title: "Understanding Full Stack Development",
                content:
                    "Full-stack development involves building both the frontend and backend parts of a web application and connecting them with a database.",
                topics: [
                    "Frontend development",
                    "Backend development",
                    "Database management",
                    "API communication",
                    "Client-server architecture",
                ],
            },

            3: {
                title: "MERN Architecture",
                content:
                    "MERN applications follow a structure where React handles the user interface, Express and Node handle the server, and MongoDB stores application data.",
                topics: [
                    "React frontend",
                    "Node.js runtime",
                    "Express.js server",
                    "MongoDB database",
                    "Data flow in MERN",
                ],
            },

            4: {
                title: "Development Environment Setup",
                content:
                    "Before starting MERN development, developers need a suitable development environment with Node.js, VS Code, Git and MongoDB tools.",
                topics: [
                    "Install Node.js",
                    "Install VS Code",
                    "Configure Git",
                    "Set up MongoDB",
                    "Create a MERN project",
                ],
            },

            5: {
                title: "Course Roadmap",
                content:
                    "This course takes you from the fundamentals of MERN development to building and deploying a complete full-stack application.",
                topics: [
                    "Learn frontend fundamentals",
                    "Learn backend development",
                    "Work with MongoDB",
                    "Build REST APIs",
                    "Deploy the final project",
                ],
            },
        },
    };

    const lesson =
        lessonData[moduleId]?.[lessonId] || {
            title: `Lesson ${lessonId}`,
            content:
                "This lesson introduces important concepts related to full-stack web development.",
            topics: [
                "Understand the concept",
                "Learn the fundamentals",
                "Practice with examples",
                "Build practical skills",
                "Apply the knowledge",
            ],
        };

    const currentLesson = Number(lessonId);

    // Prevent invalid lessons such as Module 1 -> Lesson 6
    useEffect(() => {
        if (
            totalModuleLessons === 0 ||
            currentLesson < 1 ||
            currentLesson > totalModuleLessons
        ) {
            navigate(`/learning/${courseId}/module/${moduleId}`, {
                replace: true,
            });
        }
    }, [
        courseId,
        moduleId,
        currentLesson,
        totalModuleLessons,
        navigate,
    ]);

    // Do not render an invalid lesson while redirecting.
    if (
        totalModuleLessons === 0 ||
        currentLesson < 1 ||
        currentLesson > totalModuleLessons
    ) {
        return null;
    }

    const goToPrevious = () => {
        if (currentLesson > 1) {
            navigate(
                `/learning/${courseId}/module/${moduleId}/lesson/${currentLesson - 1}`
            );
        }
    };

    const goToNext = () => {
        if (currentLesson < totalModuleLessons) {
            navigate(
                `/learning/${courseId}/module/${moduleId}/lesson/${currentLesson + 1}`
            );
        } else {
            navigate(`/learning/${courseId}/module/${moduleId}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Back */}
                <button
                    onClick={() =>
                        navigate(`/learning/${courseId}/module/${moduleId}`)
                    }
                    className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:text-indigo-800"
                >
                    <FaArrowLeft />
                    Back to Module
                </button>


                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg mb-6">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                            <FaBookOpen className="text-2xl" />
                        </div>

                        <div>

                            <p className="text-indigo-100 text-sm">
                                Module {moduleId} • Lesson {lessonId}
                            </p>

                            <h1 className="text-3xl font-bold mt-1">
                                {lesson.title}
                            </h1>

                        </div>

                    </div>

                </div>


                {/* Lecture Area */}
                <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg mb-6">

                    <div className="aspect-video flex items-center justify-center">

                        <div className="text-center text-white px-6">

                            <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-5">
                                <FaPlayCircle className="text-5xl text-indigo-400" />
                            </div>

                            <h2 className="text-2xl font-bold">
                                Lecture Video
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Video lecture will be added soon.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Lesson Content */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6">

                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Lesson Overview
                    </h2>

                    <p className="text-slate-600 leading-7">
                        {lesson.content}
                    </p>


                    <div className="mt-8">

                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                            What You Will Learn
                        </h3>

                        <div className="space-y-3">

                            {lesson.topics.map((topic, index) => (

                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-50"
                                >

                                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>

                                    <span className="text-slate-700 font-medium">
                                        {topic}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>


                {/* Mark Completed */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

                    <button
                        onClick={async () => {
                            try {
                                setCompleting(true);

                                const res = await api.put(
                                    `/users/progress/${courseId}/module/${moduleId}/lesson/${lessonId}`
                                );

                                setCompleted(true);

                                alert(
                                    `${res.data.message}\nCourse Progress: ${res.data.progress}%`
                                );
                            } catch (err) {
                                alert(
                                    err.response?.data?.message ||
                                    "Failed to mark lesson as completed"
                                );
                            } finally {
                                setCompleting(false);
                            }
                        }}
                        disabled={completing || completed}
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold transition ${completed
                            ? "bg-green-500 cursor-default"
                            : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        <FaCheckCircle />

                        {completing
                            ? "Saving Progress..."
                            : completed
                                ? "Lesson Completed ✓"
                                : "Mark as Completed"}
                    </button>

                </div>


                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={goToPrevious}
                        disabled={currentLesson === 1}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <FaArrowLeft />
                        Previous Lesson
                    </button>


                    <button
                        onClick={goToNext}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition"
                    >
                        {currentLesson < totalModuleLessons
                            ? "Next Lesson"
                            : "Finish Module"}
                        <FaArrowRight />
                    </button>

                </div>

            </div>

        </div>
    );
}

export default LessonPage;