import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchState } from "../types/types";

const initialState: ISearchState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { changeSearch } = searchSlice.actions;
export default searchSlice.reducer;
