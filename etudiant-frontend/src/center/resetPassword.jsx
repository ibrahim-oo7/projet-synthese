import { GraduationCap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email =
    location.state?.email || localStorage.getItem("reset_email");
  const code =
    location.state?.code || sessionStorage.getItem("reset_code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setInfoMessage("");

    if (password !== confirmPassword) {
      setInfoMessage("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8001/api/reset-password", {
        email,
        code,
        password,
      });

      toast.success("Password reset successfully");

      sessionStorage.removeItem("reset_code");
      localStorage.removeItem("reset_email");

      navigate("/Login");
    } catch (error) {
      console.log(error.response?.data || error.message);
      setInfoMessage(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[white] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#15BE6A] shadow-xl shadow-[#15BE6A]/20 mb-6 group transition-transform hover:scale-105"
          >
            <GraduationCap className="h-8 w-8 text-white" />
          </a>

          <h2 className="text-3xl font-bold tracking-tight text-[black]">
            Reset Password
          </h2>
          <p className="mt-2 text-base text-[gray]/70">
            Enter your new password to continue.
          </p>
          {infoMessage && (
            <p className="mt-3 text-sm text-red-500">{infoMessage}</p>
          )}
        </div>

        <div className="bg-white p-8 shadow-xl shadow-[black]/10 border border-[#15BE6A]/20 rounded-2xl">
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">
                New Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[black]/40" />
                <input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">
                Confirm Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[black]/40" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 text-lg bg-[#15BE6A] text-white font-semibold rounded-xl shadow-lg shadow-[#15BE6A]/25 hover:shadow-xl hover:shadow-[#15BE6A]/30 hover:scale-[1.02] transition-all duration-200"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-8 text-center text-[15.5px] text-[black]/70">
            Back to{" "}
            <button
              onClick={() => navigate("/Login")}
              className="font-semibold text-[#15BE6A] hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;


