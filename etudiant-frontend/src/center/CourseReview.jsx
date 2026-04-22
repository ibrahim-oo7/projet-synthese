import { DashboardLayout } from "./DashboardLayout";
import { StatusBadge } from "./StatusBadge";
import { ArrowLeft, CheckCircle, XCircle, PlayCircle, FileText } from "lucide-react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";


export default function CourseReview() {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    axios.get(`http://127.0.0.1:8001/api/center/courses/${id}`, { headers })
      .then(res => setCourse(res.data));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  const isPending = course.status === "pending";


  async function updateStatus(newStatus) {
    const headers = {Authorization: `Bearer ${localStorage.getItem("token")}`};
    const res = await axios.post(`http://127.0.0.1:8001/api/center/courses/${id}/status`,
      { status: newStatus },
      { headers }
    );
  setCourse(res.data.course);
  }

  return (
    <DashboardLayout role="center">
      <div className="mb-6">
        <p  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Catalog
        </p>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold text-foreground">{course.title}</h1>
              <StatusBadge status={course.status} />
            </div>
            <p className="text-muted-foreground max-w-3xl">{course.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm font-medium">
              <span className="bg-secondary px-3 py-1 rounded-full text-foreground">{course.category}</span>
              <span className="text-muted-foreground">By Formateur: <span className="text-foreground">{course?.teacher?.name}</span></span>
            </div>
          </div>
          
          {isPending && (
            <div className="flex flex-col items-end gap-3 shrink-0 bg-card p-4 rounded-xl border border-border shadow-sm">
              <p className="text-sm font-bold text-foreground mb-1">Review Actions</p>
              <div className="flex items-center gap-2">
                <button onClick={() => updateStatus("rejected")} className="px-4 py-2 bg-red-500 border border-destructive text-white hover:bg-destructive hover:text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                  <XCircle size={18} /> Reject
                </button>
                <button onClick={() => updateStatus("approved")} className="px-4 py-2 bg-[#15BE6A] bg-success text-white hover:bg-success/90 rounded-lg font-semibold shadow-md shadow-success/20 transition-all flex items-center gap-2">
                  <CheckCircle size={18} /> Approve Course
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold font-display border-b border-border pb-2">Course Curriculum ({course?.lessons?.length || 0} Lessons)</h2>
        <div className="grid grid-cols-1 gap-6">
          {course?.lessons?.map((lesson, idx) => (
            <div key={lesson.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center font-bold text-sm shadow-sm">{idx + 1}</span>
                <h3 className="font-bold text-lg text-foreground flex-1">{lesson.title}</h3>
              </div>
              <div className="p-6">
                {lesson?.video ? (
                  <div className="mb-6 rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-secondary/10 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                      <video src={`http://127.0.0.1:8001/storage/${lesson.video}`} controls></video> 
                    </div>
                  </div>
                ) : null}
                
                {lesson.content ? (
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <div className="flex items-center gap-2 mb-3 text-foreground font-semibold">
                      <FileText size={18} /> Lesson Content
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 font-sans whitespace-pre-wrap">
                      {lesson.content}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}