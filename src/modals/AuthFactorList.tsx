import React, {useEffect, useState} from 'react';
import "../styles/modal.css"
import {Checkbox, ListItemText, MenuItem, Tooltip} from "@material-ui/core";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setUseAttributesFromStep, setUseSubjectFromStep} from "../store/actionCreators";
import {Dispatch} from "redux";
import ReactModal from "react-modal";
import {AuthenticatorIcons} from "../authenticationFactors/AuthenticatorIcons";
import {Hint} from "../components/Hint";
import {getAuthenticators, getIdentityProviders} from "../api/application";

type Props={
    isOpen:boolean,
    onDone: Function,
    step: string,
    nextStep: string,
    onBack: Function
}

export const AuthFactorList: React.FC<Props> = ({isOpen, onDone, step, nextStep, onBack}) => {

    let factors: any[] = [];
    let prefix : any = null;
    if (step===null){
        prefix = 'New';
    }

    const [authFactors, setAuthFactors] = useState([]);
    const [idpList, setIdpList] = useState([]);

    useEffect(() => {
        getAuthenticators()
            .then((response) => {
                setAuthFactors(response.data);
            })
            .catch((error) => {

            });
        getIdentityProviders()
            .then((response) => {
                setIdpList(response.data.identityProviders);
            })
            .catch((error) => {

            });
    }, []);

    const [steps, useSubjectFrom, useAttributesFrom] : any = useSelector(
        (state:any) => {
            return [state.stepReducer.steps,state.stepReducer.useSubjectFrom, state.stepReducer.useAttributesFrom]
        },
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch();

    const changeSubjectIdentifier = React.useCallback(
        (step: string) => dispatch(setUseSubjectFromStep(step)),
        [dispatch]
    );

    const changeAttributesFRom = React.useCallback(
        (step: string) => dispatch(setUseAttributesFromStep(step)),
        [dispatch]
    );

    let authFactorsOfStep = steps.filter((element:any)=>element.id==step);
    if (authFactorsOfStep.length>0){
        factors=authFactorsOfStep[0].options
    }

    const [checkedList, setCheckedList] : [any, any] = useState(factors);
    const [useSubjectFromThisStep, setUseSubjectFromThisStep] : [any, any] = useState(useSubjectFrom==step);
    const [useAttributesFromThisStep, setUseAttributesFromThisStep] : [any, any] = useState(useAttributesFrom==step);

    const onChange = (name?:string) => {
        if(checkedList.indexOf(name)===-1){
            setCheckedList((checkedList:any[])=>[...checkedList, name]);
        }else{
            setCheckedList((checkedList:any[])=>[...checkedList.slice(0, checkedList.indexOf(name)), ...checkedList.slice(checkedList.indexOf(name) + 1)]);
        }
    }

    const onClick = () => {
        if (useSubjectFrom==step && !useSubjectFromThisStep){
            changeSubjectIdentifier("1");
        }else if (!(useSubjectFrom==step) && useSubjectFromThisStep){
            if (step===null && nextStep===null) {
                changeSubjectIdentifier(steps.length+1);
            }else if (step===null) {
                changeSubjectIdentifier(nextStep);
            }else {
                changeSubjectIdentifier(step);
            }
        }
        if (useAttributesFrom==step && !useAttributesFromThisStep){
            changeAttributesFRom("1");
        }else if(!(useAttributesFrom==step) && useAttributesFromThisStep){
            if (step===null && nextStep===null){
                changeAttributesFRom(steps.length+1);
            }else if (step===null){
                changeAttributesFRom(nextStep);
            }else {
                changeAttributesFRom(step);
            }
        }
        onDone(checkedList);
    }

    return (
        <ReactModal
            isOpen={isOpen}
            className="authFactorList modal"
            overlayClassName="overlay"
            bodyOpenClassName="modalOpened"
        >
            <div className="authFactorsContainer">
                <div className="headerContainer">
                    {prefix} Step {step} Configuration
                    <div className="headerHeading">Configure authentication step by selecting the local/federated authenticators.</div>
                </div>
                <div className="menu">
                    <div className="menuItemContainer">
                        <MenuItem value="subject" className="menuItem">
                            <Checkbox
                                className="checkbox"
                                color="default"
                                checked={useSubjectFromThisStep}
                                onChange={(event, checked) => setUseSubjectFromThisStep(checked)}
                            />
                            <ListItemText primary={"Use subject identifier from this step"} className="menuItemName"/>
                        </MenuItem>
                        <Hint hint="This option will use the subject identifier from this step"/>
                    </div>
                    <div className="menuItemContainer">
                        <MenuItem value="attributes" className="menuItem">
                            <Checkbox
                                className="checkbox"
                                color="default"
                                checked={useAttributesFromThisStep}
                                onChange={(event, checked) => setUseAttributesFromThisStep(checked)}
                            />
                            <ListItemText primary={"Use attributes from this step"} className="menuItemName"/>
                        </MenuItem>
                        <Hint hint="This option will use the attributes identifier from this step"/>
                    </div>
                </div>
                {/*<div className="authFactorsListContainer">*/}
                    <div className="authFactorsHeader">Authenticators</div>
                    <div className="authFactorsType">Local</div>
                    <div className="innerFactorsContainer">
                        {authFactors.map((factor: any) => {
                            let disabled = ((step=="1" || nextStep=="1") && factor.displayName==="fido")
                            let checked = checkedList.indexOf(factor.displayName)!==-1 && !disabled
                            return(
                                disabled ? (<div key={factor.id}></div>
                                ): (<div className="factorContainer" key={factor.id}>
                                    <button
                                        className={checked ? "factor selectedFactor": "factor unselectedFactor"}
                                        onClick={()=>onChange(factor.displayName)}
                                    >
                                        <div className={factor.type}>
                                            <AuthenticatorIcons type={factor.displayName+"1"} iconX={0} iconY={0} iconHeight={40} iconWidth={40}/>
                                        </div>
                                        {/*{(factor.displayName==="identifier-first"||factor.displayName==="active-sessions-limit-handler") && checkedList.indexOf(factor.displayName)!==-1 && <p className="warning">This is a handler. Make sure you add authenticators in other steps.</p>}*/}
                                    </button>
                                    <Tooltip title={factor.displayName}>
                                        <div className="factorName">
                                            {factor.displayName}
                                        </div>
                                    </Tooltip>
                                </div>
                            ))
                        })}
                    </div>
                    <div className="authFactorsType">Social Login</div>
                    <div className="innerFactorsContainer">
                        {idpList.map((factor: any) => {
                            let checked = checkedList.indexOf(factor.name)!==-1
                            return(
                                <div className="factorContainer" key={factor.id}>
                                    <button
                                        className={checked ? "factor selectedFactor": "factor unselectedFactor"}
                                        onClick={()=>onChange(factor.name)}
                                    >
                                        <div className={factor.type}>
                                            <AuthenticatorIcons type={factor.name+"1"} iconX={0} iconY={0} iconHeight={40} iconWidth={40}/>
                                        </div>
                                        {/*{(factor.displayName==="identifier-first"||factor.displayName==="active-sessions-limit-handler") && checkedList.indexOf(factor.displayName)!==-1 && <p className="warning">This is a handler. Make sure you add authenticators in other steps.</p>}*/}
                                    </button>
                                    <Tooltip title={factor.name}>
                                        <div className="factorName">
                                            {factor.name}
                                        </div>
                                    </Tooltip>
                                </div>
                            )
                        })}
                    </div>
                {/*</div>*/}

                <div className="buttonContainer">
                    <div>
                        <button
                            className="doneButton floatRight"
                            onClick={()=>onClick()}
                            disabled={checkedList.length===0}
                        >
                            Done
                        </button>
                        <button
                            className="cancelButton"
                            onClick={()=>onBack()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}
