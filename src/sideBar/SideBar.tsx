import React, {useEffect, useState} from "react";
import '../styles/sidebar.css';
import {Template} from "./Template";
import {AiOutlineCopyrightCircle} from "react-icons/all";
import templates from "../api/Templates.json";
// import {getTemplates} from "../api/application";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {
    saveAstFromVisualEditor,
    saveStep,
    setUseAttributesFromStep,
    setUseSubjectFromStep
} from "../store/actions/actionCreators";
import {ParseToAst} from "../mapper/Parser";

export const SideBar: React.FC = () => {

    // const [templates, setTemplates] = useState<any[]>([]);
    //
    // useEffect(() => {
    //     getTemplates()
    //         .then((response) => {
    //             let scriptTemplates = JSON.parse(response?.data?.templatesJSON);
    //             setTemplates(scriptTemplates?.user_based?.templates);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

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
            let authenticatorObject = template.defaultAuthenticators[step]
            addFactorToStep(step, authenticatorObject.federated.concat(authenticatorObject.local))
        }
    }

    return (
        <>
            <div className="sidebar">
                <h3 className="sidebar-header">
                    Templates
                </h3>
                <div className="sidebar-options">
                    {templates.map((template: any) => (
                        <Template
                            key={template.name}
                            name={template.name}
                            updateWithTemplate={updateWithTemplate}
                        />
                    ))}
                </div>
                <div className="sidebar-bottom">
                    <AiOutlineCopyrightCircle className="copyright-icon"/>
                    2021 WSO2
                </div>
            </div>
        </>
    );
}
