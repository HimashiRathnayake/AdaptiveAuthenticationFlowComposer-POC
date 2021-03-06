import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {BiCircle} from "react-icons/all";

// @ts-ignore
export const Connector = () => {
    return (
        <div className="connector">
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
            <div>
                <BiCircle/>
            </div>
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
