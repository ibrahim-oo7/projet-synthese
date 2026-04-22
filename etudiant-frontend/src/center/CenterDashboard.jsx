import { DashboardLayout } from "./DashboardLayout";
import { BookOpen, CheckCircle, Users, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CenterDashboard() {
  const [courses, setCourses] = useState([]);
  const [teacherStats, setTeacherStats] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    axios.get("http://127.0.0.1:8001/api/center/courses", { headers })
      .then(res => setCourses(res.data));

    axios.get("http://127.0.0.1:8001/api/center/teachers-stats", { headers })
      .then(res => setTeacherStats(res.data));
  }, []);

  const approvedCourses = courses.filter(c => c.status === "approved").length;
  const pendingCourses  = courses.filter(c => c.status === "pending").length;
  const rejectedCourses = courses.filter(c => c.status === "rejected").length;
  const totalCourses    = courses.length;


  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = d.toISOString().split("T")[0];
    let count = 0;

    courses.forEach(c => {
      if (c.created_at && c.created_at.startsWith(day)) {
        count++;
      }
    });

    chartData.push({
      date: day,
      courses: count   
    });
  }

  return (
    <DashboardLayout role="center">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Center Analytics</h1>
        <p className="text-muted-foreground mt-1">Platform overview and course performance.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500"><BookOpen size={24} /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
            <h3 className="text-3xl font-bold text-foreground">{totalCourses}</h3>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-green-500/10 text-green-500"><CheckCircle size={24} /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Approved</p>
            <h3 className="text-3xl font-bold text-foreground">{approvedCourses}</h3>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-orange-500/10 text-orange-500"><TrendingUp size={24} /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <h3 className="text-3xl font-bold text-foreground">{pendingCourses}</h3>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-purple-500/10 text-purple-500t"><Users size={24} /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Subscriptions</p>
            <h3 className="text-3xl font-bold text-foreground">100</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Courses par Formateur */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-bold font-display mb-6 text-foreground flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            Courses per Teacher
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teacherStats} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="teacher_name" type="category" width={150}
                  stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(val) => val.length > 20 ? val.substring(0, 20) + '...' : val} />
                <RechartsTooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="total" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-bold font-display mb-6 text-foreground flex items-center gap-2">
            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
            Courses Activity (Last 7 Days)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}/>
                <Line type="monotone" dataKey="courses" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: "#10B981" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}