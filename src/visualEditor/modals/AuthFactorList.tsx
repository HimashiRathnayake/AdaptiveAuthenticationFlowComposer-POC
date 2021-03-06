import React, {useEffect, useState} from 'react';
import "../../styles/modal.css"
import {Checkbox, ListItemText, MenuItem} from "@material-ui/core";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setUseAttributesFromStep, setUseSubjectFromStep} from "../../store/actions/actionCreators";
import {Dispatch} from "redux";
import ReactModal from "react-modal";
import {Hint} from "../../components/Hint";
import {getAuthenticators} from "../../api/application";
import {Authenticator} from "../components/Authenticator";
import {AlertModal} from "../../components/AlertModal";

type Props={
    isOpen:boolean,
    onDone: Function,
    step: number,
    nextStep: number,
    onBack: Function
}

export const AuthFactorList: React.FC<Props> = ({isOpen, onDone, step, nextStep, onBack}) => {

    let factors: any[] = [];
    let factorsOfFirstStep: any[] = [];
    let prefix : any = null;
    if (step===null){
        prefix = 'New';
    }

    const [authFactors, setAuthFactors] = useState([]);
    const [idpList, setIdpList] = useState([]);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);

    useEffect(() => {
        getAuthenticators()
            .then((response) => {
                setAuthFactors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getAuthenticators("idp")
            .then((response) => {
                setIdpList(response.data.identityProviders);
            })
            .catch((error) => {
                console.log(error);
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
        (step: number) => dispatch(setUseSubjectFromStep(step)),
        [dispatch]
    );

    const changeAttributesFRom = React.useCallback(
        (step: number) => dispatch(setUseAttributesFromStep(step)),
        [dispatch]
    );

    let currentStep = steps.filter((element:any)=>element.id===step);
    if (currentStep.length>0){
        factors=currentStep[0].options
    }

    let firstStep = steps.filter((element:any)=>element.id===1);
    if (firstStep.length>0){
        factorsOfFirstStep=firstStep[0].options
    }

    const [checkedList, setCheckedList] : [any, any] = useState(factors);
    const [useSubjectFromThisStep, setUseSubjectFromThisStep] : [any, any] = useState(useSubjectFrom===step);
    const [useAttributesFromThisStep, setUseAttributesFromThisStep] : [any, any] = useState(useAttributesFrom===step);

    const onChange = (name?:string) => {
        if(checkedList.indexOf(name)===-1){
            setCheckedList((checkedList:any[])=>[...checkedList, name]);
        }else{
            setCheckedList((checkedList:any[])=>[...checkedList.slice(0, checkedList.indexOf(name)), ...checkedList.slice(checkedList.indexOf(name) + 1)]);
        }
    }

    const onClick = () => {
        if (useSubjectFrom===step && !useSubjectFromThisStep){
            changeSubjectIdentifier(1);
        }else if (!(useSubjectFrom===step) && useSubjectFromThisStep){
            if (step===null && nextStep===null) {
                changeSubjectIdentifier(steps.length+1);
            }else if (step===null) {
                changeSubjectIdentifier(nextStep);
            }else {
                changeSubjectIdentifier(step);
            }
        }
        if (useAttributesFrom===step && !useAttributesFromThisStep){
            changeAttributesFRom(1);
        }else if(!(useAttributesFrom===step) && useAttributesFromThisStep){
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

                <div className="authFactorsHeader">Authenticators</div>
                <div className="authFactorsType">Local</div>
                <div className="innerFactorsContainer">
                    {authFactors.map((factor: any) => {
                        let disabled = false;
                        if(factor.displayName==="fido" || factor.displayName==="totp"){
                            if (step===1 || nextStep==1) {
                                disabled = true;
                            }else if(factorsOfFirstStep.indexOf("basic")===-1 && factorsOfFirstStep.indexOf("identifier-first")===-1){
                                disabled = true;
                            }
                        }
                        let checked = checkedList.indexOf(factor.displayName)!==-1 && !disabled
                        return(
                            <Authenticator
                                key={factor.id}
                                factorName={factor.displayName}
                                factorType={factor.type}
                                checked={checked}
                                onChange={onChange}
                                disabled={disabled}
                            />
                        )})
                    }
                </div>
                <div className="authFactorsType">Social Login</div>
                <div className="innerFactorsContainer">
                    {idpList.map((factor: any) => {
                        let checked = checkedList.indexOf(factor.name)!==-1
                        return(
                            <Authenticator
                                key={factor.id}
                                factorName={factor.name}
                                factorType={factor.type}
                                checked={checked}
                                onChange={onChange}
                                disabled={false}
                            />
                        )
                    })}
                </div>

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

                <AlertModal
                    header={<>You are adding a handler</>}
                    content={<>The authenticator you are trying to add is a handler. Make sure you add authenticators in other steps.</>}
                    isOpen={openConfirmMessage}
                    onConfirm={()=>{setOpenConfirmMessage(false)}}
                />

            </div>
        </ReactModal>
    );
}
