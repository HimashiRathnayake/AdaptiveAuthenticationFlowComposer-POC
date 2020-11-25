import React, {useRef} from "react";
import {ControlledEditor} from "@monaco-editor/react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {saveAst} from "../store/actionCreators";
import {GenerateCodeFromAst, ParseToAst} from "../Mapper/Parser";

const ScriptEditor: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    let editorValue = '';
    let timeout: any = null;
    const editorRef = useRef<any>();

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAst(ast)),
        [dispatch]
    )

    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

    let code = GenerateCodeFromAst(ast);

    const handleChange = (value: string|undefined) => {
        if (value===undefined){
            value=''
        }
        editorValue=value;
    }

    const createASt = () => {
        let newAst = ParseToAst(editorRef.current());
        if (newAst !== '') {
            saveAstToStore(newAst);
        }
    }

    const handleEditorDidMount = (value: any, editor: any) => {
        editorRef.current = value;
        editor.onKeyUp( ( e :any) => {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                createASt();
            }, 2000);
        } )
    }

    return (
        <>
            <ControlledEditor
                height= {window.innerHeight}
                width={window.innerWidth/2}
                value={code}
                onChange={(ev, value) => {handleChange(value)}}
                editorDidMount={handleEditorDidMount}
                language="javascript"
                theme='dark'
            />
        </>
    );
}

export default ScriptEditor;