import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {VisualFlow} from "./VisualFlow";
import {DraggableStep} from "./DraggableStep";

const VisualEditor = () => {

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
                    <DraggableStep name="Step" />
                </div>
            </DndProvider>
        </div>
    );

}

export default VisualEditor;