import React from "react";
import {Handle, Position} from "react-flow-renderer";
import {AiOutlineCheckCircle} from "react-icons/all";

// @ts-ignore
export const SuccessNode = ({data}) => {
    return (
        <div className="success">
            <Handle
                type="target"
                position={Position.Left}
                style={{top:40, opacity:0}}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="target"
                position={Position.Top}
                style={{top:40, opacity:0}}
                onConnect={(params) => console.log('handle onConnect', params)}
                id="failTarget"
            />
            <div>
                <AiOutlineCheckCircle/>
            </div>
            <div className="bottom-text">Done</div>
        </div>
    );
};