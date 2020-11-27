import React from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'

const style: React.CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 0.5rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

interface BoxProps {
    name: string,
}

export const DraggableStep: React.FC<BoxProps> = ({ name }) => {

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
        <div ref={drag} style={{ ...style, opacity}}>
            {name}
        </div>
    )
}
