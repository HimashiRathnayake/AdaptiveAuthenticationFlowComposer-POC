import React, {ReactElement} from 'react';
import "../styles/modal.css"
import ReactModal from "react-modal";
import {IoMdCheckmarkCircleOutline} from "react-icons/all";

type Props={
    header: ReactElement,
    content: ReactElement,
    isOpen:boolean,
    onDone?: Function,
    onCancel?: Function,
    onConfirm?: Function,
}

export const AlertModal: React.FC<Props> = ({
                                                header,
                                                content,
                                                isOpen,
                                                onDone,
                                                onCancel,
                                                onConfirm
}) => {

    return (
        <ReactModal
            isOpen={isOpen}
            className="confirm modal"
            overlayClassName="overlay"
            bodyOpenClassName="modalOpened"
        >
            <div>
                <div className="confirmHeader">
                    {header}
                </div>
                <div className="inner-container-top">
                    {content}
                </div>
                <div className="buttonContainer">
                    <div>
                        {onConfirm &&
                            <button
                                className="doneButton floatRight"
                                onClick={()=>onConfirm()}
                            >
                                Confirm
                            </button>
                        }
                        {onDone &&
                            <button
                                className="doneButton floatRight"
                                onClick={()=>onDone()}
                            >
                                Done
                            </button>
                        }
                        {onCancel &&
                            <button
                                className="cancelButton"
                                onClick={()=>onCancel()}
                            >
                                Cancel
                            </button>
                        }
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}
