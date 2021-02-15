import React, {useEffect, useState, useRef} from "react";
import {ControlledEditor, monaco} from "@monaco-editor/react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {saveAst} from "../store/actions/actionCreators";
import {ParseToAst} from "../mapper/Parser";
import {GenerateCodeFromAst} from "../mapper/CodeGenerator";
import '../styles/scriptEditor.css';

const ScriptEditor: React.FC = () => {

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
    const [monacoRef, setMonaco] = useState<any>(null);
    const editorRef: any = useRef(null);

    monaco.init().then(monaco=>{
        setMonaco(monaco);
    });

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
                <ControlledEditor
                    className="monaco-editor"
                    value={code}
                    onChange={
                        (ev, value) => {
                            handleChange(value);
                            // console.log(editorRef.getModel()?.findMatches('executeStep', true, true, true, null, true));
                        }
                    }
                    editorDidMount={
                        (getEditorValue, editor) => {
                            editorRef.current = editor;
                            // editor.deltaDecorations(
                            //     [],
                            //     [
                            //         {
                            //             range: new monacoRef.Range(2, 1, 2, 1),
                            //             options: {
                            //                 glyphMarginClassName: "warningIcon",
                            //                 glyphMarginHoverMessage: {value: "Warning : Harmful operation"}
                            //             }
                            //         }
                            //     ]
                            // );
                        }
                    }
                    language="javascript"
                    theme='vs-dark'
                    options={
                        {
                            selectOnLineNumbers: true,
                            // glyphMargin: true
                        }
                    }
                />
            </div>
        </div>
    );
}

export default ScriptEditor;