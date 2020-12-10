import React, {useEffect, useState} from 'react';
import "../styles/popup.css"
import authFactors from "../AuthFactors.json";
import {Checkbox, ListItemText, MenuItem} from "@material-ui/core";
import {TiTick} from "react-icons/all";
import {shallowEqual, useSelector} from "react-redux";

type Props={
    onDone: Function,
    step: string
}

export const AuthFactorList: React.FC<Props> = ({onDone, step}) => {

    let factors: any[] = [];

    const steps : any = useSelector(
        (state:any) => {
            return state.stepReducer.steps
        },
        shallowEqual
    )

    let authFactorsOfStep = steps.filter((element:any)=>element.id==step);
    if (authFactorsOfStep.length>0){
        factors=authFactorsOfStep[0].options
    }

    const [checkedList, setCheckedList] : [any, any] = useState(factors);
    const basic = (factors.indexOf("basic")!==-1);

    const onChange = (checked?:boolean, name?:string) => {
        if(checked){
            setCheckedList((checkedList:any[])=>[...checkedList, name]);
        }else{
            setCheckedList((checkedList:any[])=>[...checkedList.slice(0, checkedList.indexOf(name)), ...checkedList.slice(checkedList.indexOf(name) + 1)]);
        }
    }

    useEffect(()=>{

    }, [checkedList]);

    return (
        <div className="authFactorList">
            <div className="popupInner">
                <h2>Select Authentication Factors</h2>
                {authFactors.map((factor: any) => {
                    let disabled = (step=="1" && factor.displayName==="fido") || (checkedList.indexOf("basic")!==-1 && factor.type!=="federated" && factor.displayName!=="basic")
                    let checked = checkedList.indexOf(factor.displayName)!==-1 && !disabled
                    return(
                    <MenuItem key={factor.id} value={factor.displayName} className="menuItem">
                        <Checkbox
                            className="checkbox"
                            disabled ={disabled}
                            checked={checked}
                            onChange={(event, checked) => onChange(checked, factor.displayName)}
                        />
                        <ListItemText primary={factor.displayName} />
                    </MenuItem>
                )})}
                <button
                    className="button"
                    onClick={()=>onDone(checkedList)}
                    disabled={checkedList.length===0}
                >
                    <TiTick/>
                    Done
                </button>
            </div>
        </div>
    );
}
