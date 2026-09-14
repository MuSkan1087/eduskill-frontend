import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setProcessing(true);

      // Enroll course after payment
      const res = await api.post(
        `/courses/${course._id}/enroll`
      );

      alert(
        res.data.message || "Payment successful! Course enrolled."
      );

      // Go to learning modules
      navigate(`/learning/${course._id}`);

    } catch (err) {
      if (
        err.response?.data?.message ===
        "Already enrolled in this course"
      ) {
        navigate(`/learning/${course._id}`);
        return;
      }

      alert(
        err.response?.data?.message ||
        "Payment / Enrollment failed"
      );

    } finally {
      setProcessing(false);
    }
  };


  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Course information not found
          </h2>

          <p className="text-slate-500 mb-6">
            Please select the course again.
          </p>

          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Back to Courses
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 font-semibold mb-4 hover:text-indigo-800"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Complete Your Payment
          </h1>

          <p className="text-slate-500 mt-2">
            Choose your preferred payment method to enroll in the course.
          </p>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Payment Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-6">

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Choose Payment Method
            </h2>


            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-3 mb-7">

              <button
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-xl border-2 font-semibold transition ${
                  paymentMethod === "upi"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-indigo-300"
                }`}
              >
                💳
                <br />
                UPI
              </button>


              <button
                onClick={() => setPaymentMethod("qr")}
                className={`p-4 rounded-xl border-2 font-semibold transition ${
                  paymentMethod === "qr"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-indigo-300"
                }`}
              >
                📱
                <br />
                QR Code
              </button>


              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border-2 font-semibold transition ${
                  paymentMethod === "card"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-indigo-300"
                }`}
              >
                💳
                <br />
                Card
              </button>

            </div>


            {/* UPI */}
            {paymentMethod === "upi" && (

              <div>

                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Pay using UPI
                </h3>

                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 outline-none focus:border-indigo-600"
                />

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full mt-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-60"
                >
                  {processing
                    ? "Processing..."
                    : `Pay ₹${course.price}`}
                </button>

              </div>

            )}


            {/* QR */}
            {paymentMethod === "qr" && (

              <div className="text-center">

                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Scan & Pay
                </h3>


                <div className="w-48 h-48 mx-auto rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">

                  <span className="text-7xl">
                    ▦
                  </span>

                </div>


                <p className="text-sm text-slate-500 mb-5">
                  Scan the QR code using any UPI app
                </p>


                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-60"
                >
                  {processing
                    ? "Processing..."
                    : `Pay ₹${course.price}`}
                </button>

              </div>

            )}


            {/* Card */}
            {paymentMethod === "card" && (

              <div>

                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Pay using Card
                </h3>


                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full h-12 px-4 rounded-xl border border-slate-300 outline-none focus:border-indigo-600"
                  />


                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="w-full h-12 px-4 rounded-xl border border-slate-300 outline-none focus:border-indigo-600"
                  />


                  <div className="grid grid-cols-2 gap-4">

                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="h-12 px-4 rounded-xl border border-slate-300 outline-none focus:border-indigo-600"
                    />


                    <input
                      type="password"
                      placeholder="CVV"
                      className="h-12 px-4 rounded-xl border border-slate-300 outline-none focus:border-indigo-600"
                    />

                  </div>


                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-60"
                  >
                    {processing
                      ? "Processing..."
                      : `Pay ₹${course.price}`}
                  </button>

                </div>

              </div>

            )}

          </div>


          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 h-fit">

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Order Summary
            </h2>


            <div className="mb-5">

              <p className="text-sm text-slate-500 mb-1">
                Course
              </p>

              <h3 className="text-lg font-bold text-slate-900">
                {course.title}
              </h3>

            </div>


            <div className="border-t border-slate-100 pt-5">

              <div className="flex justify-between text-slate-600 mb-3">

                <span>
                  Course Price
                </span>

                <span>
                  ₹{course.price}
                </span>

              </div>


              <div className="flex justify-between text-slate-600 mb-4">

                <span>
                  Payment
                </span>

                <span className="text-green-600 font-semibold">
                  One-time
                </span>

              </div>


              <div className="border-t border-slate-200 pt-4 flex justify-between">

                <span className="text-lg font-bold text-slate-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-indigo-600">
                  ₹{course.price}
                </span>

              </div>

            </div>


            <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-100">

              <p className="text-sm text-green-700">
                🔒 Secure enrollment
              </p>

              <p className="text-xs text-green-600 mt-1">
                You will get access to the course after successful payment.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PaymentPage;