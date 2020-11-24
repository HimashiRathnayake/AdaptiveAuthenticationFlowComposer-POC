import React from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { Dispatch } from "redux"
import {AddStepToEnd} from "../Mapper/Parser";

const style: React.CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

interface BoxProps {
    name: string,
}

export const DraggableStep: React.FC<BoxProps> = ({ name }) => {

    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

    const [{ isDragging }, drag] = useDrag({
        item: { name, type: 'box' },
        end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                AddStepToEnd(item.name.replace('Step', ''), ast);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0.4 : 1

    return (
        <div ref={drag} style={{ ...style, opacity}}>
            {name}
        </div>
    )
}
