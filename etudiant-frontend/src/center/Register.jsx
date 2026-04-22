import { GraduationCap } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [name,setFullname] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("student")

    function onchangeFullName(e){
        setFullname(e.target.value)
    }
    function onchangeEmail(e){
        setEmail(e.target.value)
    }
    function onchangePassword(e){
        setPassword(e.target.value)
    }
    function onchangeRole(e){
        setRole(e.target.value)
    }
    
    function createAccount(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:8001/api/register",{
            name,
            email,
            password,
            role
        })
        navigate("/Login")
    }

    
  return (
    <div className="min-h-screen flex items-center justify-center bg-[white] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#15BE6A] shadow-xl shadow-[#15BE6A]/20 mb-6 group transition-transform hover:scale-105">
            <GraduationCap className="h-8 w-8 text-white" />
          </a>
          <h2 className="text-3xl font-bold tracking-tight text-[black]">Create your account</h2>
          <p className="mt-2 text-base text-[gray]/70">Join millions of learners on Forminova.</p>
        </div>

        <div className="bg-white p-8 shadow-xl shadow-[black]/10 border border-[white]/20 rounded-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">Full Name</label>
              <input type="text" value={name} onChange={onchangeFullName} placeholder="Your name" className="w-full px-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"/>
            </div>

            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">Email address</label>
              <input type="email" value={email} onChange={onchangeEmail} placeholder="you@example.com" className="w-full px-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"/>
            </div>

            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">Password</label>
              <input type="password" value={password} onChange={onchangePassword} placeholder="••••••••" className="w-full px-4 py-3 text-base border border-[black]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15BE6A]/20 focus:border-[#15BE6A] transition-colors text-gray-700 placeholder-[black]/40"/>
            </div>

            <div>
              <label className="block text-base font-medium text-[black] mb-2 text-left">I want to</label>
              <div className="flex gap-3">
                <div className="flex items-center gap-3 p-3 border border-[black]/30 rounded-xl hover:border-[#15BE6A] transition-colors cursor-default w-64 h-16">
                  <input type="radio" value="student" onChange={onchangeRole} name="role" checked={role === "student"} />
                  <label className="text-base text-gray-700 flex-1 cursor-default">Student</label>
                </div>
                <div className="flex items-center gap-3 p-3 border border-[black]/30 rounded-xl hover:border-[#15BE6A] transition-colors cursor-default w-64 h-16">
                  <input type="radio" value="center" onChange={onchangeRole} name="role" checked={role === "center"} />
                  <label className="text-base text-gray-700 flex-1 cursor-default">Center</label>
                </div>
              </div>
            </div>

            <button type="submit" onClick={createAccount} className="w-full h-12 text-lg bg-[#15BE6A] text-white font-semibold rounded-xl shadow-lg shadow-[#15BE6A]/25 hover:shadow-xl hover:shadow-[#15BE6A]/30 hover:scale-[1.02] transition-all duration-200">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-[15.5px] text-[black]/70">
            Already have an account?{" "}
            <p onClick={()=>navigate("/Login")} className="font-semibold text-[#15BE6A] hover:underline">Sign in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;