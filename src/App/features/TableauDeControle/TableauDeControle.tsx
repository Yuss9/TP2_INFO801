import React from 'react';
import { selectChaudiereActive } from '../Controlleur/ControllerSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const TableauDeControle = () => {
    const chaudiereActive = useSelector(selectChaudiereActive);
    const dispatch = useDispatch();
    const [ignition, setIgnition] = React.useState(false);
    const handleClick = () =>{
        setIgnition(Math.random()<0.5); // permet de savoir si la chaudiere est allumer ou pas 

        if(ignition){
            console.log("j'allume la chaudiere")
            dispatch({type: 'controller/setIsNormal', payload: true})
            dispatch({type: 'controller/setChaudiereActive', payload: true})
        }
        else{
            console.log("la chaudiere na pas pu etre allumer compte rendu false")
            dispatch({type: 'controller/setIsNormal', payload:false})
            dispatch({type: 'controller/setChaudiereActive', payload: false})
        }
    }

    return (
        <div>
            <h1>Tableau de controle</h1>
            <button onClick={handleClick}>{chaudiereActive? "Eteindre Chaudiere":"Allumer Chaudiere"}</button>
        </div>
    );
};

export default TableauDeControle;