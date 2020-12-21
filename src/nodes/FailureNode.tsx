import {Handle, Position} from "react-flow-renderer";
import React from "react";

// @ts-ignore
export const FailureNode = () => {
    return (
        <div className="failure">
            <Handle
                type="target"
                position={Position.Top}
                style={{ opacity : 0 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                failure
            </div>
            <Handle
                type="target"
                position={Position.Bottom}
                style={{ opacity : 0 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
        </div>
    );
};