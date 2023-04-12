import React from 'react';
import { selectChaudiereActive } from '../Controlleur/ControllerSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const TableauDeControle = () => {
    const chaudiereActive = useSelector(selectChaudiereActive);
    const dispatch = useDispatch();
    const handleClick = () =>{
        if(chaudiereActive) {dispatch({type:'chaudiere/eteindre'});return}
        dispatch({type:'chaudiere/demandeAllumage',payload:true})
    }
    
    return (
        <div>
            <h1>Tableau de controle</h1>
            <button onClick={handleClick}>{chaudiereActive? "Eteindre Chaudiere":"Allumer Chaudiere"}</button>
        </div>
    );
};

export default TableauDeControle;