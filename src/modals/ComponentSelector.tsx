import React from 'react';
import ReactModal from 'react-modal';
import "../styles/modal.css"
import {ActionCard} from "../components/ActionCard";
import {ReactComponent as StepIcon} from "../icons/step.svg";
import {ReactComponent as ConditionIcon} from "../icons/condition.svg";

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
                    Select a component
                 </div>
                 <div className="buttonCardContainer">
                     <ActionCard
                         icon={<StepIcon/>}
                         heading="New Authentication Step"
                         subHeading="Create an authentication step by selecting the local/federated authenticators"
                         onClick={()=>addStep()}
                     />
                     <ActionCard
                         icon={<ConditionIcon/>}
                         heading="New Condition"
                         subHeading="Add a condition to flow by selecting a predefined condition or defining a customized condition"
                         onClick={()=>addCondition()}
                     />
                 </div>
                 <div className="buttonContainer">
                     <button className="cancelButton floatRight" onClick={()=>onCancel()}>Cancel</button>
                 </div>
            </ReactModal>
    );
}
