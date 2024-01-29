import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apps, MenuItem } from "types";

type AppIsActive = {
  [key: string]: {
    status: "inactive" | "active" | "hide";
    minimized?: boolean;
  };
};

interface StateType {
  apps: Apps;
  appIsActive: AppIsActive;
  fullscreen: string;
  menu: {
    [key: string]: MenuItem;
  };
}

const initialState: StateType = {
  apps: [],
  appIsActive: {},
  fullscreen: "",
  menu: {},
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setApps: (state, action: PayloadAction<Apps>) => {
      state.apps = action.payload;
    },
    setMenu: (
      state,
      action: PayloadAction<{
        [key: string]: MenuItem;
      }>,
    ) => {
      state.menu = action.payload;
    },
    openApp: (state, action: PayloadAction<string>) => {
      const newApp = { ...state.appIsActive[action.payload] };

      newApp.status = "active";
      newApp.minimized = false;
      state.appIsActive[action.payload] = newApp;
    },
    hideApp: (state, action: PayloadAction<string>) => {
      const app = state.appIsActive[action.payload];
      app.status = "hide";
    },
    closeApp: (state, action: PayloadAction<string>) => {
      const app = state.appIsActive[action.payload];
      app.status = "inactive";
      state.fullscreen = "";
    },
    quitApp: (state, action: PayloadAction<string>) => {
      delete state.appIsActive[action.payload];
      state.fullscreen = "";
      state.appIsActive = state.appIsActive;
    },
    showApp: (state, action: PayloadAction<string>) => {
      const app = state.appIsActive[action.payload];
      app.status = "active";
    },
    minimizeApp: (state, action: PayloadAction<string>) => {
      const app = state.appIsActive[action.payload];
      app.minimized = true;
    },
    maximizeApp: (state, action: PayloadAction<string>) => {
      const app = state.appIsActive[action.payload];
      app.minimized = false;
    },
    hideApps: (state) => {
      const keys = Object.keys(state.appIsActive);

      for (let i = 0; i < keys.length; i++) {
        const apps = state.appIsActive[keys[i]];
        if (apps.status !== "inactive") {
          apps.status = "hide";
          state.appIsActive[keys[i]] = apps;
        }
      }
    },
    showApps: (state) => {
      const keys = Object.keys(state.appIsActive);

      for (let i = 0; i < keys.length; i++) {
        const apps = state.appIsActive[keys[i]];
        if (apps.status !== "inactive") {
          apps.status = "active";
          state.appIsActive[keys[i]] = apps;
        }
      }
    },
    enterFullScreen: (state, action: PayloadAction<string>) => {
      state.fullscreen = action.payload;
    },
    exitFullScreen: (state) => {
      state.fullscreen = "";
    },
  },
});

export const {
  setApps,
  setMenu,
  hideApp,
  closeApp,
  quitApp,
  hideApps,
  maximizeApp,
  minimizeApp,
  openApp,
  showApp,
  showApps,
  enterFullScreen,
  exitFullScreen,
} = appsSlice.actions;

export default appsSlice.reducer;
