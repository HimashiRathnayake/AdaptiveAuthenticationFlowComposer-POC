import {Handle, Position} from "react-flow-renderer";
import React from "react";
import "../../styles/node.css";

// @ts-ignore
export const StartNode = () => {
    return (
        <div className="start">
            <Handle
                type="target"
                position={Position.Left}
                style={{opacity: 0}}
                id='e'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="target"
                position={Position.Top}
                style={{opacity: 0}}
                id='f'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <svg viewBox="0 0 300 140" width="120">
                <g>
                    <rect x="10" y="10" rx="60" ry="60" height="120" width="280" fill="none" stroke="#0A84AE" strokeWidth="6"/>
                    <circle cx="70" cy="70" r="38" stroke="#0A84AE" strokeWidth="6" fill="none" />
                    <text x="122" y="88" fill="#0A84AE" fontSize="42" fontWeight="750">START</text>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="-78px" y="52px" height="35"
                         viewBox="0 0 320 320" enableBackground="new 0 0 320.001 320.001;" xmlSpace="preserve">
                        <path fill="#0A84AE" d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
                                 c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
                                 c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"/>
                    </svg>
                </g>
            </svg>
            <Handle
                type="source"
                position={Position.Right}
                style={{opacity: 0}}
                id= 'f'
                onConnect={(params) => console.log('handle onConnect', params)}
            />
        </div>
    );
};
