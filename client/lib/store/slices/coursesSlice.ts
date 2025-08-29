import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: CourseLevel;
  price: number;
  image: string;
  enrolledStudents: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse(state, action: PayloadAction<Course>) {
      state.courses.push(action.payload);
    },
    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.courses.findIndex(
        (course) => course._id === action.payload._id
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    removeCourse(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    setCourses(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
    },
  },
});

export const { addCourse, updateCourse, removeCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
