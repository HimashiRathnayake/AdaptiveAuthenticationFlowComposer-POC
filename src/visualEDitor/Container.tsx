import React from "react";
import {useDrop} from "react-dnd";
import {VisualFlowGenerator} from "../Mapper/VisualFlowGenerator";
import {DroppedStep} from "./DroppedStep";

const style: React.CSSProperties = {
    height: 50,
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    marginLeft: '2px',
    backgroundColor: 'white',
    margin: '0.5rem',
    alignSelf: 'center'
    // flexDirection: "row"
}

type Props = {
    steps: any[]
}

export const Container: React.FC<Props> = ({steps}) => {

    // const [{ canDrop, isOver }, drop] = useDrop({
    //     accept: 'box',
    //     drop: () => ({ name: 'Container' }),
    //     collect: (monitor) => ({
    //         isOver: monitor.isOver(),
    //         canDrop: monitor.canDrop(),
    //     }),
    // })

     return (
        <div
            // ref={drop}
            style={{ ...style }}
        >
            {steps!==undefined && steps.map((step: any) => (
                <div
                    key={0}
                    style={{color: "black", backgroundColor: 'lightgrey'}}
                >Step {step}</div>
            ))}
        </div>
    )
}