import React from 'react';
import "../styles/template.css";
import templates from "../api/Templates.json";
import {
    saveAstFromVisualEditor,
    saveStep,
    setUseAttributesFromStep,
    setUseSubjectFromStep
} from "../store/actionCreators";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {ParseToAst} from "../mapper/Parser";
import {BsGearFill, FiDatabase, FiLogIn, HiUsers} from "react-icons/all";

interface BoxProps {
    name: string,
}

export const Template: React.FC<BoxProps> = ({ name }) => {

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
        (step: string) => dispatch(setUseSubjectFromStep(step)),
        [dispatch]
    );

    const changeAttributesFRom = React.useCallback(
        (step: string) => dispatch(setUseAttributesFromStep(step)),
        [dispatch]
    );

    const updateWithTemplate = (name:string) => {
        let template : any = {}
        template = templates.find(template=> {
            return template.name === name
        });
        changeSubjectIdentifier("1");
        changeAttributesFRom("1");
        // @ts-ignore
        saveAstToStore(ParseToAst(template.code.join('\n')));
        for(let step in template.defaultAuthenticators){
            let authenticatorObject = template.defaultAuthenticators[step]
            addFactorToStep(step, authenticatorObject.federated.concat(authenticatorObject.local))
        }
    }

    return (
        <div className="template-container" onClick={()=>updateWithTemplate(name)}>
            {name==="Role-Based" ? <HiUsers/> : name==="User Store-Based" ?  <FiDatabase/> : name==="Basic Login" ? <FiLogIn/>: <BsGearFill/>}
            <div className="template-text">{name}</div>
        </div>
    )
}
