import React, {ReactElement} from 'react';
import "../styles/template.css";
import templates from "../api/Templates.json";
import {saveAstFromVisualEditor, saveStep} from "../store/actionCreators";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {ParseToAst} from "../mapper/Parser";
import {BsGearFill, FiDatabase, GrStorage, HiUsers} from "react-icons/all";

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

    const updateWithTemplate = (name:string) => {
        let template : any = {}
        template = templates.find(template=> {
            return template.name === name
        });
        // @ts-ignore
        saveAstToStore(ParseToAst(template.code.join('\n')));
        for(let step in template.defaultAuthenticators){
            let authenticatorObject = template.defaultAuthenticators[step]
            addFactorToStep(step, authenticatorObject.federated.concat(authenticatorObject.local))
        }
    }

    return (
        <div className="template-container" onClick={()=>updateWithTemplate(name)}>
            {name==="Role-Based" ? <HiUsers/> : name==="User Store-Based" ?  <FiDatabase/> : <BsGearFill/>}
            <div className="template-text">{name}</div>
        </div>
    )
}
