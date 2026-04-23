import { GraduationCap } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfoMessage("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8001/api/forgot-password",
        { email }
      );

      console.log(res.data);

      navigate("/verifyPassword", {
        state: { email },
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      setInfoMessage(error.response?.data?.message || "Error");
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
            Forgot Password
          </h2>
          <p className="mt-2 text-base text-[gray]/70">
            Enter your email to receive a verification code.
          </p>
          {infoMessage && (
            <p className="mt-3 text-sm text-red-500">{infoMessage}</p>
          )}
        </div>

        <div className="bg-white p-8 shadow-xl shadow-[black]/10 border border-[#15BE6A]/20 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[black]/40" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 text-lg bg-[#15BE6A] text-white font-semibold rounded-xl shadow-lg shadow-[#15BE6A]/25 hover:shadow-xl hover:shadow-[#15BE6A]/30 hover:scale-[1.02] transition-all duration-200"
            >
              Send Code
            </button>
          </form>

          <div className="mt-8 text-center text-[15.5px] text-[black]/70">
            Remember your password?{" "}
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
}

