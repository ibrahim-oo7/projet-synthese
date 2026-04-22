import { DashboardLayoutF } from "./DashboardLayoutF";
import { ArrowLeft, Edit, Trash2, Video, FileText, Clock, Eye, ThumbsUp, MessageCircle } from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function LessonDetails() {
    const navigate = useNavigate();  
    
    const [lesson, setLesson] = useState(null);
    const { lessonId } = useParams();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8001/api/lessons/${lessonId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setLesson(res.data.lesson);
        })
    }, []);

    if (!lesson) {
      return <div>Loading...</div>;
    }

    function formatDuration(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;

      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }

    async function DeleteLesson(){
      await axios.delete(`http://127.0.0.1:8001/api/lessons/${lesson.id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        navigate("/FormateurCourses")
    }
  

  return (
    <DashboardLayoutF role="formateur">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Course
          </p>
          <div className="flex gap-3">
            <button onClick={()=>navigate(`/UpdateLesson/${lesson.id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2">
              <Edit size={18} /> Edit Lesson
            </button>
            <button onClick={DeleteLesson} className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center gap-2">
              <Trash2 size={18} /> Delete Lesson
            </button>
          </div>
        </div>
        
        <div>
          {/* <p className="text-sm text-muted-foreground mb-1">
            {course.title} / Lesson {lesson?.order}
          </p> */}
          <h1 className="text-3xl font-display font-bold text-foreground">{lesson?.title}</h1>
          <p className="text-muted-foreground mt-1">Lesson details and statistics</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Duration */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-xl font-bold text-foreground">{formatDuration(lesson?.duration) || "00:00"}</p>
          </div>
          </div>

        {/* Views */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
            <Eye size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Views</p>
            <p className="text-xl font-bold text-foreground">{lesson?.views || 0}</p>
          </div>
        </div>

        {/* Likes */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
            <ThumbsUp size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Likes</p>
            <p className="text-xl font-bold text-foreground">{lesson?.likes || 0}</p>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
            <MessageCircle size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Comments</p>
            <p className="text-xl font-bold text-foreground">{lesson?.comments_count || 0}</p>
          </div>
        </div>
      </div>

      {/* Lesson Information Card */}
      <div className="bg-card mb-8 border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Clock size={20} className="text-[#15BE6A]" />
            Lesson Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Lesson Type</p>
              <div className="flex items-center gap-2">
                    <Video size={16} className="text-blue-500" />
                    <span className="font-medium text-foreground">Video Lesson</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order in Course</p>
              <p className="font-medium text-foreground">Lesson {lesson.order}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Created Date</p>
              <p className="font-medium text-foreground">
                {new Date(lesson.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
              <p className="font-medium text-foreground">
                {new Date(lesson.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Video Section */}
      
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Video size={20} className="text-[#15BE6A]" />
              Video lesson?
            </h2>
          </div>
          <div className="p-6">
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-secondary/10 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <video src={`http://127.0.0.1:8001/storage/${lesson.video}`} controls></video> 
              </div>
            </div>
          </div>
        </div>
      

      {/* lesson? Content Section */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText size={20} className="text-[#15BE6A]" />
            lesson? Content
          </h2>
        </div>
        <div className="p-6">
          <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
            {lesson?.content}
          </div>
        </div>
      </div>


    </DashboardLayoutF>
  );
}