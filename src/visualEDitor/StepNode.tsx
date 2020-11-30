import {Handle, Position} from "react-flow-renderer";
import React from "react";

const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
};

const condition: React.CSSProperties = {
    background: '#5b6889',
    color: '#FFF',
    padding: 10,
    width: 100,
    wordWrap: "normal"
};

// @ts-ignore
export const StepNode = ({data}) => {
    return (
        <div style={customNodeStyles}>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                {data.label}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ background: '#555' }}
            />
            {/*<Handle*/}
            {/*    type="source"*/}
            {/*    position={Position.Right}*/}
            {/*    id="b"*/}
            {/*    style={{ bottom: 10, top: 'auto', background: 'red' }}*/}
            {/*/>*/}
        </div>
    );
};

// @ts-ignore
export const ConditionNode = ({data}) => {
    return (
        <div style={condition}>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#5b6889' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div>
                {data.label}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="c"
                style={{ background: '#5b6889' }}
            />
            {/*<Handle*/}
            {/*    type="source"*/}
            {/*    position={Position.Top}*/}
            {/*    id="d"*/}
            {/*    style={{ background: '#5b6889' }}*/}
            {/*/>*/}
        </div>
    );
};