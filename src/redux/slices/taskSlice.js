import { createSlice } from "@reduxjs/toolkit";

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
        l.id = index;
      });
    },
    removeLinks: (state, action) => {
      state.links = state.links.filter((item) => item.id !== action.payload);
    },
    removeAllLinks: (state, action) => {
      state.links = [];
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTasks: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
  },
});

export const { addLinks, removeLinks, removeAllLinks, setTasks, addTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
