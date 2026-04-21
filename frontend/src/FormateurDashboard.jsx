import { DashboardLayoutF } from "./DashboardLayoutF";
import { BookOpen, CheckCircle, Clock, XCircle, TrendingUp, Users, Video, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function FormateurDashboard() {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    useEffect(() => {
            axios.get("http://127.0.0.1:8000/api/courses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                setCourse(res.data);
            })
        }, []);

    if (!course) {
      return <div>Loading...</div>;
    }
    const totalCourse = course.length;

    const totalaprov = course.reduce((total, c) => {
      return total + (c.status === "approved" ? 1 : 0);
    }, 0);

    const totalapend = course.reduce((total, c) => {
      return total + (c.status === "pending" ? 1 : 0);
    }, 0);

    const totalareject = course.reduce((total, c) => {
      return total + (c.status === "rejected" ? 1 : 0);
    }, 0);


  return (
    <DashboardLayoutF role="formateur">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your courses.</p>
      </div>

    {/* Stats Cards */}
    <div className="grid mb-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Courses */}
        <div className="p-4 rounded-xl shadow bg-white flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <h2 className="text-2xl font-bold text-foreground">{totalCourse}</h2>
            </div>
            <div className="p-3 rounded-full bg-primary/10">
                <BookOpen className="text-primary" size={24} />
            </div>
        </div>

        {/* Approved */}
        <div className="p-4 rounded-xl shadow bg-white flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <h2 className="text-2xl font-bold text-foreground">{totalaprov}</h2>
            </div>
            <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle className="text-green-500" size={24} />
            </div>
        </div>

    {/* Pending Review */}
    <div className="p-4 rounded-xl shadow bg-white flex justify-between items-center">
        <div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
            <h2 className="text-2xl font-bold text-foreground">{totalapend}</h2>
    </div>
        <div className="p-3 rounded-full bg-yellow-500/10">
            <Clock className="text-yellow-500" size={24} />
        </div>
    </div>

    {/* Rejected */}
    <div className="p-4 rounded-xl shadow bg-white flex justify-between items-center">
        <div>
            <p className="text-sm text-muted-foreground">Rejected</p>
            <h2 className="text-2xl font-bold text-foreground">{totalareject}</h2>
        </div>
        <div className="p-3 rounded-full bg-red-500/10">
            <XCircle className="text-red-500" size={24} />
        </div>
    </div>
    </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Activity / Courses */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
              <Clock size={20} className="text-[#15BE6A]" />
              Recent Courses
            </h2>
          </div>
          <div className="divide-y divide-border">
            {course.slice(-3).reverse().map((course) => (
              <div key={course.id} className="p-5 hover:bg-secondary/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Updated {course.updatedAt}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'approved' ? 'bg-green-500/15 text-green-600' :
                    course.status === 'pending' ? 'bg-yellow-500/15 text-yellow-600' :
                    'bg-red-500/15 text-red-600'
                  }`}>
                    {course.status === 'approved' && <CheckCircle size={12} />}
                    {course.status === 'pending' && <Clock size={12} />}
                    {course.status === 'rejected' && <XCircle size={12} />}
                    <span className="capitalize">
                      {course.status}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border bg-secondary/20">
            <p onClick={()=>(navigate("/FormateurCourses"))}  className="text-sm cursor-pointer text-[#15BE6A] hover:underline flex items-center gap-1">
              View all courses →
            </p>
          </div>
        </div>

        
          
          

          {/* Getting Started */}
          <div className="bg-gradient-to-br from-[#15BE6A]/10 to-transparent border border-[#15BE6A]/20 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold font-display text-foreground mb-2">Getting Started</h2>
            <p className="text-muted-foreground mb-6">
              Ready to share your knowledge? Create a new course, add engaging video lessons, and submit it for review by your center.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={()=>navigate("/CourseForm")} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#15BE6A] text-white rounded-xl font-semibold hover:bg-[#0d8a4a] transition-colors shadow-lg shadow-[#15BE6A]/20">
                <Plus size={18} />
                Create New Course
              </button>
              <button onClick={()=>(navigate("/FormateurCourses"))} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors">
                <BookOpen size={18} />
                Browse My Courses
              </button>
            </div>
          </div>
        </div>
    </DashboardLayoutF>
  );
}