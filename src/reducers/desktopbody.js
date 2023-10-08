import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

const desktopBodySlice = createSlice({
  name: "desktopbody",
  initialState,
  reducers: {
    setDesktopBodyActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setDesktopBodyActive } = desktopBodySlice.actions;

export default desktopBodySlice.reducer;
