import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    allumee: false,
    demande: false,
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
            demandeAllumage: (state) => {
                state.demande= true;
            },
            resetDemandeAllumage:(state) => {
                state.demande= false;
            }
        },
    });
export const { allumer, eteindre, demandeAllumage, resetDemandeAllumage } =
  chaudiereSlice.actions;
export const selectChaudiere = (state: any) => state.chaudiere;
export const selectChaudiereAllumee = (state: any) => state.chaudiere.allumee;
export const selectChaudiereDemande = (state: any) => state.chaudiere.demande;

export default chaudiereSlice.reducer;
