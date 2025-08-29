import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  _id: string;
  email: string;
  userName: string;
  name: string;
  role?: string;
  password?: string
}

interface StudentsState {
  students: Student[];
}

const initialState: StudentsState = {
  students: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload);
    },
    updateStudent(state, action: PayloadAction<Student>) {
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );

      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    removeStudent(state, action: PayloadAction<string>) {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    },
    setStudents(state, action: PayloadAction<Student[]>) {
      state.students = action.payload;
    },
  },
});

export const { addStudent, updateStudent, removeStudent, setStudents } =
  studentsSlice.actions;
export default studentsSlice.reducer;
