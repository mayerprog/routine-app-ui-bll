import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
