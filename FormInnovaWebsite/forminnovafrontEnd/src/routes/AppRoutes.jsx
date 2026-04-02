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
                </Route>
            </Routes>
        </BrowserRouter>
    )
}