import React, {useEffect} from 'react';
import './styles/App.css';
import VisualEditor from "./visualEditor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {VscDebugRestart} from "react-icons/all";
import Icon from "./icons/Asgardeo-Logos/SVG/logo-2.svg";
import {SideBar} from "./sideBar/SideBar";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {GenerateCodeFromAst} from "./mapper/CodeGenerator";
import {
    getApplicationDetails,
    updateAuthenticationSequence
} from "./api/application";
import authFactors from "./api/AuthFactors.json";
import { store } from 'react-notifications-component';
import {Dispatch} from "redux";
import {saveAstFromVisualEditor, saveStep} from "./store/actionCreators";
import {ParseToAst} from "./mapper/Parser";

const App = () => {

    const [ast, steps, subjectStepId, attributeStepId] : [any, any, any, any] = useSelector(
        (state:any) => {
            return [state.astReducer.ast, state.stepReducer.steps, state.stepReducer.useSubjectFrom, state.stepReducer.useAttributesFrom]
        },
        shallowEqual
    );

    const dispatch: Dispatch<any> = useDispatch();

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAstFromVisualEditor(ast)),
        [dispatch]
    );

    const addFactorToStep = React.useCallback(
        (step: string, factors:any[]) => dispatch(saveStep(step, factors)),
        [dispatch]
    );

    const appId = window.location.search.split("?appId=")[1];

    const getInfo = (option:any) : any => {
        return authFactors.filter((factor:any)=>factor.displayName===option)
    }

    const getDisplayName = (option:any) : any => {
        return authFactors.filter((factor:any)=>factor.name===option.authenticator)
    }

    console.log(steps)

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

    const updateStore = (script:string, steps:any) => {
        saveAstToStore(ParseToAst(script));
        for(let step of steps){
            let options = step.options.map((option:any)=>getDisplayName(option)[0].displayName)
            addFactorToStep(`${step.id}`, options);
        }
    }

    useEffect(()=>{
        getApplicationDetails(appId)
            .then((response)=>{
                updateStore(response.data.authenticationSequence.script, response.data.authenticationSequence.steps);
            })
            .catch((error)=>{

            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={Icon} alt="" className="header-icon"/>
                <div className="headerText">Authentication Flow Designer</div>
                <div className="headerButtonContainer">
                    <button
                        className="header-button reset"
                        onClick={()=>window.location.reload()}
                    >
                        <VscDebugRestart className="reset-icon"/> Reset
                    </button>
                    <button
                        className="header-button update"
                        onClick={()=>{
                            updateAuthenticationSequence(requestBody, appId).then(()=>{
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

