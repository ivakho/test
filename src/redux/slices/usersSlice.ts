import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUsersState } from "../types/types";
import { createRequest } from "../../functions/createRequest";

const initialState: IUsersState = {
  users: [],
  usersLoading: false,
  usersErr: undefined,
};

export const getUsers = createAsyncThunk("usersSlice/getUsers", async () => {
  const response = await createRequest("/users", {});
  const result = await response.json();
  return result.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersErr = undefined;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.usersLoading = false;
        state.usersErr = undefined;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersErr = action.error.message;
      });
  },
});

export default usersSlice.reducer;
