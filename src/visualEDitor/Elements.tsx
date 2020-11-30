import React from "react";

export const Element = (id:string, step:string, x:number, y:number) => {
    return ({
        id: id,
        data: {
            label: (<>Step {step}</>),
        },
        position: {x: x, y: y},
        type: 'special'
    });
}

export const Condition = (id:string, condition:string, x:number, y:number) => {
    return ({
        id: id,
        data: {
            label: (<>{condition}</>),
        },
        position: {x: x, y: y},
        type: 'condition'
    });
}

export const Edge = (id:string, source:string|null, target:string|null, label:string|undefined, color:string, handler?:string) => {
    return ({
        id: id,
        source: source,
        target: target,
        type: 'smoothstep',
        label: label,
        labelStyle: {fill: color},
        sourceHandle: handler
    });
}