import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appearanceReducer from "./reducers/appearance";
import batteryReducer from "./reducers/battery";
import headerReducer from "./reducers/header";
import dockReducer from "./reducers/dock";
import panelReducer from "./reducers/panel";
import shutdownReducer from "./reducers/shutdown";
import settingsReducer from "./reducers/settings";
import wpReducer from "./reducers/wifipassword";
import nwReducer from "./reducers/newwifi";
import wallpaperReducer from "./reducers/wallpaper";
import imgViewReducer from "./reducers/imgview";
import shellReducer from "./reducers/shell";
import widgetReducer from "./reducers/widget";
import surfaceReducer from "./reducers/surface";
import vscodeReducer from "./reducers/vscode";
import lockReducer from "./reducers/lock";
// apps
import appsSettingsReducer from "./reducers/apps/settings";
import appsClockReducer from "./reducers/apps/clock";
import appsSurfaceReducer from "./reducers/apps/surface";
import appsCalendarReducer from "./reducers/apps/calendar";
import appsCameraReducer from "./reducers/apps/camera";
import appsFilesReducer from "./reducers/apps/files";
import appsCalculatorReducer from "./reducers/apps/calculator";
import appsTextEditorReducer from "./reducers/apps/texteditor";
import appsTerminalReducer from "./reducers/apps/terminal";
import appsSoftwareStoreReducer from "./reducers/apps/softwarestore";
import appsVscodeReducer from "./reducers/apps/vscode";

const reducers = {
  appearance: appearanceReducer,
  battery: batteryReducer,
  header: headerReducer,
  dock: dockReducer,
  panel: panelReducer,
  shutdown: shutdownReducer,
  settings: settingsReducer,
  wifipassword: wpReducer,
  newwifi: nwReducer,
  wallpaper: wallpaperReducer,
  imgview: imgViewReducer,
  shell: shellReducer,
  widget: widgetReducer,
  surface: surfaceReducer,
  vscode: vscodeReducer,
  lock: lockReducer,

  // apps
  appsSettings: appsSettingsReducer,
  appsClock: appsClockReducer,
  appsSurface: appsSurfaceReducer,
  appsCalendar: appsCalendarReducer,
  appsCamera: appsCameraReducer,
  appsFiles: appsFilesReducer,
  appsCalculator: appsCalculatorReducer,
  appsTextEditor: appsTextEditorReducer,
  appsTerminal: appsTerminalReducer,
  appsSoftwareStore: appsSoftwareStoreReducer,
  appsVscode: appsVscodeReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;
