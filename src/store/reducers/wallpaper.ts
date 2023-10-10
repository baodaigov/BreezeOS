import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import W1 from "@/components/default.jpg";

interface StateType {
  active: boolean;
  img: string;
  allowSwitchWorkspace: boolean;
}

const initialState: StateType = {
  active: true,
  img: W1,
  allowSwitchWorkspace: false,
};

export const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    setWallpaperActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    changeWallpaper: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    },
    setAllowSwitchWorkspace: (state, action: PayloadAction<boolean>) => {
      state.allowSwitchWorkspace = action.payload;
    },
  },
});

export const { setWallpaperActive, changeWallpaper, setAllowSwitchWorkspace } =
  wallpaperSlice.actions;

export default wallpaperSlice.reducer;
