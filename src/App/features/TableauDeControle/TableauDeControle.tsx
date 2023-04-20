import React from "react";
import {
  selectChaudiereActive,
  selectIsErrorChaudiere,
} from "../Controlleur/ControllerSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./TableauDeControle.module.css";
import { selectPlanningTakeControl } from "../Controlleur/ControllerSlice";
import { selectChaudiereAllumee } from "../Chaudière/ChaudièreSlice";

const TableauDeControle = () => {
  const chaudiereActive = useSelector(selectChaudiereActive);
  const dispatch = useDispatch();
  const controllerChaudiereState = useSelector(selectChaudiereActive);
  const isErrorChaudiere = useSelector(selectIsErrorChaudiere);
  const isPlanningActive = useSelector(selectPlanningTakeControl);
  const isChaudireAllume = useSelector(selectChaudiereAllumee);

  useEffect(() => {
    if (isPlanningActive) {
      if (isChaudireAllume) {
        dispatch({ type: "controller/setConstantChauffe", payload: true });
      } else {
        console.log("je vais envoyer la demande d'allumage");
        dispatch({ type: "chaudiere/demandeAllumage", payload: true });
      }
    }
  }, [isPlanningActive]);

  const resetPlanning = () => {
    if (isPlanningActive) {
      if (isChaudireAllume) {
        dispatch({ type: "chaudiere/eteindre" });
        dispatch({ type: "controller/setChaudiereActive", payload: false });
        dispatch({ type: "controller/setConstantChauffe", payload: false });
      }

      console.log("je vais envoyer la demande d'allumage");
      dispatch({ type: "chaudiere/demandeAllumage", payload: true });
    }
  };

  const deletePlanning = () => {
    console.log("je vais supprimer le planning");
    dispatch({ type: "controller/setPlanningTakeControl", payload: false });
    dispatch({
      type: "controller/setConstantChauffe",
      payload: false,
    });

    // setHoraireChaudiere
    dispatch({
      type: "horaireChaudiere/removeChaudierePlanning",
      payload: {
        horaire: {
          heureDebut: 0,
          heureFin: 0,
          minuteDebut: 0,
          minuteFin: 0,
        },
      },
    });

    alert("Le planning a été supprimé");
  };

  const handleClick = () => {
    if (chaudiereActive) {
      dispatch({ type: "chaudiere/eteindre" });
      dispatch({ type: "controller/setConstantChauffe", payload: false });
      return;
    }
    dispatch({ type: "chaudiere/demandeAllumage", payload: true });
  };

  return (
    <>
      <div>
        <h1>Tableau de controle</h1>
        <button onClick={handleClick} disabled={isErrorChaudiere}>
          {chaudiereActive ? "Eteindre Chaudiere" : "Allumer Chaudiere"}
        </button>
        <br />
        <br />
        <button onClick={resetPlanning} disabled={isErrorChaudiere}>
          Reset le planning et la chaudiere
        </button>

        <br />
        <br />

        <button onClick={deletePlanning} disabled={isErrorChaudiere}>
          Supprimer la plage horaire
        </button>
      </div>
      {isErrorChaudiere ? (
        <div className={styles.container}>
          <span className={styles.state}></span>
          <p>ErreurChaudiere</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TableauDeControle;
