import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  hide: false,
};

const appsSurfaceSlice = createSlice({
  name: "appsSurface",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setHide: (state, action) => {
      state.hide = action.payload;
    },
  },
});

export const { setActive, setHide } = appsSurfaceSlice.actions;

export default appsSurfaceSlice.reducer;
