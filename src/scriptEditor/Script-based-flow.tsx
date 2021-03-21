import React, {useEffect, useState, useRef} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {saveAst} from "../store/actions/actionCreators";
import {ParseToAst} from "../mapper/Parser";
import {GenerateCodeFromAst} from "../mapper/CodeGenerator";
import '../styles/scriptEditor.css';
import ScriptEditor from "./ScriptEditor";

const ScriptBasedFlow: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAst(ast)),
        [dispatch]
    )

    const [ast, changedFromVisualEditor] : any = useSelector(
        (state:any) => {
            return [state.astReducer.ast, state.astReducer.changedFromVisualEditor]
        },
        shallowEqual
    )

    const[code, setCode] = useState(GenerateCodeFromAst(ast));
    const editorRef: any = useRef(null);

    useEffect(()=>{
        if (changedFromVisualEditor) {
            setCode(GenerateCodeFromAst(ast));
        }
    }, [ast])

    const handleChange = (value: string|undefined) => {
        if (value===undefined){
            value='';
        }
        setCode(value);
        saveAstToStore(ParseToAst(value));
    }

    return (
        <div className="Script-editor">
            <div className="Script-editor-container">
                <div className="script-editor-header">
                    <h3>Script Editor</h3>
                </div>
                <ScriptEditor code={code} handleChange={handleChange}/>
            </div>
        </div>
    );
}

export default ScriptBasedFlow;