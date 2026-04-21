import { DashboardLayout } from "./DashboardLayout";
import { ArrowLeft, Edit, Trash2, Mail, Calendar, BookOpen, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FormateurDetails() {
    const navigate= useNavigate();
    const [formateurs, setFormateurs] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/teacher", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setFormateurs(res.data);
        })
    }, []);

    const exist = formateurs.find(f => f.id === Number(id));

    if (!exist) {
      return <div>Loading...</div>;
    }

    async function DeleteFormateur(){
      await axios.delete(`http://127.0.0.1:8000/api/teacher/${id}`,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        navigate("/CenterFormateurs")
    }


  return (
    <DashboardLayout role="center">
      <div className="mb-8">
        <div onClick={()=>navigate("/CenterFormateurs")} className="cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Formateurs
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Formateur Details
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage instructor information
            </p>
          </div>
          
          <div className="flex gap-3">
            <button onClick={()=>navigate(`/UpdateFormateur/${exist.id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2">
              <Edit size={18}/> Modify
            </button>
            <button onClick={DeleteFormateur} className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center gap-2">
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#15BE6A] to-[#0d8a4a] flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden">
                <img src={`http://127.0.0.1:8000/storage/${exist.profile_image}`} alt={exist?.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-4">{exist?.name}</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail size={18} />
                  <span>{exist?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar size={18} />
                  <span>Joined January 2024</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-secondary/30 rounded-xl">
                <p className="text-sm text-foreground">{exist?.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen size={20} />
            Courses by {exist?.name}
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          {exist?.courses?.map(course => (
            <div key={course.id} className="p-6 hover:bg-secondary/10 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-foreground">{course.title}</h4>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'approved' 
                      ? 'bg-green-500/15 text-green-600' 
                      : 'bg-yellow-500/15 text-yellow-600'
                  }`}>
                    {course.status === 'approved' ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <button className="text-sm text-[#15BE6A] hover:underline">
                  View Course →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}