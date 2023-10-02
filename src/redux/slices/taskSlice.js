import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  description: null,
  links: [],
  linkData: "",
  linkName: "",
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
      state.links.map((l, index) => {
        l.id = index;
      });
    },
    removeLinks: (state, action) => {
      state.links = state.links.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setTitle,
  setDescription,
  setLink,
  setLinkName,
  addLinks,
  removeLinks,
} = taskSlice.actions;

export default taskSlice.reducer;
