import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: ''
}

const panelSlice = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        activePanel: state => {
            state.active = true;
            document.getElementsByClassName('Panel')[0].classList.add('active');
        },
        inactivePanel: state => {
            state.active = false;
            document.getElementsByClassName('Panel')[0].classList.remove('active');
        }
    }
});

export const {activePanel, inactivePanel} = panelSlice.actions;

export default panelSlice.reducer;