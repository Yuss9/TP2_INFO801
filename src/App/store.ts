import { configureStore } from "@reduxjs/toolkit";
import thermostatSlice from "./features/Thermostat/thermostatSlice";
import ControllerSlice from "./features/Controlleur/ControllerSlice";
import chaudiereSlice from "./features/Chaudière/ChaudièreSlice";
import TableauDeControleSlice from "./features/TableauDeControle/TableauDeControleSlice";
import DisjoncteurSlice from "./features/Disjoncteur/DisjoncteurSlice";
import HoraireChaudiereSlice from "./features/HoraireChaudiere/HoraireChaudiereSlice";
export const store = configureStore({
  reducer: {
    thermostat: thermostatSlice,
    controller: ControllerSlice,
    chaudiere: chaudiereSlice,
    tableauDeControle: TableauDeControleSlice,
    disjoncteur: DisjoncteurSlice,
    horaireChaudiere: HoraireChaudiereSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
