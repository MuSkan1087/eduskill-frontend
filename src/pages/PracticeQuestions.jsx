import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function PracticeQuestions() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/questions/course/${courseId}`
        );

        setQuestions(res.data);
        setAnswers(new Array(res.data.length).fill(null));
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to load practice questions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [courseId]);

  // Select answer
  const selectAnswer = (optionIndex) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = optionIndex;

    setAnswers(updatedAnswers);
  };

  // Next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Previous question
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit quiz
  const submitQuiz = async () => {
    try {
      setSubmitting(true);

      const res = await api.post(
        `/questions/course/${courseId}/submit`,
        {
          answers,
        }
      );

      setResult(res.data);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Quiz submission failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>

          <h2 className="text-xl font-bold text-slate-800">
            Loading Questions...
          </h2>

          <p className="text-slate-500 mt-2">
            Please wait while we prepare your practice quiz.
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center max-w-md w-full">

          <div className="text-5xl mb-4">⚠️</div>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Unable to Load Questions
          </h2>

          <p className="text-slate-500 mb-6">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            ← Go Back
          </button>

        </div>
      </div>
    );
  }

  // No questions
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">

          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            No Questions Available
          </h2>

          <p className="text-slate-500 mb-6">
            Practice questions have not been added for this course yet.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            ← Back to Learning
          </button>

        </div>
      </div>
    );
  }

  // Result screen
  if (result) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">

        <div className="max-w-2xl mx-auto">

          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center">

            <div className="text-6xl mb-5">
              {result.percentage >= 70 ? "🎉" : "📚"}
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Quiz Completed!
            </h1>

            <p className="text-slate-500 mt-2">
              Great job! Here is your result.
            </p>

            <div className="mt-8 bg-indigo-50 rounded-2xl p-6">

              <p className="text-sm text-indigo-600 font-semibold">
                Your Score
              </p>

              <h2 className="text-5xl font-bold text-indigo-700 mt-2">
                {result.score}/{result.totalQuestions}
              </h2>

              <p className="text-xl font-bold text-slate-800 mt-3">
                {result.percentage}%
              </p>

            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">

              <button
                onClick={() => {
                  setResult(null);
                  setCurrentQuestion(0);
                  setAnswers(
                    new Array(questions.length).fill(null)
                  );
                }}
                className="flex-1 py-3 rounded-xl border border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
              >
                Try Again
              </button>

              <button
                onClick={() => navigate(`/learning/${courseId}`)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition"
              >
                Back to Learning →
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  const question = questions[currentQuestion];

  const answeredCount = answers.filter(
    (answer) => answer !== null
  ).length;

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">

          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 font-semibold mb-5 hover:text-indigo-800"
          >
            ← Back to Learning
          </button>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-7 text-white shadow-lg">

            <p className="text-indigo-100 text-sm">
              Practice Skills
            </p>

            <h1 className="text-3xl font-bold mt-1">
              Practice Questions
            </h1>

            <div className="flex flex-wrap gap-5 mt-5 text-sm text-indigo-100">
              <span>
                📝 {questions.length} Questions
              </span>

              <span>
                ✅ {answeredCount} Answered
              </span>

              <span>
                🎯 MCQ Practice
              </span>
            </div>

          </div>

        </div>


        {/* Progress */}
        <div className="bg-white rounded-2xl p-5 mb-5 border border-slate-100 shadow-sm">

          <div className="flex justify-between text-sm font-semibold text-slate-600 mb-3">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>


        {/* Question Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">

          <div className="flex items-start gap-4 mb-7">

            <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>

            <div>

              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide mb-2">
                {question.difficulty || "Medium"}
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed">
                {question.question}
              </h2>

            </div>

          </div>


          {/* Options */}
          <div className="space-y-3">

            {question.options.map((option, index) => {

              const isSelected =
                answers[currentQuestion] === index;

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold shrink-0 ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>

                    <span className="font-medium">
                      {option}
                    </span>

                  </div>

                </button>
              );
            })}

          </div>


          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-slate-100">

            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              ← Previous
            </button>


            {currentQuestion === questions.length - 1 ? (

              <button
                onClick={submitQuiz}
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:shadow-lg transition disabled:opacity-60"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Quiz ✓"}
              </button>

            ) : (

              <button
                onClick={nextQuestion}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition"
              >
                Next Question →
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default PracticeQuestions;