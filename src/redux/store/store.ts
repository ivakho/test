import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice";
import tasksReducer from "../slices/tasksSlice";
import taskReducer from "../slices/taskSlice";
import boardsReducer from "../slices/boardsSlice";
import modalReducer from "../slices/modalSlice";
import sortReducer from "../slices/sortSlice";
import boardTasksReducer from "../slices/boardTasksSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
    task: taskReducer,
    boards: boardsReducer,
    modal: modalReducer,
    sort: sortReducer,
    boardTasks: boardTasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
