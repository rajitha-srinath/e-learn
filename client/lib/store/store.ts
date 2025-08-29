import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import coursesReducer from "./slices/coursesSlice";
import studentsReducer from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
