import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  temperature: 20,
  temperatureRef: 0,
};

export const thermostatSlice = createSlice({
  name: 'thermostat',
  initialState,
  reducers: {
    setTemperatureRef: (state, action) => {
        state.temperatureRef = action.payload;
      },
    setTemperature: (state, action) => {
      state.temperature = action.payload;
    },
  },
});

export const { setTemperature,setTemperatureRef } = thermostatSlice.actions;

export const selectTemperature = (state:any) => state.thermostat.temperature;
export const selectTemperatureRef = (state:any) => state.thermostat.temperatureRef;
export default thermostatSlice.reducer;