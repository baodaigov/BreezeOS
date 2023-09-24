import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

const dockSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setDockActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setDockActive } = dockSlice.actions;

export default dockSlice.reducer;
