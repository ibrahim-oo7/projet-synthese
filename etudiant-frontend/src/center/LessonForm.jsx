import { DashboardLayoutF } from "./DashboardLayoutF";
import { ArrowLeft, Save, Plus, Video, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function LessonForm() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([
    { title: "", video: null, content: "" ,duration: 0}
  ]);

  function addLesson(){
    setLessons([...lessons, { title: "", video: null, content: "" }]);
  };

  function removeLesson(index){
    const newLessons = lessons.filter((_, i) => i !== index);
    setLessons(newLessons);
  };

  function handleChange(index, field, value) {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  }

  // calculate duration
  function handleVideoChange(index, file) {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);

      const duration = Math.floor(video.duration); 
      const updated = [...lessons];
      updated[index].video = file;
      updated[index].duration = duration;
      setLessons(updated);
    };

    video.src = URL.createObjectURL(file);
  }

  async function CreateLesson(e) {
  e.preventDefault();

  const requests = lessons.map((lesson,index) => {
    const formData = new FormData();

    formData.append("title", lesson.title);
    formData.append("content", lesson.content);
    formData.append("video", lesson.video);
    formData.append("duration", lesson.duration);
    formData.append("order", index + 1);

    return axios.post(
      `http://127.0.0.1:8001/api/courses/${courseId}/lessons`,formData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  });
  await Promise.all(requests);
  navigate("/FormateurCourses");
  window.scrollTo(0, 0);
}

  function Cancel(){
    setLessons([{ title: "", content: "", video: null }]);
  }

  return (
    <DashboardLayoutF role="formateur">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <p onClick={()=> navigate(`/FormateurCourses/${courseId}`)} className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Course
          </p>
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Add New Lessons
        </h1>
        <p className="text-muted-foreground mt-1">
          React pour Débutants - Create lessons for your course
        </p>
      </div>

      {/* Lessons Forms */}
      {lessons.map((lesson, index) => (
        <div key={index} className="bg-card border border-border rounded-2xl shadow-sm max-w-3xl p-6 md:p-8 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-display text-foreground">Lesson {index + 1}</h2>
            {lessons.length > 1 && (
              <button onClick={() => removeLesson(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Lesson Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Lesson Title</label>
              <input type="text" value={lesson.title} onChange={(e) =>handleChange(index, "title", e.target.value)}
               className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all" placeholder="e.g. Introduction to React" />
            </div>

            {/* Video File Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Video File</label>
              <div className="flex items-center gap-4">
                <input type="file" onChange={(e) => handleVideoChange(index, e.target.files[0])} accept="video/*" className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#15BE6A] file:text-white hover:file:bg-[#0d8a4a]" />
              </div>
              <p className="text-xs text-muted-foreground">Supported formats: MP4, MOV, AVI (Max 500MB)</p>
            </div>

            {/* Lesson Content */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Lesson Content</label>
              <textarea value={lesson.content} onChange={(e) =>handleChange(index, "content",e.target.value)} rows={3} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all resize-y" placeholder="Write your lesson content or description here..." />
            </div>
          </div>
        </div>
      ))}

      {/* Add Lesson Button */}
      <div className="max-w-3xl mb-6">
        <button onClick={addLesson} className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-[#15BE6A] hover:text-[#15BE6A] hover:bg-[#15BE6A]/5 transition-all font-medium" >
          <Plus size={18} />
          Add Another Lesson
        </button>
      </div>

      {/* Submit Button */}
      <div className="bg-card border border-border rounded-2xl shadow-sm max-w-3xl p-6 md:p-8">
        <div className="pt-4 border-t border-border flex justify-end gap-3">
          <button onClick={Cancel} className="px-6 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors">
            Cancel
          </button>
          <button onClick={CreateLesson} type="submit" className="px-8 py-3 bg-[#15BE6A] text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2" >
            <Save size={18} /> Save All Lessons
          </button>
        </div>
      </div>
    </DashboardLayoutF>
  );
}