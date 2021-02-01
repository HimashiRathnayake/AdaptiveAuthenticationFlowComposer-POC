import React, {useEffect, useState} from "react";
import {ControlledEditor} from "@monaco-editor/react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {saveAst} from "../store/actionCreators";
import {ParseToAst} from "../mapper/Parser";
import {GenerateCodeFromAst} from "../mapper/CodeGenerator";
import '../styles/scriptEditor.css';

const ScriptEditor: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    // let timeout: any = null;
    // const editorRef = useRef<any>();

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

    console.log(ast);

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

    // const createASt = () => {
    //     let newAst = ParseToAst(editorRef.current());
    //     saveAstToStore(ParseToAst(code));
    // }

    // const handleEditorDidMount = (value: any, editor: any) => {
    //     editorRef.current = value;
    //     editor.onKeyUp( ( e :any) => {
    //         clearTimeout(timeout);
    //         timeout = setTimeout(function () {
    //             createASt();
    //         }, 1000);
    //     } )
    // }

    return (
        <div className="Script-editor-container">
            <div className="script-editor-header">
                <h3>Script Editor</h3>
            </div>
            <ControlledEditor
                className="monaco-editor"
                value={code}
                onChange={(ev, value) => {handleChange(value)}}
                // editorDidMount={handleEditorDidMount}
                language="javascript"
                theme='vs-dark'
                options={
                    {
                        selectOnLineNumbers: true,
                    }
                }
            />
        </div>
    );
}

export default ScriptEditor;