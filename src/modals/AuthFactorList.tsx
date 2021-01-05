import React, {useState} from 'react';
import "../styles/modal.css"
import authFactors from "../AuthFactors.json";
import {Checkbox, ListItemText, MenuItem} from "@material-ui/core";
import {TiTick} from "react-icons/all";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setUseAttributesFromStep, setUseSubjectFromStep} from "../store/actionCreators";
import {Dispatch} from "redux";
import ReactModal from "react-modal";

type Props={
    onDone: Function,
    step: string,
    onBack: Function
}

export const AuthFactorList: React.FC<Props> = ({onDone, step, onBack}) => {

    let factors: any[] = [];

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

    const onChange = (checked?:boolean, name?:string) => {
        if(checked){
            setCheckedList((checkedList:any[])=>[...checkedList, name]);
        }else{
            setCheckedList((checkedList:any[])=>[...checkedList.slice(0, checkedList.indexOf(name)), ...checkedList.slice(checkedList.indexOf(name) + 1)]);
        }
    }

    const onSubjectChange = (checked?:boolean) => {
        if(checked){
            changeSubjectIdentifier(step);
        }
    }

    const onAttributesStepChange = (checked?:boolean) => {
        if(checked){
            changeAttributesFRom(step);
        }
    }

    return (
        <ReactModal
            isOpen={true}
            className="authFactorList modal"
            overlayClassName="overlay"
        >
            <div className="authFactorListContainer">
                <h1>Step {step}</h1>
                <div className="factor">
                    <MenuItem value="subject" className="menuItem">
                        <Checkbox
                            className="checkbox"
                            checked={useSubjectFrom==step}
                            onChange={(event, checked) => onSubjectChange(checked)}
                        />
                        <ListItemText primary={"Use subject identifier from this step"} />
                    </MenuItem>
                    <MenuItem value="attributes" className="menuItem">
                        <Checkbox
                            className="checkbox"
                            checked={useAttributesFrom==step}
                            onChange={(event, checked) => onAttributesStepChange(checked)}
                        />
                        <ListItemText primary={"Use attributes from this step"} />
                    </MenuItem>
                </div>
                <h2>Select Authentication Factors</h2>
                {authFactors.map((factor: any) => {
                    let disabled = (step=="1" && factor.displayName==="fido")
                        // || (checkedList.indexOf("basic")!==-1 && factor.type!=="federated" && factor.displayName!=="basic")
                    let checked = checkedList.indexOf(factor.displayName)!==-1 && !disabled
                    return(
                        <div className="factor" key={factor.id}>
                            <MenuItem value={factor.displayName} className="menuItem">
                                <Checkbox
                                    className="checkbox"
                                    disabled ={disabled}
                                    checked={checked}
                                    onChange={(event, checked) => onChange(checked, factor.displayName)}
                                />
                                <ListItemText primary={factor.displayName} />
                            </MenuItem>
                            {(factor.displayName==="identifier-first"||factor.displayName==="active-sessions-limit-handler") && checkedList.indexOf(factor.displayName)!==-1 && <p className="warning">This is a handler. Make sure you add authenticators in other steps.</p>}
                        </div>
                )})}

                <div className="button-container">
                    <button
                        className="button-2"
                        onClick={()=>onDone(checkedList)}
                        disabled={checkedList.length===0}
                    >
                        <TiTick/>
                        Done
                    </button>
                    <button
                        className="button-2"
                        onClick={()=>onBack()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </ReactModal>
    );
}
