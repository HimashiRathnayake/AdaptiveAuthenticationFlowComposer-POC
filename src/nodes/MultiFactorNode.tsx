import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {Google} from "../svg/Google";

// @ts-ignore
export const MultiFactorNode = ({data}) => {
    return (
        <div>
            <Handle
                type="target"
                position={Position.Left}
                style={{ opacity : 0 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            {data.type === "Google" ? <Google options={[]}/> :
                <div>
                    {data.type}
                </div>
            }
            <Handle
                type="source"
                position={Position.Right}
                id="c"
                style={{ opacity : 0}}
            />
        </div>
    );
};