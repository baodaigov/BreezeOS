import { createSlice } from "@reduxjs/toolkit";
import W1 from "../components/default.jpg";

const initialState = {
  img: W1,
  allowSwitchWorkspace: false,
};

export const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    changeWallpaper: (state, action) => {
      state.img = action.payload;
    },
    setAllowSwitchWorkspace: (state, action) => {
      state.allowSwitchWorkspace = action.payload;
    },
  },
});

export const { changeWallpaper, setAllowSwitchWorkspace } =
  wallpaperSlice.actions;

export default wallpaperSlice.reducer;
