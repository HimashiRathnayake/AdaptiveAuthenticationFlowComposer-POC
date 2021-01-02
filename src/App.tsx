import React from 'react';
import './styles/App.css';
import VisualEditor from "./visualEditor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {GrPowerReset, VscDebugRestart} from "react-icons/all";
import Icon from "./icons/icon.svg";
// import {SideBar} from "./sideBar/SideBar";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={Icon} alt="Jwt" className="header-icon"/>
                <p>Adaptive Authentication Flow Composer</p>
                <button
                    className="reset-button"
                    onClick={()=>window.location.reload()}
                >
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <VscDebugRestart className="reset-icon"/> Reset
                </button>
            </header>
            <div className="Container">
                {/*<div className="Side-bar"><SideBar/></div>*/}
                <div className="Visual-editor"><VisualEditor/></div>
                <div className="Script-editor"><ScriptEditor/></div>
            </div>
        </div>
    );
}

export default App;

