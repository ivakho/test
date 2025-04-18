import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITasksState } from "../types/types";
import { createRequest } from "../../functions/createRequest";

const initialState: ITasksState = {
  tasks: [],
  tasksLoading: false,
  tasksErr: undefined,
};

export const getTasks = createAsyncThunk("tasksSlice/getTasks", async () => {
  const response = await createRequest("/tasks", {});
  const result = await response.json();
  return result.data;
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.tasksLoading = true;
        state.tasksErr = undefined;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.tasksLoading = false;
        state.tasksErr = undefined;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.tasksLoading = false;
        state.tasksErr = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
