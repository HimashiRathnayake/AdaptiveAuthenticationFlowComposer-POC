import React from 'react';
import './App.css';
import ScriptEditor from './scriptEditor/ScriptEditor';
import VisualEditor from "./visualEDitor/VisualEditor";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Adaptive Authentication Flow Composer
        </p>
      </header>
        <div style={{flex:1, flexDirection: "row", display: "flex"}}>
            <div><VisualEditor/></div>
            <div><ScriptEditor/></div>
        </div>
    </div>
  );
}

export default App;

