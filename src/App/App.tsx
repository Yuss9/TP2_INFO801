import React, { useRef } from 'react';
import logo from '../logo.svg';
import './App.css';
import Thermostat from "./features/Thermostat/Thermostat";
import Chaudiere from "./features/Chaudière/Chaudiere";
import Controller from "./features/Controlleur/Controller";
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
        <div className="App">
            <header><h1>Application Chaudiere</h1></header>
            <br/>
            <br/>
            <Thermostat></Thermostat>
            <br/>
            <Chaudiere></Chaudiere>
            <br/>
            <Controller></Controller>
            <br/>
        </div>
        </Provider>
    );
}

export default App;
