import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  comparaisonTmTr: 0,
};

export const ControllerSlice = createSlice({
    name: 'controller',
    initialState,
    reducers:{
        setCompareTmTr: (state, action: PayloadAction<number>) => {
            state.comparaisonTmTr = action.payload;
        }
    },
});
export const {setCompareTmTr} = ControllerSlice.actions;

export const selectCompareTmTr = (state: any) => state.controller.comparaisonTmTr;
export default ControllerSlice.reducer;