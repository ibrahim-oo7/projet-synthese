import { DashboardLayoutF } from "./DashboardLayoutF";
import { format } from "date-fns";
import { Plus, Edit, Trash2, ListVideo, Search,CheckCircle,Clock,XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

export default function FormateurCourses() {
  const navigate = useNavigate();
  const [recherche,setRecherche] = useState("");

  function onchangeRecherche(e){
    setRecherche(e.target.value)
  }

  const [courses,setCourses] = useState([]);
  useEffect(()=>{
    async function getCourses(){
      const donneCourses = await axios.get("http://127.0.0.1:8001/api/courses",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setCourses(donneCourses.data)
          }getCourses(); 
  },[]);

  async function DeleteCourse(id){
    await axios.delete(`http://127.0.0.1:8001/api/courses/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setCourses(prev => prev.filter(course => course.id !== id));
        navigate("/FormateurCourses")
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(recherche.toLowerCase())
  );
  
  

  return (
    <DashboardLayoutF role="formateur">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your course catalog and lessons.</p>
        </div>
        <button onClick={()=>navigate("/CourseForm")} className="px-5 py-2.5 bg-[#15BE6A] text-white rounded-xl font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Plus size={18} />
          Create Course
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input value={recherche} onChange={onchangeRecherche} type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-2 bg-secondary border-transparent rounded-lg focus:bg-background focus:border-primary focus:ring-2 focus:ring-[#15BE6A]/100 transition-all outline-none"/>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground text-sm border-b border-border">
                <th className="px-6 py-4 font-semibold">Course Details</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Created</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground text-base">{course.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1 max-w-xs">{course.description}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{course.category}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'approved' ? 'bg-green-500/15 text-green-600' :
                      course.status === 'pending' ? 'bg-yellow-500/15 text-yellow-600' :
                      'bg-red-500/15 text-red-600'}`}>
                      {course.status === 'approved' && <CheckCircle size={12} />}
                      {course.status === 'pending' && <Clock size={12} />}
                      {course.status === 'rejected' && <XCircle size={12} />}
                      <span className="capitalize">
                        {course.status}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {format(new Date(course.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={()=> navigate(`/FormateurCourses/${course.id}`)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Manage Lessons">
                        <ListVideo size={18} />
                      </button>
                      <button onClick={()=>navigate(`/UpdateCourse/${course.id}`)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        title="Edit Course">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => DeleteCourse(course.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        title="Delete Course">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayoutF>
  );
}