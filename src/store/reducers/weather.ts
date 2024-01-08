import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Temperature } from "../../../types";

interface StateType {
  data: any;
  location: string;
  temperature: Temperature;
}

const initialState: StateType = {
  data: {},
  location: "",
  temperature: "celsius",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    initializeData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setTemperature: (state, action: PayloadAction<Temperature>) => {
      state.temperature = action.payload;
    },
  },
});

export const { initializeData, setLocation, setTemperature } =
  weatherSlice.actions;

export default weatherSlice.reducer;
