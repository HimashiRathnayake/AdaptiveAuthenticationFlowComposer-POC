import React from "react";
import {shallowEqual, useSelector} from "react-redux";
import {MdDelete, MdModeEdit} from "react-icons/all";
import {Handle, Position} from "react-flow-renderer";
import {Basic} from "../SVGs/Basic";
import {IdentifierFirst} from "../SVGs/IdentifierFirst";
import {Login} from "../SVGs/Login";
import {Tooltip} from "@material-ui/core";

// @ts-ignore
export const Step: React.FC = ({data}) => {
    let factors: any[] = [];

    const [steps, useSubjectFrom, useAttributesFrom] : [any[], string, string] = useSelector(
        (state:any) => {
            return [state.stepReducer.steps, state.stepReducer.useSubjectFrom, state.stepReducer.useAttributesFrom];
        },
        shallowEqual
    )

    let step = steps.filter((step:any)=>step.id==data.text);
    if (step.length>0){
        factors=step[0].options
    }

    return (
        <div className="stepContainer">
            <div className="stepHeader">
                <h4 className="stepHeaderText">Step {data.text}</h4>
                <div className="headerIconContainer">
                    {data.text==useSubjectFrom &&
                    <Tooltip title="Subject identifier is used from this step" aria-label="s">
                        <div className="stepHeaderIcon">
                            Subject
                        </div>
                    </Tooltip>
                    }
                    {data.text==useAttributesFrom &&
                    <Tooltip title="Attributes are used from this step" aria-label="a">
                        <div className="stepHeaderIcon">
                            Attributes
                        </div>
                    </Tooltip>
                    }
                </div>
            </div>
            <div className="step">
                <div className="step-top-bar">
                    <Tooltip title="Edit" aria-label="Edit">
                        <button className="step-button" onClick={data.showAuthenticatorsList}>
                            <MdModeEdit/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Remove" aria-label="Remove">
                        <button className="step-button" onClick={data.onClick}><MdDelete/></button>
                    </Tooltip>
                </div>
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ opacity : 0 }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                />
                {(factors.indexOf("basic")!==-1)? (<Basic options={factors.filter((factor)=>factor!=="basic")}/>)
                :(factors.indexOf("identifier-first")!==-1)? (<IdentifierFirst options={factors.filter((factor)=>factor!=="identifier-first")}/>)
                :(<Login options={factors}/>)
                }
                <Handle
                    type="source"
                    position={Position.Right}
                    id= {"branch"}
                    style={{opacity:0}}
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="failure"
                    style={{ backgroundColor: "#8d4a4a", opacity:0}}
                />
                <Handle
                    id="failTarget"
                    type="target"
                    position={Position.Top}
                    style={{ opacity : 0 }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                />
            </div>
        </div>
    );
};