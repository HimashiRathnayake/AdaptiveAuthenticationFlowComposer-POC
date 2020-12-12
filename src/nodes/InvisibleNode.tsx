import {Handle, Position} from "react-flow-renderer";
import React from "react";

// @ts-ignore
export const InvisibleNode = () => {
    return (
        <div className="invisible">
            <Handle
                type="target"
                position={Position.Top}
                style={{opacity: 0}}
                id='targetTop'
                onConnect={(params) => console.log('handle onConnect', params)}

            />
            <Handle
                type="target"
                position={Position.Left}
                style={{opacity: 0}}
                id='targetLeft'
                onConnect={(params) => console.log('handle onConnect', params)}

            />
            <Handle
                type="target"
                position={Position.Bottom}
                style={{opacity: 0}}
                id='targetBottom'
                onConnect={(params) => console.log('handle onConnect', params)}

            />
            <Handle
                type="source"
                position={Position.Right}
                style={{opacity: 0}}
                id= 'source1'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
        </div>
    );
};
