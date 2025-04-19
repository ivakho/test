import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalState, IModalPayload } from "../types/types";

const initialState: IModalState = {
  modal: {
    isOpen: false,
    isNewTask: false,
    isIssues: false,
    boardId: undefined,
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModalPayload>) => {
      state.modal = action.payload;
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        isNewTask: false,
        isIssues: false,
        boardId: undefined,
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
