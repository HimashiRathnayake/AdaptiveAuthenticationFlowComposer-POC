import React from 'react';
import ReactModal from 'react-modal';
import "../styles/modal.css"
import {GoPlus} from "react-icons/all";

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
                ariaHideApp={true}
            >
                 <div className="headerContainer">
                    Select Component
                 </div>
                 <div className = "verticalButtonContainer">
                     <button className="button" onClick={()=>addStep()}><GoPlus/><span className="buttonSpace"/> New Authentication Step</button>
                     <button className="button" onClick={()=>addCondition()}><GoPlus/><span className="buttonSpace"/> New Condition</button>
                     <button className="button" onClick={()=>onCancel()}>Cancel</button>
                 </div>
            </ReactModal>
    );
}
