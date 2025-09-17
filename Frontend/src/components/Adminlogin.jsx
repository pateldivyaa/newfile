import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import { authApi } from "../../services/api";  // API service imported

const AdminLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);  // Step 1: Enter phone, Step 2: Enter OTP
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.loginWithPhone(phone, "adminpassword");  // Send login with phone
      toast.success("OTP sent to your phone.");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.verifyOtp(phone, otp);
      localStorage.setItem("gt_user", JSON.stringify(response.data));  // Save authenticated user
      toast.success("Admin authenticated successfully");
      navigate("/admindashboardpage");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-orange-600 py-6 px-4 text-white text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-orange-200">Govardhan Thal Restaurant</p>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock size={28} className="text-orange-600" />
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handlePhoneSubmit}>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-md text-white font-semibold
                  ${isLoading ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"}
                  transition-colors`}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-gray-700 mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Enter OTP"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-md text-white font-semibold
                  ${isLoading ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"}
                  transition-colors`}
              >
                {isLoading ? "Verifying OTP..." : "Login"}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-8">
        <a
          href="/"
          className="text-orange-600 hover:text-orange-800 transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
