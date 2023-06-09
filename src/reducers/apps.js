import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings: {
        active: false
    }
}

const appsSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        setSettingsActive: (state, action) => {
            state.settings.active = action.payload;
        }
    }
});

export const {setSettingsActive} = appsSlice.actions;

export default appsSlice.reducer;