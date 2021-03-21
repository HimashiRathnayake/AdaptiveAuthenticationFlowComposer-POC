import React, {useState} from 'react';
import "../styles/template.css";
import {BsGearFill, FiDatabase, FiLogIn, HiUsers, IoInformationCircleSharp} from "react-icons/all";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {
    saveAstFromVisualEditor,
    saveStep,
    setUseAttributesFromStep,
    setUseSubjectFromStep
} from "../store/actions/actionCreators";
import templates from "../api/Templates.json";
import {ParseToAst} from "../mapper/Parser";
import {TemplateInfoModal} from "../visualEditor/modals/TemplateInfoModal";

interface BoxProps {
    templateObject: any
}

export const Template: React.FC<BoxProps> = ({ templateObject }) => {

    const [displayTemplateInfo, setDisplayTemplateInfo] = useState<boolean>(false);
    const dispatch: Dispatch<any> = useDispatch();

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAstFromVisualEditor(ast)),
        [dispatch]
    );

    const addFactorToStep = React.useCallback(
        (step: any, factors:any[]) => dispatch(saveStep(step, factors)),
        [dispatch]
    );

    const changeSubjectIdentifier = React.useCallback(
        (step: number) => dispatch(setUseSubjectFromStep(step)),
        [dispatch]
    );

    const changeAttributesFRom = React.useCallback(
        (step: number) => dispatch(setUseAttributesFromStep(step)),
        [dispatch]
    );

    const updateWithTemplate = (name:string) => {
        let template : any;
        template = templates.find(template=> {
            return template.name === name
        });
        changeSubjectIdentifier(1);
        changeAttributesFRom(1);
        saveAstToStore(ParseToAst(template.code.join('\n')));
        for(let step in template.defaultAuthenticators){
            if(template.defaultAuthenticators.hasOwnProperty(step)) {
                let authenticatorObject = template.defaultAuthenticators[step];
                addFactorToStep(step, authenticatorObject.federated.concat(authenticatorObject.local));
            }
        }
    }

    const hideTemplateInfo = () => {
        setDisplayTemplateInfo(false);
    }

    return (
        <div className="template">
            <div className="template-container" onClick={()=>updateWithTemplate(templateObject.name)}>
                {templateObject.name==="Role-Based" ? <HiUsers/> : templateObject.name==="User Store-Based" ?  <FiDatabase/> : templateObject.name==="Basic Login" ? <FiLogIn/>: <BsGearFill/>}
                <div className="template-text">{templateObject.name}</div>
            </div>
            {/*<div className="template-icon-container" onClick={()=>setDisplayTemplateInfo(true)}>*/}
            {/*    <IoInformationCircleSharp className="infoIcon"/>*/}
            {/*</div>*/}
            {/*<TemplateInfoModal isOpen={displayTemplateInfo} onCancel={()=>hideTemplateInfo()} template={templateObject}/>*/}
        </div>
    )
}
