import React from 'react';
import ReactModal from 'react-modal';
import "../styles/modal.css"
import {BiPlusMedical, FaPlus, GoPlus} from "react-icons/all";

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
                bodyOpenClassName="modalOpened"
            >
                 <div className="headerContainer">
                    Select Component
                     <div className="headerHeading">Select a component to configure the authentication flow.</div>
                 </div>
                 <div className = "verticalButtonContainer">
                     <button className="button" onClick={()=>addStep()}><BiPlusMedical className="addIcon"/><div className="buttonText">New Authentication Step</div></button>
                     <button className="button" onClick={()=>addCondition()}><BiPlusMedical className="addIcon"/><div className="buttonText">New Condition</div></button>
                     <button className="cancelButton" onClick={()=>onCancel()}>Cancel</button>
                 </div>
            </ReactModal>
    );
}
