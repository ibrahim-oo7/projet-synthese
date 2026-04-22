import { DashboardLayout } from "./DashboardLayout";
import { ArrowLeft, Save, Upload, User, Mail, Lock, BookOpen, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AddFormateur() {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [bio,setBio] = useState("")
    const [profileImage, setProfileImage] = useState(null)
    const [message, setMessage] = useState("")

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

    function AddTeacher(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio); 
        formData.append("profile_image", profileImage);

        axios.post("http://127.0.0.1:8001/api/teacher", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
       }).then(() => {navigate("/CenterFormateurs");})
    }


  return (
    <DashboardLayout role="center">
      <div className="mb-8">
        <div onClick={()=>navigate("/CenterFormateurs")} className="cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Formateurs
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Add New Formateur
        </h1>
        <p className="text-muted-foreground mt-1">
          Register a new instructor to your center.
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
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all"
              placeholder="e.g. John Doe"/>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Mail size={16} /> Email Address <span className="text-destructive">*</span>
            </label>
            <input 
              type="email" value={email} onChange={onchangeEmail}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all"
              placeholder="instructor@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lock size={16} /> Password <span className="text-destructive">*</span>
            </label>
            <input 
              type="password" value={password} onChange={onchangePassword}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all"
              placeholder="••••••••"
            />
            <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
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
              <input type="file" onChange={onchangeProfileImage} className="px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2" />
            </div>
            <p className="text-xs text-muted-foreground">Recommended: Square image, max 2MB</p>
          </div>

          {/* Optional: Additional Info */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Bio / Specialization</label>
            <textarea  value={bio} onChange={onchangeBio}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all resize-y"
              placeholder="Brief description about the instructor's expertise..."
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <div onClick={()=>navigate("/CenterFormateurs")} className="px-6 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors">
              Cancel
            </div>
            <button onClick={AddTeacher}
              type="submit" 
              className="px-8 py-3 bg-[#15BE6A] text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Save size={18} />
              Add Formateur
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}