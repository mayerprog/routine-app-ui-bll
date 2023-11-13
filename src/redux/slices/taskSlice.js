import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  links: [],
  images: [],
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addImages: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    removeImages: (state, action) => {
      state.images = state.images.filter((image) => image !== action.payload);
    },
    addLinks: (state, action) => {
      state.links = [...state.links, action.payload];
      state.links.map((link, index) => (link.id = index));
    },
    removeLinks: (state, action) => {
      state.links = state.links.filter((item) => item.id !== action.payload);
      state.links.map((link, index) => (link.id = index));
    },
    addInTaskLinks: (state, action) => {
      state.links = action.payload;
    },
    removeAllLinks: (state, action) => {
      state.links = [];
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      console.log(state.tasks);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTasks: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTasks: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const {
  addLinks,
  removeLinks,
  removeAllLinks,
  setTasks,
  addTasks,
  removeTasks,
  editTask,
  addInTaskLinks,
  addImages,
  removeImages,
} = taskSlice.actions;

export default taskSlice.reducer;
