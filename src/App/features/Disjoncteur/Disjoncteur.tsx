import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectIsErrorChaudiere } from "../Controlleur/ControllerSlice";
import { useEffect } from "react";


const Disjoncteur = () => {
  const dispatch = useDispatch();
  const clickable = useSelector(selectIsErrorChaudiere);
  const handleClick = () => {
    console.log("click disjoncteur");
    dispatch({ type: "controller/setIsErrorChaudiere", payload: false})
  };

  // timer 
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (clickable) {
        timer = setTimeout(() => {
        dispatch({ type: "controller/setIsErrorChaudiere", payload: true });
        }, 1000 * 10);
    }
    return () => {
        clearTimeout(timer as NodeJS.Timeout);
    };
  }, [clickable])
  

  return (
    <>
      <div>
        <h1>Disjoncteur</h1>
        <button onClick={handleClick} disabled={!clickable}>
          Disjoncteur
        </button>
      </div>
    </>
  );
};

export default Disjoncteur;