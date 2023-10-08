import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

export const startMenuSlice = createSlice({
  name: "startmenu",
  initialState,
  reducers: {
    setStartMenuActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setStartMenuActive } = startMenuSlice.actions;

export default startMenuSlice.reducer;
