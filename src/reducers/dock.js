import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  hide: false,
};

const dockSlice = createSlice({
  name: "dock",
  initialState,
  reducers: {
    setDockActive: (state, action) => {
      state.active = action.payload;
    },
    setDockHide: (state, action) => {
      state.hide = action.payload;
    },
  },
});

export const { setDockActive, setDockHide } = dockSlice.actions;

export default dockSlice.reducer;
