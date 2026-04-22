import { DashboardLayoutF } from "./DashboardLayoutF";
import { ArrowLeft, Edit, Trash2,ListVideo , BookOpen, Calendar, Video, FileText, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const navigate = useNavigate();

  const [course, setCourse] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/courses", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setCourse(res.data);
        })
    }, []);

    const [loading, setLoading] = useState(true);
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8001/api/courses/${id}/lessons`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setLessons(res.data);
            setLoading(false);
        })
    }, [id]);

    const exist = course.find(f => f.id === Number(id));

    if (!exist) {
      return <div>Loading...</div>;
    }

    
    if (loading) {
      return <div>Loading lessons...</div>;
    }
    function formatDuration(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;

      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }

    const totalDuration = lessons.reduce((total, lesson) => {
      return total + (lesson.duration || 0);}, 0);

    async function DeleteLesson(lessonId) {
      
        await axios.delete(`http://127.0.0.1:8001/api/lessons/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          } 
        });

        setLessons(prev => prev.filter(l => l.id !== lessonId));
    }
  

  return (
    <DashboardLayoutF role="formateur">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <p onClick={()=>navigate("/FormateurCourses")} className="cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Courses
          </p>
          <div className="flex gap-3">
            <button onClick={()=>navigate(`/UpdateCourse/${exist?.id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2">
              <Edit size={18} /> Edit Course
            </button>
            <button onClick={()=>navigate(`/LessonForm/${exist?.id}`)} className="px-4 py-2 bg-[#15BE6A] text-white rounded-lg font-semibold hover:bg-[#0d8a4a] transition-all flex items-center gap-2">
              <Video size={18} /> Add Lesson
            </button>

          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-foreground">{exist?.title}</h1>
        <p className="text-muted-foreground mt-1">Course details and lessons management</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {/* Total Lessons */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
          <Video size={22} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Lessons</p>
          <p className="text-xl font-bold text-foreground">{lessons.length}</p>
        </div>
      </div>

      {/* Total Duration */}
      <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
          <Clock size={22} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Duration</p>
          <p className="text-xl font-bold text-foreground">{formatDuration(totalDuration)}</p>
        </div>
      </div>

      {/* Students Enrolled */}
      <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
          <Users size={22} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Students Enrolled</p>
          <p className="text-xl font-bold text-foreground">{course?.total_students}</p>
        </div>
      </div>

      {/* Status */}
      <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
          <CheckCircle size={22} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Status</p>
          <p className="text-xl font-bold text-foreground">{course?.status}</p>
        </div>
      </div>

    </div>

      {/* Course Information Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
            <BookOpen size={20} className="text-[#15BE6A]" />
            Course Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <p className="font-medium text-foreground">{exist?.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Level</p>
              <p className="font-medium text-foreground">{exist?.level}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                exist?.status === 'approved' 
                  ? 'bg-green-500/15 text-green-600' 
                  : exist?.status === 'pending'
                  ? 'bg-yellow-500/15 text-yellow-600'
                  : 'bg-red-500/15 text-red-600'
              }`}>
                {exist?.status === 'approved' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {exist?.status || "Pending"}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Created Date</p>
              <p className="font-medium text-foreground flex items-center gap-2">
                <Calendar size={16} />
                {new Date(exist?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Description</p>
            <p className="text-foreground leading-relaxed">{exist?.description}</p>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Video size={20} className="text-[#15BE6A]" />
            Course Lessons ({lessons.length})
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your course curriculum</p>
        </div>
        
        {lessons.length === 0 ? (
          <div className="p-12 text-center">
            <Video size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No lessons yet</p>
            <button onClick={()=>{navigate(`/LessonForm/${exist?.id}`);window.scrollTo(0, 0);}} className="inline-block px-4 py-2 bg-[#15BE6A] text-white rounded-lg font-semibold hover:bg-[#0d8a4a] transition-all">
              Add First Lesson
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="p-5 hover:bg-secondary/10 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="w-7 h-7 rounded-full bg-[#15BE6A]/10 text-[#15BE6A] flex items-center justify-center text-sm font-bold">
                        {lesson.order}
                      </span>
                      <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600">
                        <Video size={12} /> video
                      </span>
                      <span className="text-xs text-muted-foreground">⏱ {formatDuration(lesson.duration)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 ml-10">{lesson.content}</p>
                    {lesson.video_url && (
                      <div className="mt-2 ml-10">
                        <a href={lesson.video_url} target="_blank" rel="noreferrer" className="text-xs text-[#15BE6A] hover:underline flex items-center gap-1">
                          <Video size={12} /> Watch Video
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                     <button onClick={()=> navigate(`/LessonDetails/${lesson.id}`)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Manage Lessons">
                        <ListVideo size={18} />
                      </button>
                    <button onClick={()=> navigate(`/UpdateLesson/${lesson.id}`)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => DeleteLesson(lesson.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add Lesson Button at Bottom */}
        <div className="p-6 border-t border-border bg-secondary/20">
          <button onClick={()=>navigate(`/LessonForm/${exist?.id}`)} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-[#15BE6A] hover:text-[#15BE6A] transition-all font-medium">
            <Video size={18} />
            Add New Lesson
          </button>
        </div>
      </div>
    </DashboardLayoutF>
  );
}