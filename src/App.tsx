import React, {ReactElement, useEffect, useRef, useState} from 'react';
import './styles/App.css';
import VisualEditor from "./visualEditor/VisualEditor";
import ScriptEditor from "./scriptEditor/ScriptEditor";
import {IoMdCheckmarkCircleOutline, VscDebugRestart} from "react-icons/all";
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
import {
    saveAstFromVisualEditor,
    saveStep,
    setUseAttributesFromStep,
    setUseSubjectFromStep
} from "./store/actions/actionCreators";
import {ParseToAst} from "./mapper/Parser";
import {AlertModal} from "./components/AlertModal";
import ScriptBasedFlow from "./scriptEditor/Script-based-flow";

const App = () => {

    const [AddConfirmation, setAddConfirmation] = useState<boolean>(false);
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
        (step: number, factors:string[]) => dispatch(saveStep(step, factors)),
        [dispatch]
    );

    const changeSubjectIdentifier = React.useCallback(
        (step: number) => dispatch(setUseSubjectFromStep(step)),
        [dispatch]
    );

    const changeAttributesFRom = React.useCallback(
        (step: number) => dispatch(setUseAttributesFromStep(step)),
        [dispatch]
    );

    const searchUrlPrams = new URLSearchParams(window.location.search);
    const appId = searchUrlPrams.get("appId");
    const callbackUrl = searchUrlPrams.get("callbackUrl");

    const getInfo = (option:any) : any => {
        return authFactors.filter((factor:any)=>factor.displayName===option)
    }

    const getDisplayName = (option:any) : any => {
        return authFactors.filter((factor:any)=>factor.name===option.authenticator)
    }

    useEffect(() => {
            getApplicationDetails(appId)
                .then((response) => {
                    updateStore(response.data.authenticationSequence.script, response.data.authenticationSequence.steps, response.data.authenticationSequence.subjectStepId, response.data.authenticationSequence.attributeStepId);
                })
                .catch((error) => {
                    console.log(error);
                });
    }, []);

    const stepsToRequest = steps.filter((step: any)=>step.options.length!==0).map((step : any) => {
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
            attributeStepId: +attributeStepId,
            steps: stepsToRequest,
            subjectStepId: +subjectStepId,
            type: "USER_DEFINED",
            script: GenerateCodeFromAst(ast),
        }
    };

    const updateStore = (script:string, steps:any, subjectStepId:number, attributesStepId:number) => {
        saveAstToStore(ParseToAst(script));
        changeSubjectIdentifier(subjectStepId);
        changeAttributesFRom(attributesStepId);
        for(let step of steps){
            let options = step.options.map((option:any)=>getDisplayName(option)[0].displayName)
            addFactorToStep(step.id, options);
        }
    }

    const showAddConfirmation: ReactElement = (
        <AlertModal
            header={<><IoMdCheckmarkCircleOutline className="iconCorrect"/>Update Successful</>}
            content={<>We will route you back to the console and you can continue from there.</>}
            isOpen={AddConfirmation}
            onCancel={()=>setAddConfirmation(false)}
            onDone={()=>{
                    window.open(callbackUrl+'?activeTabIndex=4', '_self','noopener');
                }
            }
        />
    )

    return (
        <div className="App">
            <header className="App-header">
                <img src={Icon} alt="" className="header-icon"/>
                <div className="headerText">Authentication Flow Composer</div>
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
                                setAddConfirmation(true);
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

            <div className="App-Container">
                <SideBar/>
                <VisualEditor/>
                <ScriptBasedFlow/>
            </div>
            {showAddConfirmation}

        </div>
    );
}

export default App;

