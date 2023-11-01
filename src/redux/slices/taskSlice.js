import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  links: [],
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addLinks: (state, action) => {
      state.links = [...state.links, action.payload];
      state.links.map((l, index) => {
        if (!l.id) l.id = index;
      });
    },
    removeLinks: (state, action) => {
      if (state.links[0]._id) {
        state.links = state.links.filter((item) => item._id !== action.payload);
      } else {
        state.links = state.links.filter((item) => item.id !== action.payload);
      }
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
} = taskSlice.actions;

export default taskSlice.reducer;
