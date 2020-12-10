import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {VisualFlowGenerator} from "./VisualFlowGenerator";
import "../styles/visualEditor.css";

const VisualEditor = () => {

    return (
        <div>
            <div className='Visual-editor-header'>
                <h3>Visual Editor</h3>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className="Visual-editor-body">
                    <VisualFlowGenerator/>
                </div>
            </DndProvider>
        </div>
    );

}

export default VisualEditor;