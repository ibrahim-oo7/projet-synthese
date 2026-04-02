import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myCourses: [] 
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const { courseId } = action.payload;

      const exists = state.myCourses.includes(courseId);

      if (!exists) {
        state.myCourses.push(courseId);
      }
    },

    removeCourse: (state, action) => {
      state.myCourses = state.myCourses.filter(
        (id) => id !== action.payload
      );
    }
  }
});

export const { enrollCourse, removeCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;