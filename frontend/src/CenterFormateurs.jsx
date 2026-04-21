import { DashboardLayout } from "./DashboardLayout";
import { format, set } from "date-fns";
import { Users, Mail, Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function CenterFormateurs() {
  const navigate = useNavigate();
  const [formateur,setFormateur] = useState([]);
  useEffect(()=>{
    async function getFormateurs(){
      const donneFormateur = await axios.get("http://127.0.0.1:8000/api/teacher",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setFormateur(donneFormateur.data)
          }getFormateurs(); 
  },[])



  return (
    <DashboardLayout role="center">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Affiliated Formateurs</h1>
          <p className="text-muted-foreground mt-1">Manage instructors registered under your center.</p>
        </div>
        <button onClick={()=>navigate("/AddFormateur")} className="px-4 py-2 bg-[#15BE6A] text-white hover:bg-destructive hover:text-white rounded-lg font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
          <Plus size={18} /> Add Teacher
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formateur.length === 0 && <p>No formateurs found</p>}
        {formateur.map(f => (
          
          <div key={f.id} onClick={()=>navigate(`/CenterFormateurs/${f.id}`)} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0 overflow-hidden">
                <img src={`http://127.0.0.1:8000/storage/${f.profile_image}`} alt={f.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-foreground truncate">{f.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <Mail size={14} />
                  <span className="truncate">{f.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
                  <Calendar size={14} />
                  <span>Create {format(new Date(f.created_at), 'MMM yyyy')}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-sm font-medium">
              <span className="text-primary hover:underline cursor-pointer">View Courses</span>
              <span className="bg-secondary px-2 py-1 rounded text-xs text-muted-foreground">ID: {f.id}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}