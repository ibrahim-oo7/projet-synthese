import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import { LayoutDashboard, BookOpen, PlusCircle, LogOut, Users, CheckCircle, GraduationCap} from "lucide-react";

export function DashboardLayoutF({ children, role }) {
  const navigate =useNavigate();
  const [name, setName] = useState("");
  useEffect(() => {
        async function getUser(){
            const nameUser = await axios.get("http://127.0.0.1:8001/api/user",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setName(nameUser.data.name);
        }getUser();
    }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col shrink-0 md:min-h-screen sticky top-0">
        <a href="/" className="flex items-center gap-2 group p-3 ml-3 mt-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#15BE6A] shadow-lg shadow-[#15BE6A]/20 transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-[#0A2E1C] tracking-tight">Forminova</span>
        </a>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <div onClick={()=>navigate("/FormateurDashboard")} className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
            <LayoutDashboard size={20} className="text-muted-foreground" />
            <p>Dashboard</p>
          </div>
          <div onClick={()=>navigate("/FormateurCourses")} className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
            <BookOpen size={20} className="text-muted-foreground" />
            <p>My Courses</p>
          </div>
          <div onClick={()=>navigate("/CourseForm")} className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
            <PlusCircle size={20} className="text-muted-foreground" />
            <p>Create Courses</p>
          </div>


        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="px-4 py-3 mb-2">
            <p className="text-sm font-semibold text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground capitalize">formateur</p>
          </div>
          <button onClick={()=>navigate("/Login")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-destructive/10 transition-colors font-medium">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto min-h-[calc(100vh-4rem)] md:min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}