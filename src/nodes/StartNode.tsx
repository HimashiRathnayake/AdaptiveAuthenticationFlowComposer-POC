import {Handle, Position} from "react-flow-renderer";
import React from "react";
import "../styles/node.css";
import {RiCheckboxBlankLine} from "react-icons/all";

// @ts-ignore
export const StartNode = ({data}) => {
    return (
        <div className="start">
            <Handle
                type="target"
                position={Position.Left}
                style={{opacity: 0}}
                id='e'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="target"
                position={Position.Top}
                style={{opacity: 0}}
                id='f'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                <RiCheckboxBlankLine/>
            </div>
            <div className="bottom-text">Start</div>
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
