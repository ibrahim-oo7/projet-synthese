import { DashboardLayoutF } from "./DashboardLayoutF";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function UpdateCourse() {
    const navigate= useNavigate();
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");
    const [course_image,setImage] = useState("");
    const [level, setLevel] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/courses", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setCourse(res.data);
        })
    }, []);
    const exist2 = course.find(f => f.id === Number(id));

    useEffect(() => {
        const exist = course.find(f => f.id === Number(id));
        if (exist) {
            setTitle(exist?.title);
            setCategory(exist?.category);
            setDescription(exist?.description);
            setImage(exist?.course_image);
            setLevel(exist?.level);
        }
  
    }, [course, id]);

    function onchangeTitle(e){
        setTitle(e.target.value)
    }
    function onchangeCategory(e){
        setCategory(e.target.value)
    }
    function onchangeLevel(e){
        setLevel(e.target.value)
    }
    function onchangeDescription(e){
        setDescription(e.target.value)
    }
    function onchangeImage(e){
        setImage(e.target.files[0])
    }

    async function UpdateCourse(e){
        e.preventDefault();
    
        const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("level", level);
            formData.append("course_image", course_image);
            formData.append("_method", "PUT");
            await axios.post(`http://127.0.0.1:8001/api/courses/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(() => {navigate("/FormateurCourses");})

    }

    function Cancel(){
        const exist = course.find(f => f.id === Number(id));
        if (!exist) return;

        setTitle(exist.title);
        setCategory(exist.category);
        setDescription(exist.description);
        setImage(exist.course_image);
        setLevel(exist.level);
        }

  return (
    <DashboardLayoutF role="formateur">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <p onClick={()=>navigate("/FormateurCourses")} className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Courses
          </p>
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">Update Course</h1>
        <p className="text-muted-foreground mt-1">Edit the details of your course.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm max-w-3xl p-6 md:p-8">
        <div className="space-y-6">
          
          {/* Course Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Course Title</label>
            <input type="text" value={title} onChange={onchangeTitle}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all" 
              placeholder="e.g. Advanced React Patterns" 
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Category</label>
            <select value={category} onChange={onchangeCategory}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all appearance-none">
              <option value="">Select a category</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Marketing">Marketing</option>
              <option value="Photography">Photography</option>
            </select>
          </div>

          {/* Course Image */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Course Image</label>
            
            {/* Existing Image Preview */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Current Image:</p>
              <div className="relative inline-block">
                <img src={`http://127.0.0.1:8001/storage/${exist2?.course_image}`} alt={course_image} 
                  className="w-32 h-32 object-cover rounded-xl border border-border"/>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <input type="file" onChange={onchangeImage} className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#15BE6A] file:text-white hover:file:bg-[#0d8a4a]"/>
            </div>
            <p className="text-xs text-muted-foreground">Leave empty to keep current image. Recommended: Square Image, max 2MB</p>
          </div>

          {/* Level */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Level</label>
            <select value={level} onChange={onchangeLevel}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all appearance-none">
              <option value="">Select a Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Description</label>
            <textarea value={description} onChange={onchangeDescription} rows={5} 
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all resize-y"  placeholder="Describe what students will learn..."/>
          </div>

          {/* div Actions */}
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button onClick={Cancel} className="px-6 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors">
              Cancel
            </button>
            <button onClick={UpdateCourse} type="submit"className="px-8 py-3 bg-[#15BE6A] text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Save size={18} /> Update Course
            </button>
          </div>
        </div>
      </div>
    </DashboardLayoutF>
  );
}