import React, {useState} from "react";
import {ControlledEditor} from "@monaco-editor/react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {saveAst} from "../store/actionCreators";
import {GenerateCodeFromAst, ParseToAst} from "../Mapper/Parser";

const ScriptEditor: React.FC = () => {

    const [code, setCode] = useState(GenerateCodeFromAst());

    const dispatch: Dispatch<any> = useDispatch();

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

    console.log('ast',ast);

    function handleChange(value: string|undefined){
        if (value===undefined){
            value=''
        }
        saveAstToStore(ParseToAst(value));
    }

    return (
        <>
            <ControlledEditor
                height= {window.innerHeight}
                width={window.innerWidth/2}
                value={code}
                onChange={(ev, value) => {handleChange(value)}}
                language="javascript"
                theme='dark'
            />
        </>
    );
}

export default ScriptEditor;