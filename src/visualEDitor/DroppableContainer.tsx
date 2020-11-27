import React from 'react'
import { useDrop } from 'react-dnd'
import {AddStepToEnd, AddSuccessFailureSteps} from "../Mapper/Parser";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {saveAstFromVisualEditor} from "../store/actionCreators";

export interface ContainerProps {
    greedy?: boolean
    styles?: React.CSSProperties
    containerName: string
}

export const DroppableContainer: React.FC<ContainerProps> = ({ greedy, children, styles, containerName }) => {

    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch();

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAstFromVisualEditor(ast)),
        [dispatch]
    )

    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: 'box',
        drop(item: any, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop && !greedy) {
                return
            }
            if (containerName==='Flow') {
                const newAst = AddStepToEnd(ast);
                saveAstToStore({});
                saveAstToStore(newAst);
            }else if (containerName.split(' ')[1]==='onSuccess'){
                const newAst = AddSuccessFailureSteps(containerName.split(' ')[0], ast, "success");
                saveAstToStore({});
                saveAstToStore(newAst);
            }else if (containerName.split(' ')[1]==='onFailure'){
                const newAst = AddSuccessFailureSteps(containerName.split(' ')[0], ast, "fail");
                saveAstToStore({});
                saveAstToStore(newAst);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    })

    return (
        <div ref={drop} style={styles}>
            <div>{children}</div>
        </div>
    )
}