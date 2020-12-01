import React, {useEffect, useState} from "react";
import {ControlledEditor} from "@monaco-editor/react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {saveAst} from "../store/actionCreators";
import {ParseToAst} from "../Mapper/Parser";
import {GenerateCodeFromAst} from "../Mapper/CodeGenerator";
import '../App.css';

const ScriptEditor: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    // let timeout: any = null;
    // const editorRef = useRef<any>();

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAst(ast)),
        [dispatch]
    )

    const [ast, changedFromVisualEditor] : any = useSelector(
        (state: AstState) => {
            return [state.ast, state.changedFromVisualEditor]
        },
        shallowEqual
    )
    const[code, setCode] = useState(GenerateCodeFromAst(ast));

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
        <>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '1rem'}}>
                <h3>Script Editor</h3>
            </div>
            <ControlledEditor
                height={'86vmin'}
                width={'65vmin'}
                value={code}
                onChange={(ev, value) => {handleChange(value)}}
                // editorDidMount={handleEditorDidMount}
                language="javascript"
                theme='dark'
            />
        </>
    );
}

export default ScriptEditor;