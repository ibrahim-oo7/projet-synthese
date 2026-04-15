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
import Enroll from "../pages/student/Enroll";
import ProtectedRoute from "./ProtectedRoute";

import Course from "../componentsQuiz/Course";
import CourseIntro from "../componentsQuiz/CourseIntro";
import Module1 from "../componentsQuiz/Module1";
import Module2 from "../componentsQuiz/Module2";
import QuizPage from "../componentsQuiz/QuizPage";
import ResultPage from "../componentsQuiz/Result";
import AllCourses from "../componentsQuiz/AllCourses";
import Ho from "../componentsQuiz/Ho";
import Certificate from "../pages/student/Certificate";
import MyCertificates from "../pages/student/MyCertificates";

import ForgetPassword from "../pages/public/forgetPassword";
import ResetPassword from "../pages/public/resetPassword";
import VerifyPassword from "../pages/public/verifyPassword";


export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout/>}>
                 <Route path="/" element={<Home/>}></Route>
                 <Route path="/courses" element={<Courses/>}></Route> 
                 <Route path="/course/:id" element={<CourseDetails />} />  
                 <Route path="/Enroll/:id" element={<Enroll />} />  
                 <Route path="/about" element={<About />} />   
                 <Route path="/blog" element={<Blog/>} />   
                 <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgetPassword" element={<ForgetPassword/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path="/verifyPassword" element={<VerifyPassword/>}/>
                <Route path="/student/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                <Route path="/student/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
                <Route path="/certificate/:courseId" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
                <Route path="/student/my-certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />
                <Route path="/student/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/profile/:username" element={<PublicProfile />} />
                <Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                <Route path="/result/:id" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
                <Route path="/allCourses" element={<AllCourses />} />
                </Route>

                {/* quiz routes */}
                
            </Routes>
        </BrowserRouter>
    )
}