import React, {useState} from 'react';
import "../styles/modal.css"
import authFactors from "../AuthFactors.json";
import {Checkbox, ListItemText, MenuItem} from "@material-ui/core";
import {TiTick} from "react-icons/all";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setUseAttributesFromStep, setUseSubjectFromStep} from "../store/actionCreators";
import {Dispatch} from "redux";
import ReactModal from "react-modal";
import {AuthenticatorIcons} from "../authenticationFactors/AuthenticatorIcons";

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

    if (step===null){
        step=steps.length+1;
    }

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

    const onChange = (name?:string) => {
        if(checkedList.indexOf(name)===-1){
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
            <div className="authFactorsContainer">
                <div className="headerContainer">
                    Step {step} Configuration
                    <div className="headerHeading">Configure authentication step by selecting the local/federated authenticators.</div>
                </div>
                <div className="menuItemContainer">
                    <MenuItem value="subject" className="menuItem">
                        <Checkbox
                            className="checkbox"
                            color="default"
                            checked={useSubjectFrom==step}
                            onChange={(event, checked) => onSubjectChange(checked)}
                        />
                        <ListItemText primary={"Use subject identifier from this step"} className="menuItemName"/>
                    </MenuItem>
                    <MenuItem value="attributes" className="menuItem">
                        <Checkbox
                            className="checkbox"
                            color="default"
                            checked={useAttributesFrom==step}
                            onChange={(event, checked) => onAttributesStepChange(checked)}
                        />
                        <ListItemText primary={"Use attributes from this step"} className="menuItemName"/>
                    </MenuItem>
                </div>
                <div className="authFactorsListContainer">
                    <div className="authFactorsHeader">Authenticators</div>
                    <div>Local</div>
                    <div className="innerFactorsContainer">
                        {authFactors.map((factor: any) => {
                            let disabled = (step=="1" && factor.displayName==="fido")
                            let checked = checkedList.indexOf(factor.displayName)!==-1 && !disabled
                            return(
                                disabled ? (<div></div>
                                ): (<div className="factorContainer" key={factor.id}>
                                    <button
                                        className={checked ? "factor selectedFactor": "factor unselectedFactor"}
                                        onClick={()=>onChange(factor.displayName)}
                                    >
                                        <div className={factor.type}>
                                            <AuthenticatorIcons type={factor.displayName+"1"} iconX={0} iconY={0} iconHeight={50} iconWidth={50}/>
                                        </div>
                                        {/*{(factor.displayName==="identifier-first"||factor.displayName==="active-sessions-limit-handler") && checkedList.indexOf(factor.displayName)!==-1 && <p className="warning">This is a handler. Make sure you add authenticators in other steps.</p>}*/}
                                    </button>
                                    <div className="factorName">
                                    {factor.displayName}
                                    </div>
                                </div>
                                )
                        )})}
                    </div>
                </div>

                <div className="buttonContainer">
                    <div>
                        <button
                            className="doneButton"
                            onClick={()=>onDone(checkedList)}
                            disabled={checkedList.length===0}
                        >
                            <TiTick/>
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
