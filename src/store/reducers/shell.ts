import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  theme: string;
}

const initialState: StateType = {
  theme: "Breeze",
};

export const shellSlice = createSlice({
  name: "shell",
  initialState,
  reducers: {
    changeShell: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { changeShell } = shellSlice.actions;

export default shellSlice.reducer;
