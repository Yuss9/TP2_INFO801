import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createEpicMiddleware} from "redux-observable";
import thermostatSlice from './features/Thermostat/thermostatSlice';
import ControllerSlice from './features/Controlleur/ControllerSlice';

export const store = configureStore({
    reducer: {
        thermostat: thermostatSlice,
        controller: ControllerSlice,
    },
})
// epicMiddleware.run(rootEpic);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch