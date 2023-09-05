import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  hide: false,
  private: false
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
    setPrivate: (state, action) => {
      state.private = action.payload;
    },
  },
});

export const { setActive, setHide, setPrivate } = appsSurfaceSlice.actions;

export default appsSurfaceSlice.reducer;
