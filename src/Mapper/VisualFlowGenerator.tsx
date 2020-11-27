import React from "react";
import {DroppedStep} from "../visualEDitor/DroppedStep";
import {GetStepsFromAst, GetRequest} from "./Parser";
import {shallowEqual, useSelector} from "react-redux";

export const VisualFlowGenerator: React.FC = () => {

    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

    const stepsArray = GetStepsFromAst(ast);

    if (GetRequest()){
        return (
        <div
            style={{
                border: '1px solid rgba(0,0,0,0.2)',
                height: window.innerHeight*2/3,
                width: window.innerWidth/2,
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