import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  description: null,
  links: [],
  linkData: null,
  linkName: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setLink: (state, action) => {
      state.linkData = action.payload;
    },
    setLinkName: (state, action) => {
      state.linkName = action.payload;
    },
    addLinks: (state, action) => {
      state.links = [...state.links, action.payload];
      console.log(state.links);
    },
  },
});

export const { setTitle, setDescription, setLink, setLinkName, addLinks } =
  taskSlice.actions;

export default taskSlice.reducer;
