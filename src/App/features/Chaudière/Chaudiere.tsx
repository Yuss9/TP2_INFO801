import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  selectChaudiereActive,
  selectCompareTmTr,
} from "../Controlleur/ControllerSlice";
import { useDispatch } from "react-redux";
import { selectTemperature } from "../Thermostat/thermostatSlice";
import { selectIsNormal } from "../TableauDeControle/TableauDeControleSlice";
import {
  selectChaudiereAllumee,
  selectChaudiereDemande,
} from "./ChaudièreSlice";

import {
  selectPlanningTakeControl,
  selectConstantChauffe,
} from "../Controlleur/ControllerSlice";

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
  const isPlanningActive = useSelector(selectPlanningTakeControl);
  const constantChauffe = useSelector(selectConstantChauffe);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (demandeAllumage) {
      console.log("demande en cours");
      // math random
      setTimeout(() => {
        const probaAllumage = 0.5;
        if (Math.random() > probaAllumage) {
          console.log("CHAUDIERE ALLUMEE");
          dispatch({ type: "chaudiere/resetDemandeAllumage" });
          dispatch({ type: "chaudiere/allumer" });
          const allumage = () => {
            alert("CHAUDIERE ALLUMEE");
          };
          allumage();
          dispatch({
            type: "controller/setIsErrorChaudiere",
            payload: false,
          });

          if (isPlanningActive) {
            dispatch({
              type: "controller/setConstantChauffe",
              payload: true,
            });
          }
        } else {
          console.log("CHAUDIERE ERROR ALLUMAGE");

          dispatch({
            type: "controller/setChaudiereDemande",
            payload: false,
          });
          const erreurAllumage = () => {
            alert("Erreur allumage");
          };
          erreurAllumage();
          dispatch({
            type: "controller/setIsErrorChaudiere",
            payload: true,
          });

          dispatch({
            type: "chaudiere/resetDemandeAllumage",
          });
        }
      }, 10000);
    }
    return () => {
      clearTimeout(timer as NodeJS.Timeout);
    };
  }, [dispatch, demandeAllumage]);
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (constantChauffe && demandeAllumage) {
      timer = setTimeout(() => {
        dispatch({
          type: "thermostat/setTemperature",
          payload: temperature + 1,
        });
      }, 1000 * DELAI);
    } else {
      if ((compareTmTr >= 2 || !chaudiereAllumée) && !constantChauffe) {
        console.log("chaudiere eteinte dans le uE");
        timer = setTimeout(() => {
          dispatch({
            type: "thermostat/setTemperature",
            payload: temperature - 1,
          });
        }, 1000 * DELAI);
      } else {
        // if(activateOrder) return;
        timer = setTimeout(() => {
          dispatch({
            type: "thermostat/setTemperature",
            payload: temperature + 1,
          });
        }, 1000 * DELAI);
      }
    }
    return () => {
      clearTimeout(timer as NodeJS.Timeout);
    };
  }, [
    compareTmTr,
    temperature,
    dispatch,
    chaudiereAllumée,
    isNormal,
    constantChauffe,
  ]);

  return (
    <div>
      <h1>Chaudiere</h1>
      <p>
        l'etat de la chaudiere est : {chaudiereAllumée ? "allumée" : "éteinte"}{" "}
      </p>
      {/* <div> compte rendu ok ? {isIgnition ? ('True'):('False')} </div> */}
    </div>
  );
};

export default Chaudiere;
