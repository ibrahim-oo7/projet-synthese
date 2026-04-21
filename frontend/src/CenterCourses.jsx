import { DashboardLayout } from "./DashboardLayout";
import { StatusBadge } from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { Eye, Search, Filter } from "lucide-react";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function CenterCourses() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialStatus = location.state?.status || "all"; // all by default
  const [status, setStatus] = useState(initialStatus);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setStatus(location.state?.status || "all");
  }, [location.state]);

  function search(e){
    setSearchTerm(e.target.value)
  }
  
    const [courses, setCourses] = useState([]);
    const [teacherStats, setTeacherStats] = useState([]);
  
    useEffect(() => {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      axios.get("http://127.0.0.1:8000/api/center/courses", { headers })
        .then(res => setCourses(res.data));
    }, []);

  const filteredCourses = (courses || []).filter(course => {
  const statusMatch = status === "all" ? true : course.status === status;
  const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
  return statusMatch && searchMatch;
  });

  return (
    <DashboardLayout role="center">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Course Catalog</h1>
        <p className="text-muted-foreground mt-1">Review and manage courses submitted by your formateurs.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input type="text" onChange={search} placeholder="Search courses..."  className="w-full pl-10 pr-4 py-2 bg-secondary border-transparent rounded-lg focus:bg-background focus:border-[#15BE6A] focus:ring-2 focus:ring-[#15BE6A]/100 transition-all outline-none"/>
          </div>
            <Filter size={16} className="text-muted-foreground ml-2 hidden sm:block" />
          
          <div className="flex items-center gap-2 bg-secondary p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
            <button onClick={() => setStatus('all')} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize ${
              status === 'all' ? 'bg-[#15BE6A] shadow-sm text-white' : 'text-muted-foreground'}`}>
              All</button>

            <button onClick={() => setStatus('pending')} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize ${
              status === 'pending' ? 'bg-[#15BE6A] shadow-sm text-white' : 'text-muted-foreground'}`}>
              Pending</button>

            <button onClick={() => setStatus('approved')} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize ${
              status === 'approved' ? 'bg-[#15BE6A] shadow-sm text-white' : 'text-muted-foreground'}`}>
              Approved</button>

            <button onClick={() => setStatus('rejected')} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize ${
              status === 'rejected' ? 'bg-[#15BE6A] shadow-sm text-white' : 'text-muted-foreground'}`}>
              Rejected</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground text-sm border-b border-border">
                <th className="px-6 py-4 font-semibold">Course Details</th>
                <th className="px-3 py-4 font-semibold">Formateur</th>
                <th className="px-9 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Subs</th>
                <th className="px-10 py-4 font-semibold text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCourses.map(course => (
                <tr key={course.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground text-base">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                       <span className="font-medium text-sm">{course.teacher?.name || "Unknown"}</span>
                      </div>
                      
                    </div>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={course.status} /></td>
                  <td className="px-6 py-4 font-mono font-medium">100</td>
                  <td className="px-6 py-4 text-right">
                    <div onClick={()=>navigate(`/CourseReview/${course.id}`)} className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-[#15BE6A] hover:text-white rounded-lg transition-colors font-medium text-sm" >
                      <Eye size={16} /> View
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}