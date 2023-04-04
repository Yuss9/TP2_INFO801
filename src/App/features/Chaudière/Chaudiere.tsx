import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectChaudiereActive, selectCompareTmTr } from '../Controlleur/ControllerSlice';
import { useDispatch } from 'react-redux';
import { selectTemperature } from '../Thermostat/thermostatSlice';

const Chaudiere = () => {
    const DELAI = 2;
    const compareTmTr = useSelector(selectCompareTmTr);
    const temperature = useSelector(selectTemperature);
    const activateOrder = useSelector(selectChaudiereActive);
    const dispatch = useDispatch();


    useEffect(()=>{
        let timer:NodeJS.Timeout|null = null;
        if (compareTmTr >= 2 || !activateOrder) {
            timer = setTimeout(() => {
                dispatch({type: 'thermostat/setTemperature', payload: temperature - 1});
            }, 1000*DELAI);
        }
        else {
            if(!activateOrder) return;
            timer = setTimeout(() => {
                dispatch({type: 'thermostat/setTemperature', payload: temperature + 1});
            }, 1000*DELAI);
        }
        return () => {
            clearTimeout(timer as NodeJS.Timeout)
        };
    },[compareTmTr, temperature, dispatch,activateOrder])

    return (
        <div>
            <h1>Chaudiere</h1>
            <p>l'etat de la chaudiere est : {compareTmTr<0 ? "allumée":"éteinte"} </p>
        </div>
    );
};

export default Chaudiere;