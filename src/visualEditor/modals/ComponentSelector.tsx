import React from 'react';
import ReactModal from 'react-modal';
import "../../styles/modal.css"
import {ActionCard} from "../../components/ActionCard";
import {ReactComponent as StepIcon} from "../../icons/step.svg";
import {ReactComponent as ConditionIcon} from "../../icons/condition.svg";

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
                         heading="Authentication Step"
                         subHeading="Add an authentication step by selecting authenticators"
                         onClick={()=>addStep()}
                     />
                     <ActionCard
                         icon={<ConditionIcon/>}
                         heading="Condition"
                         subHeading="Add a condition by selecting predefined conditions"
                         onClick={()=>addCondition()}
                     />
                 </div>
                 <div className="buttonContainer">
                     <button className="cancelButton floatRight" onClick={()=>onCancel()}>Cancel</button>
                 </div>
            </ReactModal>
    );
}
