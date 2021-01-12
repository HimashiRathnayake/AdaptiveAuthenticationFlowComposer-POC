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
                <div>
                    <svg height="58" width="58" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" stroke="#0A84AE" strokeWidth="3" fill="none"/>
                        <g>
                            <circle cx="20" cy="20" r="3" stroke="#0A84AE" strokeWidth="3" fill="none"/>
                            <circle cx="30" cy="32" r="3" stroke="#0A84AE" strokeWidth="3" fill="none"/>
                            <line x1="20" y1="25" x2="20" y2="35" stroke="#0A84AE" strokeWidth="3"/>
                            <line x1="30" y1="16" x2="30" y2="27" stroke="#0A84AE" strokeWidth="3"/>
                            <line x1="25" y1="17" x2="30" y2="17" stroke="#0A84AE" strokeWidth="3"/>
                        </g>
                    </svg>
                </div>
                <div className="textContainer">
                    <div>{data.condition}</div>
                    <div>{data.args}</div>
                </div>
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