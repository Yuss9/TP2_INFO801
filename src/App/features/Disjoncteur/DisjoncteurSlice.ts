import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isNormal: false,
  clickable: false,
};
const DisjoncteurSlice = createSlice({
  name: "Disjoncteur",
  initialState,
  reducers: {
    setNormal: (state, action) => {
      state.isNormal = action.payload;
    },
    setClickable: (state, action) => {
        state.clickable = action.payload;
    }
  },
});
export const { setNormal, setClickable } = DisjoncteurSlice.actions;
export const selectIsNormal = (state: any) => state.Dijoncteur.isNormal;
export const selectClickable = (state: any) => state.Dijoncteur.clickable;
export default DisjoncteurSlice.reducer;
