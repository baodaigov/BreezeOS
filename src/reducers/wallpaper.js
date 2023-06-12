import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 'w1'
}

export const wallpaperSlice = createSlice({
    name: 'wallpaper',
    initialState,
    reducers: {
        changeWallpaper: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { changeWallpaper } = wallpaperSlice.actions

export default wallpaperSlice.reducer