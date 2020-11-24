import React from 'react'
import { useDrop } from 'react-dnd'
import {VisualFlowGenerator} from "../Mapper/VisualFlowGenerator";

const style: React.CSSProperties = {
    height: window.innerHeight*2/3,
    width: window.innerWidth/2,
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'right',
    marginLeft: '2px',
    // flexDirection: "row"
}

export const VisualFlow: React.FC = () => {

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'box',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    return (
        <div
            ref={drop}
            style={{ ...style }}
        >
            <VisualFlowGenerator/>
        </div>
    )
}
