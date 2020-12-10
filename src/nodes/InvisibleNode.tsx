import {Handle, Position} from "react-flow-renderer";
import React from "react";

// @ts-ignore
export const InvisibleNode = () => {
    return (
        <div>
            <Handle
                type="target"
                position={Position.Top}
                style={{opacity: 0}}
                id='e'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
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
