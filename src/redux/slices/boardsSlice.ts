import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBoardsState } from "../types/types";
import { createRequest } from "../../functions/createRequest";

const initialState: IBoardsState = {
  boards: [],
  boardsLoading: false,
  boardsErr: undefined,
};

export const getBoards = createAsyncThunk("boardsSlice/getBoards", async () => {
  const response = await createRequest("/boards", {});
  const result = await response.json();
  return result.data;
});

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.boardsLoading = true;
        state.boardsErr = undefined;
      })
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
        state.boardsLoading = false;
        state.boardsErr = undefined;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.boardsLoading = false;
        state.boardsErr = action.error.message;
      });
  },
});

export default boardsSlice.reducer;
