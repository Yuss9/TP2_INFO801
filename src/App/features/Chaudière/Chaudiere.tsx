import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChaudiereActive, selectCompareTmTr } from '../Controlleur/ControllerSlice';
import { useDispatch } from 'react-redux';
import { selectTemperature } from '../Thermostat/thermostatSlice';
import { selectIsNormal } from '../TableauDeControle/TableauDeControleSlice';

const Chaudiere = () => {
    const DELAI = 2;
    const compareTmTr = useSelector(selectCompareTmTr);
    const temperature = useSelector(selectTemperature);
    const activateOrder = useSelector(selectChaudiereActive);
    const isNormal = useSelector(selectIsNormal);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     setIsIgnition(Math.random()>0.5)
    // },[isNormal])
    useEffect(()=>{
        let timer:NodeJS.Timeout|null = null;
        // if(!isIgnition) {
        //     console.log("Chaudiere eteinte");
        //     dispatch({type: 'tableauDeControle/setIsNormal', payload: false});
            
        // };
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
    },[compareTmTr, temperature, dispatch,activateOrder,isNormal])

    return (
        <div>
            <h1>Chaudiere</h1>
            <p>l'etat de la chaudiere est : {compareTmTr<0 && isIgnition ? "allumée":"éteinte"} </p>
            <div> compte rendu ok ? {isIgnition ? ('True'):('False')} </div>
        </div>
    );
};

export default Chaudiere;