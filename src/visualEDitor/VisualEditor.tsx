import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {VisualFlow} from "./VisualFlow";
import {DraggableStep} from "./DraggableStep";

function VisualEditor() {

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1rem'}}>
                <h3>Visual Editor</h3>
                {/*<button*/}
                {/*    style={{marginLeft: '10rem'}}*/}
                {/*    onClick={onClicked}*/}
                {/*> + LoginRequest</button>*/}
            </div>
            <DndProvider backend={HTML5Backend}>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    <VisualFlow/>
                </div>
                <div style={{ overflow: 'hidden', clear: 'both', marginLeft: '1rem' }}>
                    <DraggableStep name="Step1" />
                    <DraggableStep name="Step2" />
                    <DraggableStep name="Step3" />
                    <DraggableStep name="Step4" />
                    <DraggableStep name="Step5" />
                    <DraggableStep name="Step6" />
                    <DraggableStep name="Step7" />
                    <DraggableStep name="Step8" />
                </div>
            </DndProvider>
        </div>
    );

}

export default VisualEditor;