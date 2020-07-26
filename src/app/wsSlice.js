import { createSlice } from '@reduxjs/toolkit';

export const wsSlice = createSlice({
    name: 'wsKeeper',
    initialState: {
        wsGlobal: 0,
        testKeeper: 0
    },
    reducers: {
        setWsGlobal: (state, action) => {
            state.wsGlobal = action.payload;
        },
        testPlus:(state,action)=>{
            state.testKeeper += 1;
        }
    },
});
export const { setWsGlobal,testPlus } = wsSlice.actions;

export const setWsGlobalAsync = wsN => dispatch => {
    dispatch(setWsGlobal(wsN));
};




export default wsSlice.reducer;