import { configureStore } from "@reduxjs/toolkit";
import shutdownReducer from './reducers/shutdown';
import settingsReducer from './reducers/settings';
import wallpaperReducer from './reducers/wallpaper';
import imgViewReducer from './reducers/imgview';

export const store = configureStore({
    reducer: {
        shutdown: shutdownReducer,
        settings: settingsReducer,
        wallpaper: wallpaperReducer,
        imgview: imgViewReducer
    },
});