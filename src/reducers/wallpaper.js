import { createSlice } from "@reduxjs/toolkit";
import W1 from "../components/default.jpg";

const initialState = {
  active: true,
  img: W1,
  allowSwitchWorkspace: false,
};

export const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    setWallpaperActive: (state, action) => {
      state.active = action.payload;
    },
    changeWallpaper: (state, action) => {
      state.img = action.payload;
    },
    setAllowSwitchWorkspace: (state, action) => {
      state.allowSwitchWorkspace = action.payload;
    },
  },
});

export const { setWallpaperActive, changeWallpaper, setAllowSwitchWorkspace } =
  wallpaperSlice.actions;

export default wallpaperSlice.reducer;
