import {Handle, Position} from "react-flow-renderer";
import React from "react";

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
            <Handle
                type="source"
                position={Position.Top}
                id="failure"
                style={{ opacity : 0}}
            />
        </div>
    );
};