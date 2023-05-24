import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from './reducers/settings';
import appsReducer from './reducers/apps';
import wallpaperReducer from './reducers/wallpaper';

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        apps: appsReducer,
        wallpaper: wallpaperReducer,
    },
});