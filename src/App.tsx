import React from 'react';
import './styles/App.css';
import VisualEditor from "./visualEditor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {VscDebugRestart} from "react-icons/all";
import Icon from "./icons/Asgardeo-Logos/SVG/logo-2.svg";
// import {SideBar} from "./sideBar/SideBar";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={Icon} alt="" className="header-icon"/>
                <div className="headerText">Authentication Flow Designer</div>
                <div className="headerButtonContainer">
                    <button
                        className="reset-button"
                        onClick={()=>window.location.reload()}
                    >
                        <VscDebugRestart className="reset-icon"/> Reset
                    </button>
                </div>
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

