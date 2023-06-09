import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectTemperature,
  selectTemperatureRef,
} from "../Thermostat/thermostatSlice";
import {
  selectCompareTmTr,
  selectPlanningTakeControl,
} from "./ControllerSlice";
import { selectChaudiereAllumee } from "../Chaudière/ChaudièreSlice";
import { selectHoraireChaudiere } from "../HoraireChaudiere/HoraireChaudiereSlice";
import { setConstantChauffe } from "./ControllerSlice";

export const Controller = () => {
  const temperature = useSelector(selectTemperature);
  const temperatureRef = useSelector(selectTemperatureRef);
  const compareTmTr = useSelector(selectCompareTmTr);
  const dispatch = useDispatch();
  const chaudiereAllumée = useSelector(selectChaudiereAllumee);
  const currentHoraire = useSelector(selectHoraireChaudiere);

  // secondes actuelle
  const date = new Date();
  const secondes = date.getSeconds();
  // verifier si l'horaire actuell est dans la plage horaire de chauffe

  useEffect(() => {
    const date = new Date();
    const heure = date.getHours();
    const minute = date.getMinutes();
    const heureDebut = currentHoraire.horaire.heureDebut;
    const heureFin = currentHoraire.horaire.heureFin;
    const minuteDebut = currentHoraire.horaire.minuteDebut;
    const minuteFin = currentHoraire.horaire.minuteFin;

    console.log("je suis dedans");

    if (heure >= heureDebut && heure <= heureFin) {
      if (heure === heureDebut && minute < minuteDebut) {
        // allume pas la chaudiere
        console.log("le planning n'est pas encore actif");
        dispatch({
          type: "controller/setPlanningTakeControl",
          payload: false,
        });
        dispatch({
          type: "controller/setConstantChauffe",
          payload: false,
        });
      } else if (heure === heureFin && minute > minuteFin) {
        console.log("le planning n'est plus actif");
        dispatch({
          type: "controller/setPlanningTakeControl",
          payload: false,
        });
        dispatch({
          type: "controller/setConstantChauffe",
          payload: false,
        });

        // allume pas la chaudiere
      } else {
        console.log("le planning est actif");
        dispatch({
          type: "controller/setPlanningTakeControl",
          payload: true,
        });

        if (chaudiereAllumée) {
          dispatch({
            type: "controller/setConstantChauffe",
            payload: true,
          });
        } else {
          dispatch({
            type: "controller/setConstantChauffe",
            payload: false,
          });
        }

        // allume la chaudiere
      }
    } else {
      console.log("le planning n'est pas actif");
      dispatch({
        type: "controller/setPlanningTakeControl",
        payload: false,
      });
      dispatch({
        type: "controller/setConstantChauffe",
        payload: false,
      });

      // allume pas la chaudiere
    }
  }, [currentHoraire, secondes]);

  useEffect(() => {
    const setCompareTmTr = () => {
      const resultingTemperature = temperature - temperatureRef;
      dispatch({
        type: "controller/setCompareTmTr",
        payload: resultingTemperature,
      });
    };
    setCompareTmTr();
    console.log("temperatureRef", temperatureRef);
    dispatch({
      type: "controller/setChaudiereActive",
      payload: chaudiereAllumée,
    });
  }, [dispatch, temperature, temperatureRef, compareTmTr, chaudiereAllumée]);

  return (
    <div>
      <h1>Controller</h1>
      <p>La comparaison entre Tm, Tr est : </p>
      <p> tr {temperatureRef}</p>
      <p> tm {temperature}</p>
      <p>
        la temperature courante est {compareTmTr}{" "}
        {compareTmTr > 0 ? " °c superieure" : " °c inferieure"}
      </p>
      {compareTmTr > 0 ? (
        <p>on ne doit pas chauffer</p>
      ) : (
        <p>on doit chauffer</p>
      )}
    </div>
  );
};

export default Controller;
