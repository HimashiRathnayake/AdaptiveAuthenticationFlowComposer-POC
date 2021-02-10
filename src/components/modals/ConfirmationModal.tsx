import React from 'react';
import "../../styles/modal.css"
import ReactModal from "react-modal";
import {IoMdCheckmarkCircleOutline} from "react-icons/all";

type Props={
    isOpen:boolean,
    onDone: Function,
    onCancel: Function
}

export const ConfirmationModal: React.FC<Props> = ({isOpen,onDone,onCancel}) => {

    return (
        <ReactModal
            isOpen={isOpen}
            className="confirm modal"
            overlayClassName="overlay"
            bodyOpenClassName="modalOpened"
        >
            <div>
                <div className="confirmHeader">
                    <IoMdCheckmarkCircleOutline className="iconCorrect"/>Update Successful
                </div>
                <div className="inner-container-top">
                    We will route you back to the console and you can continue from there.
                </div>
                <div className="buttonContainer">
                    <div>
                        <button
                            className="doneButton floatRight"
                            onClick={()=>onDone()}
                        >
                            Done
                        </button>
                        <button
                            className="cancelButton"
                            onClick={()=>onCancel()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}
