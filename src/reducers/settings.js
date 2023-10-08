import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "user",
    role: "administrator",
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
  fontFamily: "OptimisticDisplay",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.user.name = action.payload;
    },
    setPassword: (state, action) => {
      state.user.password = action.payload;
    },
    setDeviceName: (state, action) => {
      state.deviceName = action.payload;
    },
    toggleAirplaneModeOff: (state) => {
      state.airplaneMode = false;
      state.wifi = true;
    },
    toggleAirplaneModeOn: (state) => {
      state.airplaneMode = true;
      state.wifi = false;
      state.bluetooth = false;
    },
    toggleWifi: (state) => {
      state.wifi = !state.wifi;
    },
    setLocked: (state, action) => {
      state.isLocked = action.payload;
    },
    setSleeping: (state, action) => {
      state.isSleeping = action.payload;
      if (action.payload === true) {
        document.getElementsByClassName("Desktop")[0].classList.add("blackscr");
      } else {
        document
          .getElementsByClassName("Desktop")[0]
          .classList.remove("blackscr");
      }
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setBrightness: (state, action) => {
      state.brightness = action.payload;
    },
    toggleNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    toggleBluetooth: (state) => {
      state.bluetooth = !state.bluetooth;
    },
    toggleLightMode: (state, action) => {
      state.themeLight = action.payload;
    },
    setBoldText: (state, action) => {
      state.boldText = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
  },
});

export const {
  setName,
  setPassword,
  setDeviceName,
  toggleAirplaneModeOff,
  toggleAirplaneModeOn,
  toggleWifi,
  setLocked,
  setSleeping,
  setVolume,
  setBrightness,
  toggleNotifications,
  toggleBluetooth,
  toggleLightMode,
  setBoldText,
  setFontFamily,
} = settingsSlice.actions;

export default settingsSlice.reducer;
