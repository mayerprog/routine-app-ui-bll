import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        // Ignore state paths, e.g. state for 'items':
        ignoredPaths: ["items.data"],
      },
      serializableCheck: { ignoredPaths: ["some.nested.path"] },
    }),
});
