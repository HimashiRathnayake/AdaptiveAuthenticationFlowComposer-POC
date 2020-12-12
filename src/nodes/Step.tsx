import React, {useState} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {DroppableContainer} from "../visualEditor/DroppableContainer";
import {MdDelete} from "react-icons/all";
import {Handle, Position} from "react-flow-renderer";
import {Basic} from "../svg/Basic";
import {IdentifierFirst} from "../svg/IdentifierFirst";
import {Login} from "../svg/Login";
import authFactors from "../AuthFactors.json";

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
            {/*{factors.map((branch: any, index: number) => (*/}
                <Handle
                    // key={index}
                    type="source"
                    position={Position.Right}
                    id= {"branch"}
                />
            {/*))}*/}
            <Handle
                type="source"
                position={Position.Bottom}
                id="g"
                style={{ backgroundColor: "#8d4a4a"}}
            />
        </DroppableContainer>
    );
};