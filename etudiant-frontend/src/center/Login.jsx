import { GraduationCap } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSucces } from "../features/auth/authSlice";



function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [infoMessage, setInfoMessage] = useState("");
    const navigate = useNavigate()

    function onchangeEmail(e){
        setEmail(e.target.value)
    }
    function onchangePassword(e){
        setPassword(e.target.value)
    }

    async function SignIn(e){
    e.preventDefault();
    try{
        const reponse = await axios.post("http://127.0.0.1:8001/api/login",{
            email,
            password
        });

        const user = reponse.data.user;
        const token = reponse.data.token;

        if(user.role === "center"){
            if(user.status === "pending"){
                setInfoMessage("Your request is pending. Wait for admin approval.");
                return; 
            }
            if(user.status === "rejected"){
                setInfoMessage("Your request has been rejected.");
                return;
            }
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if(user.role === "center"){
          navigate("/CenterDashboard");
        }
        else if(user.role === "formateur"){
          navigate("/FormateurDashboard");
        }
        else if(user.role === "student"){
          navigate("/student/dashboard");
        }

    } catch(error){
        console.error("Login failed:", error.response?.data || error);
        alert("Login failed. Please check your credentials and try again.");
    }
}


return (
    <div className="min-h-screen flex items-center justify-center bg-[white] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#15BE6A] shadow-xl shadow-[#15BE6A]/20 mb-6 group transition-transform hover:scale-105">
            <GraduationCap className="h-8 w-8 text-white" />
          </a>
          <h2 className="text-3xl font-bold tracking-tight text-[black]">Welcome back</h2>
          <p className="mt-2 text-base text-[gray]/70">Log in to your Forminova account to continue learning.</p>
          <p>{infoMessage}</p>
        </div>

        <div className="bg-white p-8 shadow-xl shadow-[black]/10 border border-[#15BE6A]/20 rounded-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">Email address</label>
              <input type="email" value={email} onChange={onchangeEmail} placeholder="you@example.com" className="w-full px-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-base font-medium text-[black]">Password</label>
                <a href="#" className="text-[15.5px] font-medium text-[#15BE6A] hover:underline">Forgot password?</a>
              </div>
              <input type="password" value={password} onChange={onchangePassword} placeholder="••••••••"className="w-full px-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"
              />
            </div>

            <button type="submit" onClick={SignIn} className="w-full h-12 text-lg bg-[#15BE6A] text-white font-semibold rounded-xl shadow-lg shadow-[#15BE6A]/25 hover:shadow-xl hover:shadow-[#15BE6A]/30 hover:scale-[1.02] transition-all duration-200">
              Sign In</button>
          </div>

          <div className="mt-8 text-center text-[15.5px] text-[black]/70">
            Don't have an account?{" "}
            <button onClick={() => navigate("/Register")} className="font-semibold text-[#15BE6A] hover:underline">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;