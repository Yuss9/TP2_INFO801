import React from 'react';
import { selectChaudiereActive, selectIsErrorChaudiere } from '../Controlleur/ControllerSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from './TableauDeControle.module.css';

const TableauDeControle = () => {
    const chaudiereActive = useSelector(selectChaudiereActive);
    const dispatch = useDispatch();
    const controllerChaudiereState = useSelector(selectChaudiereActive);
    const isErrorChaudiere = useSelector(selectIsErrorChaudiere);
    const handleClick = () =>{
        if(chaudiereActive) {dispatch({type:'chaudiere/eteindre'});return}
        dispatch({type:'chaudiere/demandeAllumage',payload:true})
    }
    
    return (
      <>
        <div>
          <h1>Tableau de controle</h1>
          <button onClick={handleClick} disabled={isErrorChaudiere}>
            {chaudiereActive ? "Eteindre Chaudiere" : "Allumer Chaudiere"}
          </button>
        </div>
        {isErrorChaudiere ? (
          <div className={styles.container}>
            <span className={styles.state}></span>
            <p>ErreurChaudiere</p>
          </div>
        ) :''}
      </>
    );
};

export default TableauDeControle;