import React from 'react';
import './App.css';
import VisualEditor from "./visualEDitor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {SideBar} from "./SideBar/SideBar";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <p>Adaptive Authentication Flow Composer</p>
            </header>
            <body className="Container">
                <div className="Side-bar"><SideBar/></div>
                <div className="Visual-editor"><VisualEditor/></div>
                <div className="Script-editor"><ScriptEditor/></div>
            </body>
        </div>
    );
}

export default App;

