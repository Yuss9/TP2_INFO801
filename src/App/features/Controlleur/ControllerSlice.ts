import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  comparaisonTmTr: 0,
  chaudiereActive: false,
};

export const ControllerSlice = createSlice({
    name: 'controller',
    initialState,
    reducers:{
        setCompareTmTr: (state, action: PayloadAction<number>) => {
            state.comparaisonTmTr = action.payload;
        },
        setChaudiereActive: (state, action: PayloadAction<boolean>) => {
            state.chaudiereActive = action.payload;
        },
    },
});
export const {setCompareTmTr,setChaudiereActive} = ControllerSlice.actions;
export const selectChaudiereActive = (state: any) => state.controller.chaudiereActive;
export const selectCompareTmTr = (state: any) => state.controller.comparaisonTmTr;
export default ControllerSlice.reducer;