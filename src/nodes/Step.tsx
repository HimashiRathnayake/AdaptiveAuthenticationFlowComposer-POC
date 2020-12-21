import React, {useState} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {DroppableContainer} from "../visualEditor/DroppableContainer";
import {MdDelete} from "react-icons/all";
import {Handle, Position} from "react-flow-renderer";
import {Basic} from "../authenticationFactors/Basic";
import {IdentifierFirst} from "../authenticationFactors/IdentifierFirst";
import {Login} from "../authenticationFactors/Login";
import authFactors from "../AuthFactors.json";
import {Tooltip} from "@material-ui/core";

// @ts-ignore
export const Step: React.FC = ({data}) => {
    let factors: any[] = [];
    const middle = 217;

    const steps : any = useSelector(
        (state:any) => {
            return state.stepReducer.steps
        },
        shallowEqual
    )

    let step = steps.filter((step:any)=>step.id==data.text);
    if (step.length>0){
        factors=step[0].options
    }

    return (
        <div className="stepContainer">
            <h4>Step {data.text}</h4>
            <DroppableContainer containerName={data.text} className="step">
                <div className="step-top-bar">
                    <button className="authenticators-button" onClick={data.showAuthenticatorsList}>Authenticators</button>
                    <button className="delete-button" onClick={data.onClick}><MdDelete/></button>
                </div>
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ opacity : 0 }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                />
                {(factors.indexOf("basic")!==-1)? (<Basic options={factors.filter((factor)=>factor!=="basic")}/>)
                :(factors.indexOf("identifier-first")!==-1)? (<IdentifierFirst options={factors.filter((factor)=>factor!=="identifier-first")}/>)
                :(<Login options={factors}/>)
                }
                <Handle
                    type="source"
                    position={Position.Right}
                    id= {"branch"}
                    style={{opacity:0}}
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="failure"
                    style={{ backgroundColor: "#8d4a4a", opacity:0}}
                />
                <Handle
                    id="failTarget"
                    type="target"
                    position={Position.Top}
                    style={{ opacity : 0 }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                />
            </DroppableContainer>
        </div>
    );
};