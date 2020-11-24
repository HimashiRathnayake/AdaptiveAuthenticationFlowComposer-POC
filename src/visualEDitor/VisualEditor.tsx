import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {VisualFlow} from "./VisualFlow";
import {DraggableStep} from "./DraggableStep";

function VisualEditor() {

    return (
        <div>
            <p>Visual Editor</p>
            <DndProvider backend={HTML5Backend}>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    <VisualFlow/>
                </div>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    <DraggableStep name="Step1" />
                    <DraggableStep name="Step2" />
                    <DraggableStep name="Step3" />
                </div>
            </DndProvider>
        </div>
    );

}

export default VisualEditor;