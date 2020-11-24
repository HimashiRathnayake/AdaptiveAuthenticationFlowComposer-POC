import React from 'react';
import './App.css';
import ScriptEditor from './scriptEditor/ScriptEditor';
import VisualEditor from "./visualEDitor/VisualEditor";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Adaptive Authentication Flow Composer
        </p>
      </header>
        <div style={{flex:1, flexDirection: "row-reverse"}}>
            <div style={{flex:1, position:'absolute', left:0}}><VisualEditor/></div>
            <div style={{flex:1, position:'absolute', right:0}}><ScriptEditor/></div>
        </div>
    </div>
  );
}

export default App;

