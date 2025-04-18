import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITaskState } from "../types/types";
import { createRequest } from "../../functions/createRequest";

const initialState: ITaskState = {
  task: {
    assignee: { avatarUrl: "", email: "", fullName: "", id: 0 },
    boardId: 0,
    boardName: "",
    description: "",
    id: 0,
    priority: "",
    status: "",
    title: "",
  },
  taskLoading: false,
  taskErr: undefined,
};

export const getTask = createAsyncThunk(
  "taskSlice/getTask",
  async (id: number) => {
    const response = await createRequest("/tasks/" + id, {});
    const result = await response.json();
    return result.data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTask: (state) => {
      state.task = {
        assignee: { avatarUrl: "", email: "", fullName: "", id: 0 },
        boardId: 0,
        boardName: "",
        description: "",
        id: 0,
        priority: "",
        status: "",
        title: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.taskLoading = true;
        state.taskErr = undefined;
      })
      .addCase(getTask.fulfilled, (state, { payload }) => {
        state.task = payload;
        state.taskLoading = false;
        state.taskErr = undefined;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.taskLoading = false;
        state.taskErr = action.error.message;
      });
  },
});

export const { clearTask } = taskSlice.actions;
export default taskSlice.reducer;
