import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    allumee: false,
  };
    const chaudiereSlice = createSlice({
        name: 'chaudiere',
        initialState,
        reducers: {
            allumer: (state) => {
                state.allumee = true;
            },
            eteindre: (state) => {
                state.allumee = false;
                
            },

        },
    });
export const { allumer, eteindre } = chaudiereSlice.actions;
export default chaudiereSlice.reducer;
