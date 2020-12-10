import {Handle, Position} from "react-flow-renderer";
import React from "react";
import "../styles/node.css";
import {BsPlusCircle} from "react-icons/all";

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
            <Handle
                type="target"
                position={Position.Top}
                style={{opacity: 0}}
                id='f'
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
