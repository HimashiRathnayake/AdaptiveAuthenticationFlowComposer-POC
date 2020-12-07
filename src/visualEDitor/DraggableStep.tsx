import React from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import "../styles/draggableStep.css";
import {AiOutlineShareAlt, FiClock} from "react-icons/all";
// import {FiClock} from "react-icons/fi";

interface BoxProps {
    name: string,
    type: string,
}

export const DraggableStep: React.FC<BoxProps> = ({ name, type }) => {

    const [{ isDragging }, drag] = useDrag({
        item: { name, type: 'box' },
        end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.4 : 1

    return (
        <div ref={drag} className="draggableStep" style={{opacity}}>
            {type==='auth-factor' ? <FiClock className="icon"/> : <AiOutlineShareAlt className="icon"/>}
            <div>{name}</div>
        </div>
    )
}
