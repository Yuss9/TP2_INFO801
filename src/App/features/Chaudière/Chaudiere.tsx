import React, { useEffect,  } from 'react';
import { useSelector } from 'react-redux';
import { selectChaudiereActive, selectCompareTmTr } from '../Controlleur/ControllerSlice';
import { useDispatch } from 'react-redux';
import { selectTemperature } from '../Thermostat/thermostatSlice';
import { selectIsNormal } from '../TableauDeControle/TableauDeControleSlice';
import { selectChaudiereAllumee, selectChaudiereDemande } from './ChaudièreSlice';

const Chaudiere = () => {
    const DELAI = 2;
    const DUREE_ALLUMAGE = 8; // Mets 8 secondes a s'allumer
    const ATTENTE_ALLUMAGE = 2;
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
        let timer:NodeJS.Timeout|null = null;
        if(demandeAllumage){
            console.log('demande en cours')
            // math random
            const probaAllumage = 0.9;
            if (Math.random()>probaAllumage){
                console.log('CHAUDIERE ALLUMEE')
                timer = setTimeout(() => {
                    dispatch({type: 'chaudiere/resetDemandeAllumage'});
                    dispatch({type: 'chaudiere/allumer'});
                    const allumage = () => {
                      alert("CHAUDIERE ALLUMEE");
                    };
                    allumage();
                    dispatch({
                      type: "controller/setIsErrorChaudiere",
                      payload: false,
                    });

                }, 1000*DUREE_ALLUMAGE );
            }
            else{
                console.log('CHAUDIERE ERROR ALLUMAGE');
                timer = setTimeout(() => {
                    dispatch({type: 'controller/setChaudiereDemande', payload: false});
                   const erreurAllumage = () => { alert('Erreur allumage')};
                   erreurAllumage();
                   dispatch({
                     type: "controller/setIsErrorChaudiere",
                     payload: true,
                   });
                }, 1000*ATTENTE_ALLUMAGE+DUREE_ALLUMAGE);
            }
        }
        return () => {
            clearTimeout(timer as NodeJS.Timeout)
        };
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
            <p>l'etat de la chaudiere est : { chaudiereAllumée ? "allumée":"éteinte"} </p>
            {/* <div> compte rendu ok ? {isIgnition ? ('True'):('False')} </div> */}
        </div>
    );
};

export default Chaudiere;