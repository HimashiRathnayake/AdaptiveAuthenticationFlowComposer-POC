import React from 'react';
import {ArrowHeadType, getEdgeCenter, getMarkerEnd, getSmoothStepPath, Position, EdgeText} from 'react-flow-renderer';

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
    let offset = data.offset, targetOffsetX = data.targetOffsetX, targetOffsetY=data.targetOffsetY, middleOffset=data.middleOffset;
    let borderRadius = 0;
    if (offset===undefined) offset=0;
    if (targetOffsetX===undefined) targetOffsetX=0;
    if (targetOffsetY===undefined) targetOffsetY=0;
    if (middleOffset===undefined) {middleOffset=0; borderRadius=20;}
    let center = getEdgeCenter({sourceX, sourceY, targetX, targetY});
    const edgePath = getSmoothStepPath({ sourceX, sourceY:sourceY+offset, sourcePosition, targetX:targetX+targetOffsetX, targetY:targetY+targetOffsetY, targetPosition, borderRadius: borderRadius, centerX:center[0]-Math.abs(offset), centerY:center[1]-middleOffset});
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

    return (
        <g>
            <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
            {/*<text>*/}
            {/*    <textPath href={`#${id}`} style={{fill:'#fff', fontSize:14, letterSpacing:2}} startOffset="10%" textAnchor="middle">*/}
                    <EdgeText
                        x={center[0]-center[2]}
                        y={center[1]-middleOffset/2}
                        label={data.text}
                        labelBgStyle={{fill:"#313234"}}
                        labelStyle={{fontSize: 14, fill:"#fff", letterSpacing:"1px"}}
                    />
            {/*    </textPath>*/}
            {/*</text>*/}
        </g>
    );
}