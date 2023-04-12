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

const TableauDeControle = () => {
  const chaudiereActive = useSelector(selectChaudiereActive);
  const dispatch = useDispatch();
  const controllerChaudiereState = useSelector(selectChaudiereActive);
  const isErrorChaudiere = useSelector(selectIsErrorChaudiere);
  const isPlanningActive = useSelector(selectPlanningTakeControl);

  useEffect(() => {
    if (isPlanningActive) {
      console.log("je vais envoyer la demande d'allumage");
      dispatch({ type: "chaudiere/demandeAllumage", payload: true });
    }
  }, [isPlanningActive]);

  const resetPlanning = () => {
    if (isPlanningActive) {
      console.log("je vais envoyer la demande d'allumage");
      dispatch({ type: "chaudiere/demandeAllumage", payload: true });
    }
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
