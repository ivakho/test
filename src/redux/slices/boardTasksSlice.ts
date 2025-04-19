import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBoardTasksState } from "../types/types";
import { createRequest } from "../../functions/createRequest";

const initialState: IBoardTasksState = {
  boardTasks: [],
  boardTasksLoading: false,
  boardTasksErr: undefined,
};

export const getBoardTasks = createAsyncThunk(
  "boardTasksSlice/getBoardTasks",
  async (id: number) => {
    const response = await createRequest("/boards/" + id, {});
    const result = await response.json();
    return result.data;
  }
);

export const boardTasksSlice = createSlice({
  name: "boardTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardTasks.pending, (state) => {
        state.boardTasksLoading = true;
        state.boardTasksErr = undefined;
      })
      .addCase(getBoardTasks.fulfilled, (state, { payload }) => {
        state.boardTasks = payload;
        state.boardTasksLoading = false;
        state.boardTasksErr = undefined;
      })
      .addCase(getBoardTasks.rejected, (state, action) => {
        state.boardTasksLoading = false;
        state.boardTasksErr = action.error.message;
      });
  },
});

export default boardTasksSlice.reducer;
