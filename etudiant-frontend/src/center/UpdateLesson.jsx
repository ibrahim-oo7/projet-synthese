import { DashboardLayoutF } from "./DashboardLayoutF";
import { ArrowLeft, Save, Video } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateLesson() {
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const { courseId, lessonId } = useParams();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState(null);
  
  useEffect(() => {
        axios.get(`http://127.0.0.1:8001/api/lessons/${lessonId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
          const data = res.data.lesson;
          setLesson(data);
          setTitle(data.title);
          setContent(data.content);
        })
    }, []);

    if (!lesson) {
      return <div>Loading...</div>;
    }
    

    function onchangeTitle(e){
        setTitle(e.target.value)
    }
    function onchangeContent(e){
        setContent(e.target.value)
    }

    function formatDuration(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;

      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }

    function onchangetVideo(e){
      const file = e.target.files[0];
      setVideo(file);

      if (file) {
        const vid = document.createElement("video");
        vid.preload = "metadata";

        vid.onloadedmetadata = () => {
          window.URL.revokeObjectURL(vid.src);
          setDuration(Math.floor(vid.duration));
        };

        vid.src = URL.createObjectURL(file);
      }
    }
  
  

    async function Update(e){
        e.preventDefault();
    
        const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (video) {
              formData.append("video", video);
            }
            if (duration) {
              formData.append("duration", duration);
            }
            formData.append("_method", "PUT");
            await axios.post(`http://127.0.0.1:8001/api/lessons/${lessonId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(() => {navigate("/FormateurCourses");})

    }

    function Cancel(){
        if (!lesson) return;

        setTitle(lesson.title);
        setContent(lesson.content);
        setVideo(null);
        setDuration(null);
        }

  return (
    <DashboardLayoutF role="formateur">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Course
          </p>
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Update Lesson
        </h1>
        <p className="text-muted-foreground mt-1">
          Edit your lesson details
        </p>
      </div>

      {/* Update Lesson Form */}
      <div className="bg-card border border-border rounded-2xl shadow-sm max-w-3xl p-6 md:p-8">
        <form className="space-y-6">
          {/* Lesson Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Lesson Title</label>
            <input type="text" value={title} onChange={onchangeTitle}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all" placeholder="e.g. Introduction to React" />
          </div>

          {/* Video File Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Video File</label>
            
            {/* Existing Video Info */}
            
              <div className="mb-3 p-3 bg-secondary/30 rounded-xl">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Video size={16} />
                
                </p>
                <p className="text-xs text-muted-foreground mt-1">Upload a new video to replace the current one</p>
              </div>
           
            
            <div className="flex items-center gap-4">
              <input type="file" onChange={onchangetVideo} accept="video/*" 
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#15BE6A] file:text-white hover:file:bg-[#0d8a4a]"/>
            </div>
            <p className="text-xs text-muted-foreground">Supported formats: MP4, MOV, AVI (Max 500MB). Leave empty to keep current video.</p>
          </div>

          {/* Duration Display */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Duration</label>
              <div className="px-4 py-3 bg-secondary/30 rounded-xl text-foreground">
                {formatDuration(duration || lesson.duration)} 
              </div>
            </div>

          {/* Lesson Content */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Lesson Content</label>
            <textarea value={content} onChange={onchangeContent} rows={6} 
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-[#15BE6A]/100 transition-all resize-y" placeholder="Write your lesson content or description here..." />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button type="button" onClick={Cancel} className="px-6 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors">
              Cancel
            </button>
            <button onClick={Update} type="submit" className="px-8 py-3 bg-[#15BE6A] text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Save size={18} /> Update Lesson
            </button>
          </div>
        </form>
      </div>
    </DashboardLayoutF>
  );
}