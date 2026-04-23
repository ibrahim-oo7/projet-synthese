import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import Courses from "../pages/public/Courses";
import CourseDetailsS from "../pages/public/CourseDetailsS";
import About from "../pages/public/About";
import Blog from "../pages/public/Blog";
// import Login from "../pages/public/Login";
// import Register from "../pages/public/Register";
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

import ForgetPassword from "../center/forgetPassword";
import ResetPassword from "../center/resetPassword";
import VerifyPassword from "../center/verifyPassword";



import CenterDashboard from "../center/CenterDashboard";
import CenterFormateurs from "../center/CenterFormateurs";
import CenterCourses from "../center/CenterCourses";
import CourseReview from "../center/CourseReview";
import CourseForm from "../center/CourseForm";
import Login from "../center/Login";
import RegisterCenter from "../center/Register";
import AddFormateur from "../center/AddFormateur";
import FormateurDetails from "../center/FormateurDetails";
import UpdateFormateur from "../center/UpdateFormateur";
import FormateurCourses from "../center/FormateurCourses";
import LessonForm from "../center/LessonForm";
import CourseDetails from "../center/CourseDetails";
import UpdateCourse from "../center/UpdateCourse";
import LessonDetails from "../center/LessonDetails";
import UpdateLesson from "../center/UpdateLesson";
import FormateurDashboard from "../center/FormateurDashboard";


export default function AppRoutes(){
    return(
       <BrowserRouter>
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/course/:id" element={<CourseDetailsS />} />
      <Route path="/Enroll/:id" element={<Enroll />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/verifyPassword" element={<VerifyPassword />} />
      <Route path="/profile/:username" element={<PublicProfile />} />
      <Route path="/allCourses" element={<AllCourses />} />
       <Route path="/student/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/student/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/certificate/:courseId" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
        <Route path="/student/my-certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/result/:id" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
    </Route>

   

    <Route path="/Login" element={<Login />} />
    <Route path="/Register" element={<RegisterCenter />} />
    <Route path="/CenterDashboard" element={<CenterDashboard />} />
    <Route path="/CenterCourses" element={<CenterCourses />} />
    <Route path="/CourseReview/:id" element={<CourseReview />} />
    <Route path="/CenterFormateurs" element={<CenterFormateurs />} />
    <Route path="/AddFormateur" element={<AddFormateur />} />
    <Route path="/CourseForm" element={<CourseForm />} />
    <Route path="/CenterFormateurs/:id" element={<FormateurDetails />} />
    <Route path="/UpdateFormateur/:id" element={<UpdateFormateur />} />
    <Route path="/FormateurCourses" element={<FormateurCourses />} />
    <Route path="/FormateurCourses/:id" element={<CourseDetails />} />
    <Route path="/UpdateCourse/:id" element={<UpdateCourse />} />
    <Route path="/LessonForm/:courseId" element={<LessonForm />} />
    <Route path="/LessonDetails/:lessonId" element={<LessonDetails />} />
    <Route path="/UpdateLesson/:lessonId" element={<UpdateLesson />} />
    <Route path="/FormateurDashboard" element={<FormateurDashboard />} />
  </Routes>
</BrowserRouter>
    )
}