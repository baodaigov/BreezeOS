import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appearanceReducer from "./reducers/appearance.js";
import headerReducer from "./reducers/header.js";
import desktopReducer from "./reducers/desktop.js";
import desktopBodyReducer from "./reducers/desktopbody.js";
import dockReducer from "./reducers/dock.js";
import panelReducer from "./reducers/panel.js";
import modalReducer from "./reducers/modal.js";
import shutdownReducer from "./reducers/shutdown.js";
import systemReducer from "./reducers/system.js";
import settingsReducer from "./reducers/settings.js";
import startMenuReducer from "./reducers/startmenu.js";
import wifiPasswordReducer from "./reducers/wifipassword.js";
import newWifiReducer from "./reducers/newwifi.js";
import wallpaperReducer from "./reducers/wallpaper.js";
import imgViewReducer from "./reducers/imgview.js";
import shellReducer from "./reducers/shell.js";
import widgetReducer from "./reducers/widget.js";
import surfaceReducer from "./reducers/surface.js";
import timeReducer from "./reducers/time.js";
import terminalWindowReducer from "./reducers/terminalwindow.js";
import vscodeReducer from "./reducers/vscode.js";
import lockReducer from "./reducers/lock.js";
// apps
import appsSettingsReducer from "./reducers/apps/settings.js";
import appsClockReducer from "./reducers/apps/clock.js";
import appsSurfaceReducer from "./reducers/apps/surface.js";
import appsCalendarReducer from "./reducers/apps/calendar.js";
import appsCameraReducer from "./reducers/apps/camera.js";
import appsFilesReducer from "./reducers/apps/files.js";
import appsCalculatorReducer from "./reducers/apps/calculator.js";
import appsTextEditorReducer from "./reducers/apps/texteditor.js";
import appsTerminalReducer from "./reducers/apps/terminal.js";
import appsSoftwareStoreReducer from "./reducers/apps/softwarestore.js";
import appsVscodeReducer from "./reducers/apps/vscode.js";

const reducers = {
  appearance: appearanceReducer,
  header: headerReducer,
  desktop: desktopReducer,
  desktopbody: desktopBodyReducer,
  dock: dockReducer,
  panel: panelReducer,
  modal: modalReducer,
  shutdown: shutdownReducer,
  system: systemReducer,
  settings: settingsReducer,
  startmenu: startMenuReducer,
  wifipassword: wifiPasswordReducer,
  newwifi: newWifiReducer,
  wallpaper: wallpaperReducer,
  imgview: imgViewReducer,
  shell: shellReducer,
  widget: widgetReducer,
  surface: surfaceReducer,
  time: timeReducer,
  terminalwindow: terminalWindowReducer,
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
