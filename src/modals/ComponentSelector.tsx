import React from 'react';
import ReactModal from 'react-modal';
import "../styles/modal.css"

type Props={
    isOpen: boolean,
    onCancel: Function,
    addStep: Function,
    addCondition: Function
}

export const ComponentSelector: React.FC<Props> = ({isOpen, onCancel, addStep, addCondition}) => {

    return (
            <ReactModal
                isOpen={isOpen}
                contentLabel="onRequestClose Example"
                className="componentSelector modal"
                overlayClassName="overlay"
            >
                 <h1>Select Component</h1>
                 <button className="button" onClick={()=>addStep()}>Step</button>
                 <button className="button" onClick={()=>addCondition()}>Condition</button>
                 <button className="button" onClick={()=>onCancel()}>cancel</button>
            </ReactModal>
    );
}
