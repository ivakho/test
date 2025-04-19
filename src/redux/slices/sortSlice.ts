import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISortState } from "../types/types";

const initialState: ISortState = {
  search: "",
  status: "All",
  boardId: null,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    changeBoardId: (state, action: PayloadAction<number | null>) => {
      state.boardId = action.payload;
    },
  },
});

export const { changeSearch, changeStatus, changeBoardId } = sortSlice.actions;
export default sortSlice.reducer;
