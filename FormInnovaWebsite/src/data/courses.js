import aiBrain from "../assets/images/Ai Brain.jpg";
import design from "../assets/images/design.jpg";
import data from "../assets/images/data-science.jpg";

import devlogo from "../assets/images/devlogo.jpg";
import designLogo from "../assets/images/design logo.jpg";
import datalogo from "../assets/images/data.jpg";

export const courses = [

/* ===================== 1 ===================== */
{
  id: 1,
  title: "Complete React Developer",
  image: aiBrain,

  center: {
    name: "Tech Academy",
    logo: devlogo,
    location: "Casablanca, Morocco",
    description: "Tech Academy is a leading center specialized in modern web development and software engineering.",
    goal: "Train students to become professional developers ready for real-world jobs."
  },

  instructor: "Sarah Johnson",
  category: "development",
  level: "beginner",
  rating: 4.8,
  reviews: "2.1k",
  duration: "18h",
  price: 49,

  description: "Learn React from scratch and build powerful web applications. This course includes hands-on projects and real-world examples.",

  modules: [
    {
      title: "Introduction to React",
      lessons: [
        { title: "What is React?", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Setup Environment", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "Prototyping", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    },
    {
      title: "React Basics",
      lessons: [
        { title: "Components", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Props", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "State", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    },
    {
      title: "Advanced React",
      lessons: [
        { title: "Hooks", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Routing", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "API Integration", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    }
  ]
},

/* ===================== 2 ===================== */
{
  id: 2,
  title: "UI/UX Design Masterclass",
  image: design,

  center: {
    name: "Design School",
    logo: designLogo,
    location: "Rabat, Morocco",
    description: "Design School focuses on creative design and user experience training.",
    goal: "Help students become professional UI/UX designers with practical skills."
  },

  instructor: "Michael Brown",
  category: "design",
  level: "intermediate",
  rating: 4.7,
  reviews: "1.6k",
  duration: "15h",
  price: 59,

  description: "Master UI/UX design principles and create beautiful and user-friendly interfaces using modern tools.",

  modules: [
    {
      title: "Design Fundamentals",
      lessons: [
        { title: "Introduction to UI/UX", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Color Theory", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "Typography", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    },
    {
      title: "User Experience",
      lessons: [
        { title: "What is UX?", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Setup Environment", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "Prototyping", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ"}
      ]
    },
    {
      title: "Advanced Design",
      lessons: [
        { title: "Figma Tools", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Design Systems", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "Real Project", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    }
  ]
},

/* ===================== 3 ===================== */
{
  id: 3,
  title: "Data Science with Python",
  image: data,

  center: {
    name: "AI Institute",
    logo: datalogo,
    location: "Marrakech, Morocco",
    description: "AI Institute specializes in data science, machine learning, and artificial intelligence.",
    goal: "Prepare students to work as data scientists using real datasets and tools."
  },

  instructor: "David Miller",
  category: "data-science",
  level: "advanced",
  rating: 4.9,
  reviews: "3.2k",
  duration: "22h",
  price: 79,

  description: "Learn data science with Python, including data analysis, visualization, and machine learning techniques.",

  modules: [
    {
      title: "Python Basics",
      lessons: [
        { title: "Python Introduction", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Data Types", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "Libraries Overview", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    },
    {
      title: "Data Analysis",
      lessons: [
        { title: "Pandas", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Data Cleaning", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "Visualization", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    },
    {
      title: "Machine Learning",
      lessons: [
        { title: "Supervised Learning", video: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { title: "Unsupervised Learning", video: "https://www.youtube.com/watch?v=DLX62G4lc44" },
        { title: "Final Project", video: "https://youtu.be/Mg7Ma5i8NgM?si=mPmUQZxy4dwCWKzQ" }
      ]
    }
  ]
}
];