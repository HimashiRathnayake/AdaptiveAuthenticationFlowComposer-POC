import React from 'react';
import './styles/App.css';
import VisualEditor from "./visualEditor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
// import {SideBar} from "./sideBar/SideBar";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <p>Adaptive Authentication Flow Composer</p>
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

