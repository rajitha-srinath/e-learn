import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  userName: string;
  name: string;
  token?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearAuthState: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
