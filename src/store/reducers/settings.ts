import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  settings: string;
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
  boldText: boolean;
  batterySaver: boolean;
  animationsReduced: boolean;
  colorInverted: boolean;
  fontFamily: string;
  transparencyReduced: boolean;
}

const initialState: StateType = {
  settings: "Wi-Fi",
  user: {
    name: "user",
    role: "user",
    password: "",
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
  bluetooth: true,
  boldText: false,
  batterySaver: false,
  animationsReduced: false,
  colorInverted: false,
  fontFamily: "OptimisticDisplay",
  transparencyReduced: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<string>) => {
      state.settings = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setUserImage: (state, action: PayloadAction<string>) => {
      state.user.image = action.payload;
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
    toggleWifi: (state, action) => {
      state.wifi = action.payload;
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
    toggleBluetooth: (state, action) => {
      state.bluetooth = action.payload;
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
    setTransparencyReduced: (state, action: PayloadAction<boolean>) => {
      state.transparencyReduced = action.payload;
    },
  },
});

export const {
  setSettings,
  setName,
  setUserImage,
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
  setBoldText,
  setBatterySaver,
  setAnimationsReduced,
  setColorInverted,
  setFontFamily,
  setTransparencyReduced,
} = settingsSlice.actions;

export default settingsSlice.reducer;
