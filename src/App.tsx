import React from 'react';
import './styles/App.css';
import VisualEditor from "./visualEDitor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {SideBar} from "./SideBar/SideBar";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <p>Adaptive Authentication Flow Composer</p>
            </header>
            <div className="Container">
                <div className="Side-bar"><SideBar/></div>
                <div className="Visual-editor"><VisualEditor/></div>
                <div className="Script-editor"><ScriptEditor/></div>
            </div>
        </div>
    );
}

export default App;

// import React from 'react';
// import './styles/App.css';
// import VisualEditor from "./visualEDitor/VisualEditor";
// import ScriptEditor from "./scriptEditor/ScriptEditor";
// import {SideBar} from "./SideBar/SideBar";
// import {ReactComponent as LoginBox} from "./svg/login-box.svg";
//
// const App = () => {
//     return (
//         <div className="App">
//             <LoginBox style={{width: "25%", height:"35%"}}/>
//         </div>
//     );
// }
//
// export default App;


