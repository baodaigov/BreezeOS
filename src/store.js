import { configureStore } from "@reduxjs/toolkit";
import shutdownReducer from './reducers/shutdown';
import settingsReducer from './reducers/settings';
import appsReducer from './reducers/apps';
import wallpaperReducer from './reducers/wallpaper';

export const store = configureStore({
    reducer: {
        shutdown: shutdownReducer,
        settings: settingsReducer,
        apps: appsReducer,
        wallpaper: wallpaperReducer,
    },
});