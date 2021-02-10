import React, {CSSProperties} from 'react';
import {ConnectionLineType, Position} from "react-flow-renderer/dist/types";

type props = {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    connectionLineStyle?: CSSProperties;
    connectionLineType: ConnectionLineType;
}

export const ConnectionLine : React.FC<props> = ({
                    sourceX,
                    sourceY,
                    targetX,
                    targetY,
                }) => {
    return (
        <g>
            <path
                fill="none"
                stroke="#fff"
                d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
            />
            <text>
                <textPath href={`#`} style={{fill:"green", fontSize:12}} startOffset="50%" textAnchor="middle">
                    text
                </textPath>
            </text>
        </g>
    );
}