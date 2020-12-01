import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {VisualFlowGenerator} from "./VisualFlowGenerator";

const style: React.CSSProperties = {
    paddingInline: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    alignSelf: 'center'
}

const VisualEditor = () => {

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1rem'}}>
                <h3>Visual Editor</h3>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div style={style}>
                    <VisualFlowGenerator/>
                </div>
            </DndProvider>
        </div>
    );

}

export default VisualEditor;