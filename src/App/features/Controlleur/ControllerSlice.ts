import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  comparaisonTmTr: 0,
  chaudiereActive: false,
  isErrorChaudiere: false,
  planningTakeControl: false,
};

export const ControllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    setCompareTmTr: (state, action: PayloadAction<number>) => {
      state.comparaisonTmTr = action.payload;
    },
    setChaudiereActive: (state, action: PayloadAction<boolean>) => {
      state.chaudiereActive = action.payload;
    },
    setIsErrorChaudiere: (state, action: PayloadAction<boolean>) => {
      state.isErrorChaudiere = action.payload;
    },
    setPlanningTakeControl: (state, action: PayloadAction<boolean>) => {
      state.planningTakeControl = action.payload;
    },
  },
});
export const { setCompareTmTr, setChaudiereActive, setPlanningTakeControl } =
  ControllerSlice.actions;
export const selectChaudiereActive = (state: any) =>
  state.controller.chaudiereActive;
export const selectCompareTmTr = (state: any) =>
  state.controller.comparaisonTmTr;
export const selectIsErrorChaudiere = (state: any) =>
  state.controller.isErrorChaudiere;
export const selectPlanningTakeControl = (state: any) =>
  state.controller.planningTakeControl;
export default ControllerSlice.reducer;
