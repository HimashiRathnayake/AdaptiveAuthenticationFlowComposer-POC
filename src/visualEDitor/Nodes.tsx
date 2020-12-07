import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {DroppableContainer} from "./DroppableContainer";
import {shallowEqual, useSelector} from "react-redux";
import "../styles/node.css";
import svgMap from "../svg";
import {AiOutlineCheckCircle, BsPlusCircle, FiMoreVertical, MdDelete} from "react-icons/all";

// @ts-ignore
export const Nodes: React.FC = ({data}) => {
    let factors: any[] = [];
    const steps : any = useSelector(
        (state:any) => {
            return state.stepReducer.steps
        },
        shallowEqual
    )

    let step = steps.filter((step:any)=>step.id===data.text);
    if (step.length>0){
        factors=step[0].options
    }

    return (
        <DroppableContainer containerName={data.text} className="step">
            <button className="delete-button" onClick={data.onClick}><MdDelete/></button>
            <Handle
                type="target"
                position={Position.Left}
                style={{ opacity : 0 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/*<div>{data.label}</div>*/}
            <div style={{display:'flex', flexDirection:'column', alignContent:'center'}}>
                {factors.map((factor: any) => (
                    <div className='factor-container' key={factor}>
                        {svgMap.get(factor) || <div className='Dropped-factor'>{factor}</div>}
                    </div>
                ))}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ color: "red"}}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="g"
                style={{ backgroundColor: "#8d4a4a"}}
            />
        </DroppableContainer>
    );
};

// @ts-ignore
export const ConditionNode = ({data}) => {
    return (
        <div className="condition">
            <Handle
                type="target"
                position={Position.Left}
                style={{ opacity : 0 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                {data.label}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="c"
                style={{ opacity : 0}}
            />
        </div>
    );
};

// @ts-ignore
export const SuccessNode = ({data}) => {
    return (
        <div className="success">
            <Handle
                type="target"
                position={Position.Left}
                style={{opacity: 0}}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                <AiOutlineCheckCircle/>
            </div>
        </div>
    );
};

// @ts-ignore
export const PlusNode = ({data}) => {
    return (
        <div className="plus">
            <Handle
                type="target"
                position={Position.Left}
                style={{opacity: 0}}
                id='e'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                <BsPlusCircle/>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{opacity: 0}}
                id= 'f'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
        </div>
    );
};
