import React from "react";

export const Element = (step:string, x:number, y:number, onClick:Function, showAuthenticatorsList:Function) => {
    return ({
        id: step,
        data: {
            label: (<>Step {step}</>),
            text: step,
            onClick: onClick,
            showAuthenticatorsList: showAuthenticatorsList,
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

export const MultiFactor = (id:string, type:string, x:number, y:number) => {
    return ({
        id: id,
        data: {
            type: type
        },
        position: {x: x, y: y},
        type: 'multiFactor'
    });
}

export const Invisible = (id:string, x:number, y:number) => {
    return ({
        id: id,
        position: {x: x, y: y},
        type: 'invisible'
    });
}

export const Edge = (id:string, source:string|null, target:string|null, label:string|undefined, color:string, handler?:string, targetHandler?:string, offset?:number, targetOffsetX?:number, targetOffsetY?:number) => {
    return ({
        id: id,
        source: source,
        target: target,
        type: 'custom',
        arrowHeadType: 'arrow',
        sourceHandle: handler,
        targetHandle: targetHandler,
        styles: {},
        data: {
            text : label,
            labelBgStyle: { backgroundColor: color, color: 'white'},
            offset: offset,
            targetOffsetX: targetOffsetX,
            targetOffsetY: targetOffsetY
        },
    });
}