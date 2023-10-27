import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  kernel: string;
}

const initialState: StateType = {
  kernel: "GNU/Linux 6.2.1 x86_64",
};

const systemSlice = createSlice({
  name: "surface",
  initialState,
  reducers: {
    setKernel: (state, action: PayloadAction<string>) => {
      state.kernel = action.payload;
    },
  },
});

export const { setKernel } = systemSlice.actions;

export default systemSlice.reducer;
