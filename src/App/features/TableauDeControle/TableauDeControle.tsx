import React from 'react';
import { selectChaudiereActive } from '../Controlleur/ControllerSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const TableauDeControle = () => {
    const chaudiereActive = useSelector(selectChaudiereActive);
    const dispatch = useDispatch();
    const handleClick = () =>{
        console.log("Allumer Chaudiere");
        dispatch({type: 'controller/setChaudiereActive', payload: !chaudiereActive})
    }
    return (
        <div>
            <h1>Tableau de controle</h1>
            <button onClick={handleClick}>{chaudiereActive? "Eteindre Chaudiere":"Allumer Chaudiere"}</button>
        </div>
    );
};

export default TableauDeControle;