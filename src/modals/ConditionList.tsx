import React, {useState} from 'react';
import "../styles/modal.css"
import {Radio, RadioGroup, FormControlLabel, FormControl} from "@material-ui/core";
import ReactModal from "react-modal";
import Select from "react-select";

type Props={
    isOpen: boolean,
    onDoneCondition: Function,
    onBack: Function
}

const roles = [
    {value: "admin", label:"admin"},
    {value: "manager", label:"manager"},
    {value: "accountant", label:"accountant"},
    {value: "everyone", label:"everyone"}
];

export const ConditionList: React.FC<Props> = ({isOpen, onDoneCondition, onBack}) => {

    const [checkedCondition, setCheckedCondition] = useState("hasRole");
    const [customConditionName, setCustomConditionName] = useState("");
    const [selectedRoles, setSelectedRoles] :[any, any] = useState([roles[0], roles[1]]);
    const [minLoginAttempts, setMinLoginAttempts] :[any,any] = useState(3);

    return (
        <ReactModal
            isOpen={isOpen}
            className="conditionList modal"
            overlayClassName="overlay"
            bodyOpenClassName="modalOpened"
        >
                <div className="headerContainer">
                    Select Conditions
                    <div className="headerHeading">Select a condition to configure the authentication flow.</div>
                </div>
                <div className="conditionContentContainer">
                    <FormControl component="fieldset">
                        <RadioGroup
                            className="conditionGroup"
                            aria-label="conditions"
                            name="conditions1"
                            value={checkedCondition}
                            onChange={(event, value)=>setCheckedCondition(value)}
                        >
                            <div className="conditionContainer">
                                <FormControlLabel value="hasRole" control={<Radio />} label="Has Role" />
                                <p className="conditionDescription">Checking if the user is assigned to one of the given roles</p>
                                {checkedCondition==="hasRole" &&
                                <Select
                                    options={roles}
                                    isMulti
                                    onChange={(options)=>
                                        setSelectedRoles(options)}
                                    value={selectedRoles}
                                    className="selector"
                                />
                                }
                            </div>

                            <div className="conditionContainer">
                                <div>
                                    <FormControlLabel value="isExceedInvalidAttempts" control={<Radio />} label="Is Exceed Invalid Attempts" />
                                    {checkedCondition==="isExceedInvalidAttempts" &&
                                        <input className="textInputLoginAttemptsNo" value={minLoginAttempts} onChange={(event)=>setMinLoginAttempts(event.target.value)}/>
                                    }
                                </div>
                                <p className="conditionDescription">Checking if the user exceeds given number of failed login attempts</p>
                            </div>

                            <div className="conditionContainer">
                                <FormControlLabel value="custom" control={<Radio />} label="Custom condition" />
                                <p className="conditionDescription">You can define a custom condition using this</p>
                                {checkedCondition==="custom" && <input className="conditionInput" placeholder={"Condition name"} onChange={(event)=>setCustomConditionName(event.target.value)}/>}
                            </div>

                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="buttonContainer">
                    <button
                        className="doneButton floatRight"
                        disabled={checkedCondition==="custom" && customConditionName===""}
                        onClick={()=>{
                        if(checkedCondition==="custom"){
                            onDoneCondition(customConditionName);
                        }else if(checkedCondition==="hasRole"){
                            onDoneCondition(checkedCondition, selectedRoles);
                        }else if(checkedCondition==="isExceedInvalidAttempts") {
                            onDoneCondition(checkedCondition, minLoginAttempts);
                        }else {
                            onDoneCondition(checkedCondition);
                        }
                    }}>
                        Done
                    </button>
                    <button
                        className="cancelButton"
                        onClick={()=>onBack()}
                    >
                        Cancel
                    </button>
                </div>
        </ReactModal>
    );
}
