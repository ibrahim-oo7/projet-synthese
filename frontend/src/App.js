import { Routes,Route } from "react-router-dom";
import CenterDashboard from "./CenterDashboard";
import CenterFormateurs from "./CenterFormateurs";
import CenterCourses from "./CenterCourses";
import CourseReview from "./CourseReview";
import CourseForm from "./CourseForm";
import Login from "./Login";
import Register from "./Register";
import AddFormateur from "./AddFormateur";
import FormateurDetails from "./FormateurDetails";
import UpdateFormateur from "./UpdateFormateur";
import FormateurCourses from "./FormateurCourses";
import LessonForm from "./LessonForm";
import CourseDetails from "./CourseDetails";
import UpdateCourse from "./UpdateCourse";
import LessonDetails from "./LessonDetails";
import UpdateLesson from "./UpdateLesson";
import FormateurDashboard from "./FormateurDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/CenterDashboard" element={<CenterDashboard/>}/>
        <Route path="/CenterCourses" element={<CenterCourses/>}/>
        <Route path="/CourseReview/:id" element={<CourseReview/>}/>
        <Route path="/CenterFormateurs" element={<CenterFormateurs/>}/>
        <Route path="/AddFormateur" element={<AddFormateur/>}/>
        <Route path="/CourseForm" element={<CourseForm/>}/>
        <Route path="/CenterFormateurs/:id" element={<FormateurDetails/>}/>
        <Route path="/UpdateFormateur/:id" element={<UpdateFormateur/>}/>
        <Route path="/FormateurCourses" element={<FormateurCourses/>}/>
        <Route path="/FormateurCourses/:id" element={<CourseDetails/>}/>
        <Route path="/UpdateCourse/:id" element={<UpdateCourse/>}/>
        <Route path="/LessonForm/:courseId" element={<LessonForm/>}/>
        <Route path="/LessonDetails/:lessonId" element={<LessonDetails/>}/>
        <Route path="/UpdateLesson/:lessonId" element={<UpdateLesson/>}/>
        <Route path="/FormateurDashboard" element={<FormateurDashboard/>}/>
      </Routes>
      {/* <FormateurDashboard/> */}
      {/* <FormateurCourses/> */}
      {/* <FormateurCourses/> */}
     
    </div>
  );
}

export default App;
