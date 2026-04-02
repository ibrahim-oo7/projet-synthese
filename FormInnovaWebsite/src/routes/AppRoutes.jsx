import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";
import About from "../pages/public/About";
import Blog from "../pages/public/Blog";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Dashboard from "../pages/student/Dashboard";
import MyCourses from "../pages/student/MyCourses";
import Profile from "../pages/student/Profile";
import PublicProfile from "../pages/student/PublicProfile";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout/>}>
                 <Route path="/" element={<Home/>}></Route>
                 <Route path="/courses" element={<Courses/>}></Route> 
                 <Route path="/course/:id" element={<CourseDetails />} />  
                 <Route path="/about" element={<About />} />   
                 <Route path="/blog" element={<Blog/>} />   
                 <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/student/dashboard" element={<Dashboard/>} />
                <Route path="/student/my-courses" element={<MyCourses />} />
                <Route path="/student/profile" element={<Profile />} />
                <Route path="/profile/:username" element={<PublicProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}