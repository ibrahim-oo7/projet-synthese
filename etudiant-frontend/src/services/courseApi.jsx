import axios from "axios";

const COURSE_API = "http://127.0.0.1:8001/api";
const STUDENT_API = "http://127.0.0.1:8000/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

export const fetchAllCourses = async () => {
  const res = await axios.get(`${COURSE_API}/courses`, getAuthHeaders());
  return res.data;
};

export const fetchCourseById = async (id) => {
  const res = await axios.get(`${COURSE_API}/courses/${id}`, getAuthHeaders());
  return res.data;
};

export const fetchMyEnrollments = async () => {
  const res = await axios.get(`${STUDENT_API}/my-enrollments`, getAuthHeaders());
  return res.data;
};

export const fetchStudentProgressByUser = async (userId) => {
  const res = await axios.get(`${STUDENT_API}/progress/${userId}`, getAuthHeaders());
  return res.data;
};

export const fetchStudentProgressByCourse = async (userId, courseId) => {
  const res = await axios.get(`${STUDENT_API}/progress/${userId}/${courseId}`, getAuthHeaders());
  return res.data;
};
export const normalizeCourse = (course) => {
  return {
    id: course.id,
    title: course.title || course.name || "Untitled Course",
    description: course.description || "",
    image:
      course.course_image ||
      course.image ||
      course.image_url ||
      "https://via.placeholder.com/400x250?text=Course",
    level: course.level || "beginner",
    category: course.category || "development",
    rating: Number(course.rating || 0),
    reviews: Number(course.reviews || 0),
    duration: course.duration || "N/A",
    price: Number(course.price || 0),
    instructor:
      course.instructor ||
      course.formateur?.name ||
      course.teacher?.name ||
      course.teacher?.full_name ||
      "Unknown Instructor",
    center: {
      name:
        course.center?.name ||
        course.centre?.name ||
        course.education_center?.name ||
        course.educationCenter?.name ||
        "Unknown Center",
      logo:
        course.center?.logo ||
        course.centre?.logo ||
        course.education_center?.logo ||
        course.educationCenter?.logo ||
        "https://via.placeholder.com/40?text=C",
      location:
        course.center?.location ||
        course.centre?.location ||
        course.education_center?.location ||
        course.educationCenter?.location ||
        "",
      description:
        course.center?.description ||
        course.centre?.description ||
        course.education_center?.description ||
        course.educationCenter?.description ||
        "",
      goal:
        course.center?.goal ||
        course.centre?.goal ||
        course.education_center?.goal ||
        course.educationCenter?.goal ||
        "",
    },
    lessons: Array.isArray(course.lessons) ? course.lessons : [],
    modules: Array.isArray(course.modules) ? course.modules : [],
  };
};