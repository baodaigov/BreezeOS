import { configureStore } from "@reduxjs/toolkit";
import appearanceReducer from './reducers/appearance';
import batteryReducer from './reducers/battery';
import panelReducer from './reducers/panel';
import shutdownReducer from './reducers/shutdown';
import settingsReducer from './reducers/settings';
import wpReducer from './reducers/wifipassword';
import nwReducer from './reducers/newwifi';
import wallpaperReducer from './reducers/wallpaper';
import imgViewReducer from './reducers/imgview';
import widgetReducer from './reducers/widget'
import firefoxReducer from './reducers/firefox'
import vscodeReducer from './reducers/vscode'
// apps
import appsSettingsReducer from './reducers/apps/settings';
import appsClockReducer from './reducers/apps/clock';
import appsFirefoxReducer from './reducers/apps/firefox';
import appsCalendarReducer from './reducers/apps/calendar';
import appsCameraReducer from './reducers/apps/camera';
import appsFilesReducer from './reducers/apps/files';
import appsCalculatorReducer from './reducers/apps/calculator';
import appsTextEditorReducer from './reducers/apps/texteditor';
import appsTerminalReducer from './reducers/apps/terminal';
import appsSoftwareStoreReducer from './reducers/apps/softwarestore';
import appsVscodeReducer from './reducers/apps/vscode';

export const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
        battery: batteryReducer,
        panel: panelReducer,
        shutdown: shutdownReducer,
        settings: settingsReducer,
        wifipassword: wpReducer,
        newwifi: nwReducer,
        wallpaper: wallpaperReducer,
        imgview: imgViewReducer,
        widget: widgetReducer,
        firefox: firefoxReducer,
        vscode: vscodeReducer,

        // apps
        appsSettings: appsSettingsReducer,
        appsClock: appsClockReducer,
        appsFirefox: appsFirefoxReducer,
        appsCalendar: appsCalendarReducer,
        appsCamera: appsCameraReducer,
        appsFiles: appsFilesReducer,
        appsCalculator: appsCalculatorReducer,
        appsTextEditor: appsTextEditorReducer,
        appsTerminal: appsTerminalReducer,
        appsSoftwareStore: appsSoftwareStoreReducer,
        appsVscode: appsVscodeReducer,
    },
});