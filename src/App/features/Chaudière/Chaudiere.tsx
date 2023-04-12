import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChaudiereActive, selectCompareTmTr } from '../Controlleur/ControllerSlice';
import { useDispatch } from 'react-redux';
import { selectTemperature } from '../Thermostat/thermostatSlice';
import { selectIsNormal } from '../TableauDeControle/TableauDeControleSlice';
import { selectChaudiereAllumee, selectChaudiereDemande } from './ChaudièreSlice';

const Chaudiere = () => {
    const DELAI = 2;
    const compareTmTr = useSelector(selectCompareTmTr);
    const temperature = useSelector(selectTemperature);
    const chaudiereAllumée = useSelector(selectChaudiereAllumee);
    const isNormal = useSelector(selectIsNormal);
    const dispatch = useDispatch();
    const demandeAllumage = useSelector(selectChaudiereDemande);
    // useEffect(()=>{
    //     setIsIgnition(Math.random()>0.5)
    // },[isNormal])
    useEffect(()=>{
        if(demandeAllumage){
            console.log('demande en cours')
            // math random
            const probaAllumage = 0.1;
            if (Math.random()>probaAllumage){
                console.log('CHAUDIERE ALLUMEE')
                dispatch({type: 'chaudiere/resetDemandeAllumage'});
                dispatch({type: 'chaudiere/allumer'});
            }
            else{
                console.log('CHAUDIERE ERROR ALLUMAGE');
                dispatch({type: 'controller/setChaudiereDemande', payload: false});
            }
        }
    },[dispatch, demandeAllumage])    
    useEffect(()=>{
        let timer:NodeJS.Timeout|null = null;
        if (compareTmTr >= 2 || !chaudiereAllumée) {
            console.log('chaudiere eteinte dans le uE')
            timer = setTimeout(() => {
                dispatch({type: 'thermostat/setTemperature', payload: temperature - 1});
            }, 1000*DELAI);
        }
        else {
            // if(activateOrder) return;
            timer = setTimeout(() => {
                dispatch({type: 'thermostat/setTemperature', payload: temperature + 1});
            }, 1000*DELAI);
        }
        return () => {
            clearTimeout(timer as NodeJS.Timeout)
        };
    },[compareTmTr, temperature, dispatch,chaudiereAllumée,isNormal])

    return (
        <div>
            <h1>Chaudiere</h1>
            {/* <p>l'etat de la chaudiere est : {compareTmTr<0 && isIgnition ? "allumée":"éteinte"} </p> */}
            {/* <div> compte rendu ok ? {isIgnition ? ('True'):('False')} </div> */}
        </div>
    );
};

export default Chaudiere;