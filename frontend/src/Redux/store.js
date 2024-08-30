import { configureStore } from "@reduxjs/toolkit/react";
import { taskApi } from "./Api/taskApi";
import { userApi } from "./Api/userApi";
export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(taskApi.middleware)
      .concat(userApi.middleware),
});
