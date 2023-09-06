import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  fullname: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
