import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: '',
    type: ''
}

const panelSlice = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        activePanel: state => {
            state.active = true;
            state.type = 'default';
            document.getElementsByClassName('Panel')[0].classList.add('active');
        },
        inactivePanel: state => {
            state.active = false;
            state.type = '';
            document.getElementsByClassName('Panel')[0].classList.remove('active');
        },
        switchType: (state, action) => {
            state.type = action.payload;
        }
    }
});

export const {activePanel, inactivePanel, switchType} = panelSlice.actions;

export default panelSlice.reducer;