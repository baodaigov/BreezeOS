import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  hostname: string;
  kernel: string;
  version: string;
  platform: string;
  memory: {
    total: number;
    used: number;
  };
  processor: string;
  graphics: string;
  disks: {
    total: string;
    used: string;
  };
  battery: {
    level: number;
    charging: boolean;
  };
}

const initialState: StateType = {
  hostname: "BreezeOS",
  kernel: "GNU/Linux 6.2.1 x86_64",
  version: "",
  platform: "BreezeOS",
  memory: {
    total: 8,
    used: 4,
  },
  processor: "Intel® Core™ i3-6100 CPU @ 3.70GHz × 4",
  graphics: "Mesa Intel® HD Graphics 530 (SKL GT2)",
  disks: {
    total: "128",
    used: "80.3",
  },
  battery: {
    level: 0,
    charging: false,
  },
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setHostname: (state, action: PayloadAction<string>) => {
      state.hostname = action.payload;
    },
    setKernel: (state, action: PayloadAction<string>) => {
      state.kernel = action.payload;
    },
    setVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },
    setPlatform: (state, action: PayloadAction<string>) => {
      state.platform = action.payload;
    },
    setTotalMemory: (state, action: PayloadAction<number>) => {
      state.memory.total = action.payload;
    },
    setUsedMemory: (state, action: PayloadAction<number>) => {
      state.memory.used = action.payload;
    },
    setProcessor: (state, action: PayloadAction<string>) => {
      state.processor = action.payload;
    },
    setGraphics: (state, action: PayloadAction<string>) => {
      state.graphics = action.payload;
    },
    setTotalSpace: (state, action: PayloadAction<string>) => {
      state.disks.total = action.payload;
    },
    setUsedSpace: (state, action: PayloadAction<string>) => {
      state.disks.used = action.payload;
    },
    setBatteryLevel: (state, action: PayloadAction<number>) => {
      state.battery.level = action.payload;
    },
    setBatteryCharging: (state, action: PayloadAction<boolean>) => {
      state.battery.charging = action.payload;
    },
  },
});

export const {
  setHostname,
  setKernel,
  setVersion,
  setPlatform,
  setTotalMemory,
  setUsedMemory,
  setProcessor,
  setGraphics,
  setTotalSpace,
  setUsedSpace,
  setBatteryLevel,
  setBatteryCharging,
} = systemSlice.actions;

export default systemSlice.reducer;
