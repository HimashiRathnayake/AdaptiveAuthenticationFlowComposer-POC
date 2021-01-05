import React, {useState} from 'react';
import "../styles/modal.css"
import {Radio, RadioGroup, FormControlLabel, FormControl} from "@material-ui/core";
import {TiTick} from "react-icons/all";
import ReactModal from "react-modal";

type Props={
    onDoneCondition: Function,
    onBack: Function
}

export const ConditionList: React.FC<Props> = ({onDoneCondition, onBack}) => {

    const [checkedCondition, setCheckedCondition] = useState("hasRole");
    const [customConditionName, setCustomConditionName] = useState("");
    const [selectedRoles, setSelectedRoles] :[any, any] = useState([]);
    const roles = ["admin", "manager"];
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 100,
                width: 100,
            },
        },
    };

    const handleChange = (event:any) => {
        console.log(event.target);
        const { options } = event.target;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setSelectedRoles(value);
    }

    return (
        <ReactModal
            isOpen={true}
            className="conditionList modal"
            overlayClassName="overlay"
        >
                <h2>Select Conditions</h2>
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
                            {/*{checkedCondition==="hasRole" &&*/}
                            {/*    <FormControl >*/}
                            {/*        <Select*/}
                            {/*            multiple*/}
                            {/*            value={selectedRoles}*/}
                            {/*            onChange={(event)=>handleChange(event)}*/}
                            {/*            input={<Input id="select-multiple-chip" />}*/}
                            {/*            renderValue={(selected:any) => (*/}
                            {/*                <div>*/}
                            {/*                    {selected.map((value:any) => (*/}
                            {/*                        <Chip key={value} label={value} />*/}
                            {/*                    ))}*/}
                            {/*                </div>*/}
                            {/*            )}*/}
                            {/*            MenuProps={MenuProps}*/}
                            {/*        >*/}
                            {/*            {roles.map((role) => (*/}
                            {/*                <MenuItem key={role} value={role}>*/}
                            {/*                    {role}*/}
                            {/*                </MenuItem>*/}
                            {/*            ))}*/}
                            {/*        </Select>*/}
                            {/*    </FormControl>*/}
                            {/*}*/}
                        </div>
                        <div className="conditionContainer">
                            <FormControlLabel value="isExceedInvalidAttempts" control={<Radio />} label="Is Exceed Invalid Attempts" />
                            <p className="conditionDescription">Checking if the user exceeds given number of failed login attempts</p>
                            {/*{checkedCondition==="hasRole" && <input value={"admin"}/>}*/}
                        </div>
                        <div className="conditionContainer">
                            <FormControlLabel value="custom" control={<Radio />} label="Custom condition" />
                            <p className="conditionDescription">You can define a custom condition using this</p>
                            {checkedCondition==="custom" && <input className="conditionInput" placeholder={"Condition name"} onChange={(event)=>setCustomConditionName(event.target.value)}/>}
                        </div>
                    </RadioGroup>
                </FormControl>
                <div>
                    <button
                        className="button-2"
                        disabled={checkedCondition==="custom" && customConditionName===""}
                        onClick={()=>{
                        if(checkedCondition==="custom"){
                            onDoneCondition(customConditionName)
                        }else{
                            onDoneCondition(checkedCondition)
                        }
                    }}>
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
        </ReactModal>
    );
}
