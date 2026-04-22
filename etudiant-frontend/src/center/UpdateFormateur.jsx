import { DashboardLayout } from "./DashboardLayout";
import { ArrowLeft, Save, Upload, User, Mail, Lock, BookOpen, Image } from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function UpdateFormateur() {
    const navigate= useNavigate();
    const [formateurs, setFormateurs] = useState([]);
    const { id } = useParams();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [bio,setBio] = useState("")
    const [profileImage, setProfileImage] = useState(null)

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/teacher", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setFormateurs(res.data);
        })
    }, []);
    

    

    useEffect(() => {
        const exist = formateurs.find(f => f.id === Number(id));
        if (exist) {
            setName(exist?.name);
            setEmail(exist?.email);
            setBio(exist?.bio);
            setPassword(""); 
        }
  
    }, [formateurs, id]);

    function onchangeName(e){
        setName(e.target.value)
    }
    function onchangeEmail(e){
        setEmail(e.target.value)
    }
    function onchangePassword(e){
        setPassword(e.target.value)
    }
    function onchangeBio(e){
        setBio(e.target.value)
    }
    function onchangeProfileImage(e){
        setProfileImage(e.target.files[0])
    }

    async function FormateurUpdate() {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            if (password) formData.append("password", password);
            formData.append("bio", bio);
            if (profileImage) formData.append("profile_image", profileImage);
            formData.append("_method", "PUT");
            await axios.post(`http://127.0.0.1:8001/api/teacher/${id}`,formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
                
            ).then(() => {navigate("/CenterFormateurs");}) 
            
    }

  return (
    <DashboardLayout role="center">
      <div className="mb-8">
        <div className="cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Formateurs
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Update Formateur
        </h1>
        <p className="text-muted-foreground mt-1">
          Edit instructor information
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm max-w-3xl p-6 md:p-8">
        <div className="space-y-6">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User size={16} /> Full Name <span className="text-destructive">*</span>
            </label>
            <input type="text" value={name} onChange={onchangeName} 
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all" placeholder="e.g. John Doe"/>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Mail size={16} /> Email Address <span className="text-destructive">*</span>
            </label>
            <input type="email" value={email} onChange={onchangeEmail}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all" placeholder="instructor@example.com"/>
          </div>

          {/* Password (optional for update) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lock size={16} /> New Password
            </label>
            <input type="password" value={password} onChange={onchangePassword}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all" placeholder="Leave blank to keep current password"/>
            <p className="text-xs text-muted-foreground">Minimum 8 characters. Leave empty to keep current password.</p>
          </div>

          {/* Profile Image */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Image size={16} /> Profile Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-secondary border-2 border-dashed border-border flex items-center justify-center">
                <User size={32} className="text-muted-foreground" />
              </div>
              <input type="file" onChange={onchangeProfileImage}  className="px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2" />
            </div>
            <p className="text-xs text-muted-foreground">Recommended: Square image, max 2MB</p>
          </div>

          {/* Bio / Specialization */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Bio / Specialization</label>
            <textarea value={bio} onChange={onchangeBio} rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all resize-y" placeholder="Brief description about the instructor's expertise..."/>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <div className="px-6 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors cursor-pointer">
              Cancel
            </div>
            <button  onClick={FormateurUpdate} disabled={!name || !email}
              type="submit" 
              className="px-8 py-3 bg-[#15BE6A] text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Save size={18} />
              Update Formateur
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}