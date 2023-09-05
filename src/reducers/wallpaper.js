import { createSlice } from "@reduxjs/toolkit";
import W1 from "../components/default.jpg";

const initialState = {
  img: W1,
};

export const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    changeWallpaper: (state, action) => {
      state.img = action.payload;
    },
  },
});

export const { changeWallpaper } = wallpaperSlice.actions;

export default wallpaperSlice.reducer;
