import React from "react";
import {DroppedStep} from "../visualEDitor/DroppedStep";
import {GetStepsFromAst, GetRequest} from "./Parser";

export const VisualFlowGenerator: React.FC = () => {

    const stepsArray = GetStepsFromAst();

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
                    success={stepArray[2]===-1 ? null: stepArray[2]}
                    failure={stepArray[3]===-1 ? null: stepArray[3]}
                    // removeStep={remove}
                />
            ))}
        </div>
    )}else{
        return (<div></div>)
    }
}