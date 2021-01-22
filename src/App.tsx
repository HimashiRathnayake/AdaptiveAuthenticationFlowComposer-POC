import React, {useState} from 'react';
import './styles/App.css';
import VisualEditor from "./visualEditor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {VscDebugRestart} from "react-icons/all";
import Icon from "./icons/Asgardeo-Logos/SVG/logo-2.svg";
import {SideBar} from "./sideBar/SideBar";
import {shallowEqual, useSelector} from "react-redux";
import {GenerateCodeFromAst} from "./mapper/CodeGenerator";
import {getAuthenticators, updateAuthenticationSequence} from "./api/application";
import authFactors from "./api/AuthFactors.json";
import { store } from 'react-notifications-component';

const App = () => {

    const [ast, steps, subjectStepId, attributeStepId] : [any, any, any, any] = useSelector(
        (state:any) => {
            return [state.astReducer.ast, state.stepReducer.steps, state.stepReducer.useSubjectFrom, state.stepReducer.useAttributesFrom]
        },
        shallowEqual
    );
    
    const getInfo = (option:any) : any => {
        return authFactors.filter((factor:any)=>factor.displayName===option)
    }

    const stepsToRequest = steps.map((step : any) => {
        return {
            id: +step.id,
            options: step.options.map((option:any)=>{
                let optionInfo : any = getInfo(option)[0];
                return {
                    authenticator: optionInfo.name,
                    idp: optionInfo.type
                }
            })
        }
    })

    const requestBody = {
        authenticationSequence: {
            attributeStepId: +subjectStepId,
            steps: stepsToRequest,
            subjectStepId: +attributeStepId,
            type: "USER_DEFINED",
            script: GenerateCodeFromAst(ast)?.replaceAll("function (","function("),
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
                        onClick={()=>{
                            updateAuthenticationSequence(requestBody).then(()=>{
                                store.addNotification({
                                    title: "Update Successful",
                                    message: "Successfully updated the authentication flow of the application",
                                    type: "success",
                                    insert: "bottom",
                                    container: "bottom-right",
                                    animationIn: ["animate__animated", "animate__fadeIn"],
                                    animationOut: ["animate__animated", "animate__fadeOut"],
                                    dismiss: {
                                        duration: 4000,
                                        onScreen: true,
                                        showIcon: true
                                    }
                                });
                            }).catch(()=>{
                                store.addNotification({
                                    title: "Error!",
                                    message: "Something went wrong",
                                    type: "danger",
                                    insert: "bottom",
                                    container: "bottom-right",
                                    animationIn: ["animate__animated", "animate__fadeIn"],
                                    animationOut: ["animate__animated", "animate__fadeOut"],
                                    dismiss: {
                                        duration: 4000,
                                        onScreen: true,
                                        showIcon: true
                                    }
                                });
                            })
                        }}
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

