import React from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'

const style: React.CSSProperties = {
    border: '1px solid gray',
    padding: '0.5rem 0.5rem',
    marginInline: '1.5rem',
    marginTop: '0.5rem',
    cursor: 'move',
    float: 'left',
    color: 'rgba(255,255,255,0.8)'
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
