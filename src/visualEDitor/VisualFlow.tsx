import React from 'react'
import { useDrop } from 'react-dnd'
import {VisualFlowGenerator} from "../Mapper/VisualFlowGenerator";
import {DroppableContainer} from "./DroppableContainer";

const style: React.CSSProperties = {
    height: window.innerHeight*2/3,
    width: window.innerWidth/2,
    paddingInline: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    alignSelf: 'center',
    backgroundColor: "white",
    minHeight: '8rem',
    minWidth: '8rem',
    paddingBottom: '1rem',
}

export const VisualFlow: React.FC = () => {

    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: 'box',
        drop: (item, monitor) => ({ name: 'Flow' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({shallow: true}),
        }),
    })

    return (
        // <div
        //     ref={drop}
        //     style={{ ...style }}
        // >
        <DroppableContainer styles={style} containerName={'Flow'}>
            <VisualFlowGenerator/>
        </DroppableContainer>

        // </div>
    )
}
