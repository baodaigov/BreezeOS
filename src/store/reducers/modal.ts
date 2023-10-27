import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  content: string;
}

const initialState: StateType = {
  content: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setModalContent } = modalSlice.actions;

export default modalSlice.reducer;
