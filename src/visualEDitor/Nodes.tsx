import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {DroppableContainer} from "./DroppableContainer";
import {shallowEqual, useSelector} from "react-redux";
import "../styles/node.css";

const customNodeStyles = {
    background: 'rgba(0, 0, 0, 0.0)',
    border: '1px dashed rgba(255,255,255,0.8)',
    color: '#FFF',
    padding: 10,
    fontSize: '14px',
    width: '10vw',
    height: '10vw',
};

const condition: React.CSSProperties = {
    background: '#5b6889',
    color: '#FFF',
    padding: 10,
    width: 150,
    wordWrap: "normal"
};

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
        <DroppableContainer containerName={data.text} styles={customNodeStyles}>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>{data.label}</div>
            <div style={{display:'flex', flexDirection:'column', alignContent:'center'}}>
                {factors.map((factor: any) => (
                    <div className='Dropped-factor' key={factor}>{factor}</div>
                ))}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ background: '#555' }}
            />
        </DroppableContainer>
    );
};

// @ts-ignore
export const ConditionNode = ({data}) => {
    return (
        <div style={condition}>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#5b6889' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                {data.label}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="c"
                style={{ background: '#5b6889' }}
            />
        </div>
    );
};