import React from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {saveStep} from "../store/actionCreators";

export interface ContainerProps {
    greedy?: boolean
    styles?: React.CSSProperties
    containerName: string
    onDrop?: Function
    className?: string
}

export const DroppableContainer: React.FC<ContainerProps> = ({ greedy,children, styles, containerName,onDrop, className }) => {

    const dispatch: Dispatch<any> = useDispatch();

    const addFactorToStore = React.useCallback(
        (step: any, factor:any) => dispatch(saveStep(step, factor)),
        [dispatch]
    )

    const [, drop] = useDrop({
        accept: 'box',
        drop(item: any, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop && !greedy) {
                return
            }
            if (containerName==='Flow' && onDrop!==undefined) {
                onDrop(item);
            }
            else{
                addFactorToStore(containerName, item.name);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    })

    return (
        <div className={className} ref={drop} style={styles}>
            <div>{children}</div>
        </div>
    )
}