import { configureStore } from "@reduxjs/toolkit";
import shutdownReducer from './reducers/shutdown';
import settingsReducer from './reducers/settings';
import wpReducer from './reducers/wifipassword';
import wallpaperReducer from './reducers/wallpaper';
import imgViewReducer from './reducers/imgview';
import widgetReducer from './reducers/widget'
import firefoxReducer from './reducers/firefox'
import vscodeReducer from './reducers/vscode'

export const store = configureStore({
    reducer: {
        shutdown: shutdownReducer,
        settings: settingsReducer,
        wifipassword: wpReducer,
        wallpaper: wallpaperReducer,
        imgview: imgViewReducer,
        widget: widgetReducer,
        firefox: firefoxReducer,
        vscode: vscodeReducer
    },
});