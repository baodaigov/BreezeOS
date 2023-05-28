import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elem: [<pre>Initiating shutdown...</pre>]
};

export const shutdownSlice = createSlice({
    name: 'shutdown',
    initialState,
    reducers: {
        pushItem: (state, action) => {
            state.elem = [...state.elem, action.payload];
        },

        clearItem: (state) => {
            state.elem = [];
        }
    },
});

export const { pushItem, clearItem } = shutdownSlice.actions

export default shutdownSlice.reducer