import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

const terminalWindowSlice = createSlice({
  name: "terminalwindow",
  initialState,
  reducers: {
    setTerminalWindowActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setTerminalWindowActive } = terminalWindowSlice.actions;

export default terminalWindowSlice.reducer;
