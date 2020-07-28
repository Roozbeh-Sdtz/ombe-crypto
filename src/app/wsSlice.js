import { createSlice } from '@reduxjs/toolkit';

export const wsSlice = createSlice({
    name: 'wsKeeper',
    initialState: {
        wsGlobal: 0,
        isWsOpen: false
    },
    reducers: {
        setWsGlobal: (state, action) => {
            state.wsGlobal = action.payload;
            state.isWsOpen =true;
        },
        wsIsOpen:(state,action)=>{
            state.isWsOpen =true;
        },
        wsIsNotOpen:(state,action)=>{
            state.isWsOpen =false;
        },

    },
});
export const { setWsGlobal,wsIsNotOpen,wsIsOpen } = wsSlice.actions;

export const setWsGlobalAsync = wsN => dispatch => {
    dispatch(setWsGlobal(wsN));
};




export default wsSlice.reducer;