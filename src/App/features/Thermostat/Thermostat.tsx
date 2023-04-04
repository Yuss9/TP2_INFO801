import React from 'react';
import { useSelector } from 'react-redux';
import { selectTemperature, selectTemperatureRef } from './thermostatSlice';
import { useDispatch } from 'react-redux';

export default function Thermostat() {
  const temperature = useSelector(selectTemperature);
  const temperatureRef = useSelector(selectTemperatureRef);
  const dispatch = useDispatch();

    const setTemperatureRef = (temperatureRef: number) => {
        dispatch({type: 'thermostat/setTemperatureRef', payload: temperatureRef});
    }

  return (
    <div>
      <h1>Thermostat</h1>
      <p>Current temperature: {temperature}°C</p>
      <input type="range" min="5" max="35" step="1" onChange={
        (event)=>{
            setTemperatureRef(parseFloat(event.target.value))
            console.log("temperatureRef: ", temperatureRef);
            console.log("event: ", event.target.value);
            ;}         
      } />
      <p>Current temperatureRef: {temperatureRef}°C</p>
    </div>
  );
}