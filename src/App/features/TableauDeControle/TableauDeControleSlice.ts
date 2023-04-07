import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isNormal: false,
  };
    const tableauDeControleSlice = createSlice({
        name: 'tableauDeControle',
        initialState,
        reducers: {
            setNormal: (state,action) => {
                state.isNormal = action.payload;
                },
            },
        },
    );
export const {setNormal} = tableauDeControleSlice.actions;
export const selectIsNormal = (state:any) => state.tableauDeControle.isNormal;
export default tableauDeControleSlice.reducer;
