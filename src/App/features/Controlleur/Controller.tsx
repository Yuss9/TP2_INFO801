import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectTemperature, selectTemperatureRef } from '../Thermostat/thermostatSlice';
import { selectCompareTmTr } from './ControllerSlice';
import { selectChaudiereAllumee } from '../Chaudière/ChaudièreSlice';


export const Controller = () => {
    const temperature = useSelector(selectTemperature)
    const temperatureRef = useSelector(selectTemperatureRef)
    const compareTmTr = useSelector(selectCompareTmTr);
    const dispatch = useDispatch();
    const chaudiereAllumée = useSelector(selectChaudiereAllumee);
    useEffect(() => {
        const setCompareTmTr = () => {
            const resultingTemperature = temperature - temperatureRef;
            dispatch({type: 'controller/setCompareTmTr', payload: resultingTemperature});
        };
        setCompareTmTr();
        console.log("temperatureRef", temperatureRef);
        dispatch({type:'controller/setChaudiereActive', payload:chaudiereAllumée})
    }, [dispatch,temperature, temperatureRef, compareTmTr,chaudiereAllumée]);
    return (
      <div>
        <h1>Controller</h1>
        <p>La comparaison entre Tm, Tr est : </p>
        <p> tr {temperatureRef}</p>
        <p> tm {temperature}</p>
        <p>la temperature courante est {compareTmTr} {compareTmTr> 0 ? ' °c superieure':' °c inferieure'}</p> 
        {compareTmTr > 0 ? <p>on ne doit pas chauffer</p> : <p>on doit chauffer</p>}
      </div>
    );
};

export default Controller;