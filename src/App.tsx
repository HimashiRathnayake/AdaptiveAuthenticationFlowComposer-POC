import React from 'react';
import './styles/App.css';
import VisualEditor from "./visualEditor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {VscDebugRestart} from "react-icons/all";
import Icon from "./icons/Asgardeo-Logos/SVG/logo-2.svg";
import {SideBar} from "./sideBar/SideBar";
import {shallowEqual, useSelector} from "react-redux";
import {GenerateCodeFromAst} from "./mapper/CodeGenerator";
import {updateAuthenticationSequence} from "./api/application";

const App = () => {

    const [ast, steps, subjectStepId, attributeStepId] : [any, any, any, any] = useSelector(
        (state:any) => {
            return [state.astReducer.ast, state.stepReducer.steps, state.stepReducer.useSubjectFrom, state.stepReducer.useAttributesFrom]
        },
        shallowEqual
    );

    const requestBody = {
        authenticationSequence: {
            attributeStepId: +subjectStepId,
            steps: [
                {
                    "id": 1,
                    "options": [
                        {
                            "authenticator": "BasicAuthenticator",
                            "idp": "LOCAL"
                        }
                    ]
                },
                {
                    "id": 2,
                    "options": [
                        {
                            "authenticator": "BasicAuthenticator",
                            "idp": "LOCAL"
                        }
                    ]
                }
            ],
            subjectStepId: +attributeStepId,
            type: "USER_DEFINED",
            script: GenerateCodeFromAst(ast),
        }
    };

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
                    <button
                        className="reset-button"
                        onClick={()=>updateAuthenticationSequence(requestBody)}
                    >
                        Update
                    </button>
                </div>
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

