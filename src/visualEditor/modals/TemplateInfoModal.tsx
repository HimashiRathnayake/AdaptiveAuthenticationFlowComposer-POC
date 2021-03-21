import React, {useEffect, useState} from 'react';
import "../../styles/modal.css"
import {Checkbox, ListItemText, MenuItem} from "@material-ui/core";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setUseAttributesFromStep, setUseSubjectFromStep} from "../../store/actions/actionCreators";
import {Dispatch} from "redux";
import ReactModal from "react-modal";
import {Hint} from "../../components/Hint";
import {getAuthenticators} from "../../api/application";
import {Authenticator} from "../components/Authenticator";
import {AlertModal} from "../../components/AlertModal";

type Props={
    isOpen:boolean,
    onCancel: Function,
    template: any
}

export const TemplateInfoModal: React.FC<Props> = ({isOpen, onCancel, template}) => {

    return (
        <ReactModal
            isOpen={isOpen}
            className="authFactorList modal"
            overlayClassName="overlay"
            bodyOpenClassName="modalOpened"
        >
            <div className="authFactorsContainer">
                <div className="headerContainer">
                    {template.title}
                </div>
                <div className="summary">{template.summary}</div>

                <div className="authFactorsHeader">Prerequisites</div>
                <div className="authFactorsType">Local</div>
                <div className="innerFactorsContainer">

                </div>

                <div className="buttonContainer">
                    <div>
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
