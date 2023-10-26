import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  user: {
    name: string;
    role: "user" | "superuser";
    password: string;
    image: string | null;
  };
  deviceName: string;
  airplaneMode: boolean;
  wifi: boolean;
  wifiList: {
    name: string;
    private: boolean;
    status: "weak" | "fair" | "good";
    connected?: boolean;
  }[];
  isLocked: boolean;
  isSleeping: boolean;
  volume: any;
  brightness: any;
  notifications: boolean;
  bluetooth: boolean;
  themeLight: boolean;
  boldText: boolean;
  batterySaver: boolean;
  animationsReduced: boolean;
  colorInverted: boolean;
  fontFamily: string;
}

const initialState: StateType = {
  user: {
    name: "user",
    role: "superuser",
    password: "123456",
    image: null,
  },
  deviceName: "breezeos",
  airplaneMode: false,
  wifi: true,
  wifiList: [
    {
      name: "BreezeOS",
      private: true,
      status: "good",
      connected: true,
    },
    {
      name: "Nokia Lumia",
      private: true,
      status: "fair",
    },
    {
      name: "APTEK",
      private: true,
      status: "weak",
    },
    {
      name: "daothanhminh's iPhone",
      private: true,
      status: "fair",
    },
    {
      name: "FPT Telecom",
      private: true,
      status: "good",
    },
    {
      name: "Coffee Shop",
      private: true,
      status: "fair",
    },
    {
      name: "Samsung Galaxy S20",
      private: true,
      status: "weak",
    },
    {
      name: "KING COFFEE",
      private: true,
      status: "weak",
    },
    {
      name: "VIETTEL",
      private: true,
      status: "fair",
    },
    {
      name: "Nguyet Thanh",
      private: true,
      status: "weak",
    },
  ],
  isLocked: true,
  isSleeping: false,
  volume: 100,
  brightness: 100,
  notifications: true,
  bluetooth: false,
  themeLight: false,
  boldText: false,
  batterySaver: false,
  animationsReduced: false,
  colorInverted: false,
  fontFamily: "OptimisticDisplay",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    setDeviceName: (state, action: PayloadAction<string>) => {
      state.deviceName = action.payload;
    },
    toggleAirplaneMode: (state, action: PayloadAction<boolean>) => {
      state.airplaneMode = action.payload;
      if (action.payload) {
        state.wifi = false;
        state.bluetooth = false;
      } else {
        state.wifi = true;
      }
    },
    toggleWifi: (state) => {
      state.wifi = !state.wifi;
    },
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
    setSleeping: (state, action: PayloadAction<boolean>) => {
      state.isSleeping = action.payload;
      if (action.payload === true) {
        document.getElementsByClassName("Desktop")[0].classList.add("blackscr");
      } else {
        document
          .getElementsByClassName("Desktop")[0]
          .classList.remove("blackscr");
      }
    },
    setVolume: (state, action: PayloadAction<any>) => {
      state.volume = action.payload;
    },
    setBrightness: (state, action: PayloadAction<any>) => {
      state.brightness = action.payload;
    },
    toggleNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
    toggleBluetooth: (state) => {
      state.bluetooth = !state.bluetooth;
    },
    toggleLightMode: (state, action: PayloadAction<boolean>) => {
      state.themeLight = action.payload;
    },
    setBoldText: (state, action: PayloadAction<boolean>) => {
      state.boldText = action.payload;
    },
    setBatterySaver: (state, action: PayloadAction<boolean>) => {
      state.batterySaver = action.payload;
    },
    setAnimationsReduced: (state, action: PayloadAction<boolean>) => {
      state.animationsReduced = action.payload;
    },
    setColorInverted: (state, action: PayloadAction<boolean>) => {
      state.colorInverted = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
  },
});

export const {
  setName,
  setPassword,
  setDeviceName,
  toggleAirplaneMode,
  toggleWifi,
  setLocked,
  setSleeping,
  setVolume,
  setBrightness,
  toggleNotifications,
  toggleBluetooth,
  toggleLightMode,
  setBoldText,
  setBatterySaver,
  setAnimationsReduced,
  setColorInverted,
  setFontFamily,
} = settingsSlice.actions;

export default settingsSlice.reducer;
