import React from "react";
import {ControlledEditor} from "@monaco-editor/react";
import '../styles/scriptEditor.css';

type props = {
    code: string|null|undefined,
    handleChange: Function
}

const ScriptEditor: React.FC<props> = ({code, handleChange}) => {

    return (
        <ControlledEditor
            className="monaco-editor"
            value={code}
            onChange={
                (ev, value) => {
                    handleChange(value);
                }
            }
            language="javascript"
            theme='vs-dark'
            options={
                {
                    selectOnLineNumbers: true,
                }
            }
        />
    );
}

export default ScriptEditor;