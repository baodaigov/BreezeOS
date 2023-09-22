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
  volume: 100,
  brightness: 100,
  notifications: true,
  bluetooth: false,
  themeLight: false,
  boldText: false,
  hour12: true,
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
    toggleLightMode: (state) => {
      state.themeLight = true;
      document.getElementsByClassName("Desktop")[0].classList.add("lightMode");
    },
    toggleDarkMode: (state) => {
      state.themeLight = false;
      document
        .getElementsByClassName("Desktop")[0]
        .classList.remove("lightMode");
    },
    enableBoldText: (state) => {
      state.boldText = true;
      document.getElementsByClassName("Desktop")[0].classList.add("isBold");
    },
    disableBoldText: (state) => {
      state.boldText = false;
      document.getElementsByClassName("Desktop")[0].classList.remove("isBold");
    },
    toggle12Hour: (state, action) => {
      state.hour12 = action.payload;
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
  setVolume,
  setBrightness,
  toggleNotifications,
  toggleBluetooth,
  toggleLightMode,
  toggleDarkMode,
  enableBoldText,
  disableBoldText,
  toggle12Hour,
  setFontFamily,
} = settingsSlice.actions;

export default settingsSlice.reducer;
