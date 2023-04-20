import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  horaire: {
    heureDebut: 0,
    heureFin: 0,
    minuteDebut: 0,
    minuteFin: 0,
  },
};

const horaireChaudiereSlice = createSlice({
  name: "horaireChaudiere",
  initialState,
  reducers: {
    setHoraireChaudiere: (state, action) => {
      //08:10-12:20 split on - and :
      const horaire = action.payload.split(/-|:/).map((h: any) => parseInt(h));
      console.log(horaire);
      state.horaire.heureDebut = horaire[0];
      state.horaire.minuteDebut = horaire[1];
      state.horaire.heureFin = horaire[2];
      state.horaire.minuteFin = horaire[3];
    },

    removeChaudierePlanning: (state, action) => {
      state.horaire.heureDebut = 0;
      state.horaire.minuteDebut = 0;
      state.horaire.heureFin = 0;
      state.horaire.minuteFin = 0;
    },
  },
});

export const { setHoraireChaudiere } = horaireChaudiereSlice.actions;
export const { removeChaudierePlanning } = horaireChaudiereSlice.actions;
export const selectHoraireChaudiere = (state: any) => state.horaireChaudiere;
export default horaireChaudiereSlice.reducer;
