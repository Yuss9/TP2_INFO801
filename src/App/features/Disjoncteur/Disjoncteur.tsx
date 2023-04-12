import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectIsErrorChaudiere } from "../Controlleur/ControllerSlice";
import React, { useState, useEffect } from "react";

const Disjoncteur = () => {
  const dispatch = useDispatch();
  const clickable = useSelector(selectIsErrorChaudiere);
  const [isButtonClickable, setIsButtonClickable] = useState(clickable);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (clickable) {
      setIsButtonClickable(false);
      setRemainingTime(10);

      const intervalId = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        setIsButtonClickable(true);
        clearInterval(intervalId);
        setRemainingTime(0);
      }, 10 * 1000);

      //setTimeout(() => setIsButtonClickable(true), 10 * 1000);

      //setTimeout(() => setIsButtonClickable(true), 5 * 60 * 1000); // Désactiver le bouton pendant 5 minutes
    }
  }, [clickable]);

  const handleClick = () => {
    console.log("click disjoncteur");
    dispatch({ type: "controller/setIsErrorChaudiere", payload: false });
    setIsButtonClickable(false);
  };

  return (
    <>
      <div>
        <h1>Disjoncteur</h1>
        <button onClick={handleClick} disabled={!isButtonClickable}>
          Disjoncteur
        </button>
        {remainingTime !== 0 && <p>Temps restant : {remainingTime} secondes</p>}
      </div>
    </>
  );
};

export default Disjoncteur;
