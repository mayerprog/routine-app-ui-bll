import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  fullname: null,
  birthdate: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      console.log("is auth payload redux", action.payload);
      state.isAuth = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFullName: (state, action) => {
      state.fullname = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthdate = action.payload;
    },
    removeBirthDate: (state, action) => {
      state.birthdate = null;
    },
  },
});

export const {
  setIsAuth,
  setBirthDate,
  setEmail,
  setFullName,
  removeBirthDate,
} = authSlice.actions;

export default authSlice.reducer;
