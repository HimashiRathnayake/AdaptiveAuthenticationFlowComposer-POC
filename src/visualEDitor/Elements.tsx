import React from "react";

export const Element = (id:string, step:string, x:number, y:number, onClick:Function) => {
    return ({
        id: id,
        data: {
            label: (<>Step {step}</>),
            text: step,
            onClick: onClick,
        },
        position: {x: x, y: y},
        type: 'special'
    });
}

export const Condition = (id:string, condition:string, x:number, y:number, args?:string[]) => {
    let next = '\n['+args+']';
    if(args===undefined || args.length===0){next=''}
    return ({
        id: id,
        data: {
            label: (<>{condition+next}</>),
        },
        position: {x: x, y: y},
        type: 'condition'
    });
}

export const Success = (x:number, y:number) => {
    return ({
        id: 'success',
        position: {x: x, y: y},
        type: 'success'
    });
}

export const Plus = (x:number, y:number) => {
    return ({
        id: 'plus',
        position: {x: x, y: y},
        type: 'plus'
    });
}

export const Edge = (id:string, source:string|null, target:string|null, label:string|undefined, color:string, handler?:string) => {
    return ({
        id: id,
        source: source,
        target: target,
        type: 'smoothstep',
        arrowHeadType: 'arrow',
        label: label,
        labelBgStyle: { fill: color, color: 'white'},
        sourceHandle: handler
    });
}