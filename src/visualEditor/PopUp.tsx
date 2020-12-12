import React from 'react';
import "../styles/popup.css"

type Props={
    onCancel: Function,
    addStep: Function,
    addCondition: Function
}

export const Popup: React.FC<Props> = ({onCancel, addStep, addCondition}) => {
    return (
        <div className="popup">
            <div className="popupInner">
                <h1>Select Component</h1>
                <button className="button" onClick={()=>addStep()}>Step</button>
                <button className="button" onClick={()=>addCondition()}>Condition</button>
                <button className="button" onClick={()=>onCancel()}>cancel</button>
            </div>
        </div>
    );
}
