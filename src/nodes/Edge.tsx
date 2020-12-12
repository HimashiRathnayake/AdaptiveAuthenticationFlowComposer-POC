import React from 'react';
import {ArrowHeadType, getMarkerEnd, getSmoothStepPath, Position} from 'react-flow-renderer';

type props ={
    id : string,
    sourceX : number,
    sourceY : number,
    targetX : number,
    targetY : number,
    sourcePosition : Position,
    targetPosition : Position,
    style : React.CSSProperties,
    data : any,
    arrowHeadType ?: ArrowHeadType,
    markerEndId : string,
    offset: number
}

export const CustomEdge : React.FC<props> = ({id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, arrowHeadType, markerEndId}) => {
    let offset = data.offset, targetOffsetX = data.targetOffsetX, targetOffsetY=data.targetOffsetY;
    if (offset===undefined) offset=0;
    if (targetOffsetX===undefined) targetOffsetX=0;
    if (targetOffsetY===undefined) targetOffsetY=0;
    const edgePath = getSmoothStepPath({ sourceX, sourceY:sourceY+offset, sourcePosition, targetX:targetX+targetOffsetX, targetY:targetY+targetOffsetY, targetPosition, borderRadius: 20, });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    return (
        <>
            <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
            <text style={{backgroundColor:"green"}}>
                <textPath href={`#${id}`} style={{fill:"white", fontSize:12}} startOffset="50%" textAnchor="middle">
                    {data.text}
                </textPath>
            </text>
        </>
    );
}