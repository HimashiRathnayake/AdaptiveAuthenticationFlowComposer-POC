import React from "react";
import {DroppedStep} from "../visualEDitor/DroppedStep";
import {GetStepsFromAst, GetRequest} from "./Parser";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";

export const VisualFlowGenerator: React.FC = () => {

    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch();

    const stepsArray = GetStepsFromAst(ast);

    if (GetRequest()){
        return (
        <div
            style={{
                border: "dotted",
                height: window.innerHeight*2/3,
                width: window.innerWidth/2 - 50,
                // margin: "1px",
                justifySelf: "center",
                display:"flex", flexDirection: "row",
                flexWrap: "wrap"
        }}>
            {stepsArray.map((stepArray: any) => (
                <DroppedStep
                    key={stepArray[0]}
                    step={stepArray[1]}
                    success={stepArray[2]}
                    failure={stepArray[3]}
                    // removeStep={remove}
                />
            ))}
        </div>
    )}else{
        return (<div></div>)
    }
}