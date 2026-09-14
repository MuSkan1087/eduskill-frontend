import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { FaArrowLeft, FaCertificate } from "react-icons/fa";

function CertificatePage() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const studentName =
        localStorage.getItem("name") ||
        localStorage.getItem("userName") ||
        "Student";

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // First try the exact course endpoint used by CourseDetails.
                const res = await api.get(`/courses/${courseId}`);

                // Supports both direct course response and wrapped response.
                const courseData = res.data?.course || res.data;

                if (courseData?._id) {
                    setCourse(courseData);
                    return;
                }

                throw new Error("Invalid course response");
            } catch (error) {
                console.error("Direct course fetch failed:", error);

                // Fallback: fetch all courses and find the matching course.
                try {
                    const allCoursesRes = await api.get("/courses");

                    const courses = Array.isArray(allCoursesRes.data)
                        ? allCoursesRes.data
                        : allCoursesRes.data?.courses || [];

                    const foundCourse = courses.find(
                        (item) =>
                            item._id?.toString() === courseId?.toString()
                    );

                    if (foundCourse) {
                        setCourse(foundCourse);
                    } else {
                        console.error("Course not found in course list.");
                    }
                } catch (fallbackError) {
                    console.error(
                        "Fallback course fetch failed:",
                        fallbackError
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const completionDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const getCertificateId = () => {
        const key = `certificate-${courseId}`;

        let certificateId = localStorage.getItem(key);

        if (!certificateId) {
            certificateId = `ESH-${Date.now().toString(36).toUpperCase()}`;
            localStorage.setItem(key, certificateId);
        }

        return certificateId;
    };

    const certificateId = getCertificateId();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-indigo-600 font-semibold">
                    Loading certificate...
                </p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
                <p className="text-red-500 font-semibold mb-4">
                    Course details could not be loaded.
                </p>

                <button
                    onClick={() => navigate(`/learning/${courseId}`)}
                    className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                    Back to Learning
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(`/learning/${courseId}`)}
                    className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:text-indigo-800"
                >
                    <FaArrowLeft />
                    Back to Learning
                </button>

                <div
                    id="certificate"
                    className="bg-white border-8 border-double border-indigo-500 rounded-3xl shadow-2xl p-6 sm:p-10"
                >
                    <div className="border border-indigo-200 rounded-2xl p-6 sm:p-10 text-center">
                        <FaCertificate className="text-6xl text-indigo-600 mx-auto mb-4" />

                        <p className="text-indigo-600 uppercase tracking-[0.3em] text-sm font-bold">
                            EntreSkill Hub
                        </p>

                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4">
                            Certificate of Completion
                        </h1>

                        <p className="text-slate-500 mt-6">
                            This certificate is proudly presented to
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 mt-3 break-words">
                            {studentName}
                        </h2>

                        <p className="text-slate-500 mt-6">
                            for successfully completing the course
                        </p>

                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 break-words">
                            {course.title}
                        </h3>

                        <p className="text-slate-500 max-w-2xl mx-auto mt-5 leading-7">
                            This learner has successfully completed all course
                            lessons and fulfilled the learning requirements.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-5 mt-10 max-w-2xl mx-auto">
                            <div className="p-4 rounded-xl bg-indigo-50">
                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                    Completion Date
                                </p>
                                <p className="font-bold text-slate-800 mt-1">
                                    {completionDate}
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-indigo-50">
                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                    Certificate ID
                                </p>
                                <p className="font-bold text-slate-800 mt-1 break-all">
                                    {certificateId}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-slate-200">
                            <p className="font-bold text-slate-800">
                                EntreSkill Hub
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                                Skill • Learn • Build • Grow
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => window.print()}
                        className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition"
                    >
                        🖨️ Print / Save as PDF
                    </button>
                </div>
            </div>

            <style>{`
                @media print {
                    body {
                        background: white !important;
                    }

                    body * {
                        visibility: hidden;
                    }

                    #certificate,
                    #certificate * {
                        visibility: visible;
                    }

                    #certificate {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        box-shadow: none !important;
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default CertificatePage;
