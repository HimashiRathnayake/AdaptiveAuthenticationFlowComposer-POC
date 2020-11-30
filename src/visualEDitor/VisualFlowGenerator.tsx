import React, {useEffect, useState} from "react";
import {AddStepToEnd, AddSuccessFailureSteps, GetRequest, GetStepsFromAst} from "../Mapper/Parser";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import ReactFlow, {Background, Controls} from "react-flow-renderer";
import {ConditionNode, StepNode} from "./StepNode";
import {Condition, Edge, Element} from "./Elements";
import {useDrop} from "react-dnd";
import {Popup} from "./PopUp";
import {Dispatch} from "redux";
import {saveAstFromVisualEditor} from "../store/actionCreators";

let uniqueStepList: any[] = []; //Array to keep a unique step list
let conditionList: any[] = [];
let lastStep: any = '';
let x = 10; let y = 200;
let lastStepX = 10; let lastStepY = 200;
let lastSuccessStep:any = null, lastFailureStep:any = null;

export const VisualFlowGenerator: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [elementsList, setElements] : [any, any] = useState([]);
    const [params, setParams] : [any,any] = useState({});

    const ast: any = useSelector((state: AstState) => {
            return state.ast
        },
        shallowEqual
    )
    const dispatch: Dispatch<any> = useDispatch();

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAstFromVisualEditor(ast)),
        [dispatch]
    )

    let stepsArray = GetStepsFromAst(ast);

    const createEdge = (source:string|null, target:string|null, color:string, label?:string, type?:string) => {
        setElements((elements:any[])=>[...elements, Edge(`${source}${target}`, source, target, label, color)]);
        // elements.push(Edge(`${source}${target}`, source, target, label, color));
    }

    const createElement = (step:string, x:number, y:number, condition?:boolean) => {
        if(condition){
            setElements((elements:any[])=>[...elements, Condition(step, step, x, y)])
            // elements.push(Condition(step, step, x, y));
            conditionList.push(step);
        }else{
            setElements((elements:any[])=>[...elements, Element(step, step, x, y)])
            // elements.push(Element(step, step, x, y));
            uniqueStepList.push(step);
        }
    }

    const onConnect = (params:any) => {
        setVisible(true);
        setParams(params);
    }

    const onCancel = () =>{
        setVisible(false);
    }

    const onSuccess = () => {
        setVisible(false);
        let newAst = AddSuccessFailureSteps(params.source, ast, 'success');
        saveAstToStore({});
        saveAstToStore(newAst);
    }

    const onFailure = () => {
        setVisible(false);
        let newAst = AddSuccessFailureSteps(params.source, ast, 'fail');
        saveAstToStore({});
        saveAstToStore(newAst);
    }

    useEffect(()=>{
        uniqueStepList = [];
        conditionList = [];
        lastStep = '';
        x=10; y=200; lastStepX=0; lastStepY=100; lastStepX = 10; lastStepY = 200;
        lastSuccessStep=null; lastFailureStep=null;
        setElements([]);
        for (let step of stepsArray){
            let currentStep = step[1];
            let successSteps = step[2];
            let failureSteps = step[3];

            if (uniqueStepList.indexOf(currentStep)===-1){
                if(uniqueStepList.length>=1){
                    x=x+20; y=lastStepY;
                    let last = uniqueStepList[uniqueStepList.length-1];
                    createEdge(last, currentStep, '#D6D5E6');
                }
                createElement(currentStep, x, y);
                lastStepX=x;
                x+=150;
            }

            if (successSteps!==undefined){
                let condition = successSteps[0];
                let successPath = successSteps[1];
                let remainSuccess=successSteps[2];

                if(condition!==undefined && conditionList.indexOf(condition)===-1){
                    y-=100;
                    createElement(condition, x, y, true);
                    createEdge(currentStep, condition, 'green', 'Success');
                    // elements.push(Edge(`s${condition}${currentStep}`, condition, currentStep, 'Failure', 'red', 'd'));
                    x+=200;
                }

                for (let successStep of successPath){
                    if (uniqueStepList.indexOf(successStep)===-1){
                        createElement(successStep, x, y);
                        x+=150;
                    }
                    if (successPath.indexOf(successStep)===0){
                        createEdge(condition, successStep, 'green', 'Success');
                    }
                    else{
                        createEdge(successPath[successPath.indexOf(successStep)-1], successStep,'#D6D5E6');
                    }
                }

                for (let successStep of remainSuccess){
                    if (uniqueStepList.indexOf(successStep)===-1){
                        if (remainSuccess.indexOf(successStep)===0){
                            y-=100;
                        }
                        createElement(successStep, x, y);
                        x+=150;
                    }
                    if (remainSuccess.indexOf(successStep)===0){
                        createEdge(currentStep, successStep, 'green', 'Success');
                    }
                    else{
                        createEdge(remainSuccess[remainSuccess.indexOf(successStep)-1], successStep,'#D6D5E6');
                    }
                }
            }

            if (failureSteps!==undefined){
                x=lastStepX+150;
                y=lastStepY+100;
                for (let failureStep of failureSteps){
                    if (uniqueStepList.indexOf(failureStep)===-1){
                        createElement(failureStep, x, y);
                        x+=150;
                    }
                    if (failureSteps.indexOf(failureStep)===0){
                        createEdge(currentStep, failureStep, 'red', 'Failure');
                    }
                    else{
                        createEdge(failureSteps[failureSteps.indexOf(failureStep)-1], failureStep,'#D6D5E6');
                    }
                }
            }
        }
        }, [ast]
    );

    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: 'box',
        drop(item:any, monitor) {
            if(item.name==='Step') {
                let newStep = (Math.max.apply(Math, uniqueStepList.map((o) => {
                    return +o;
                })) + 1).toString();
                createElement(newStep, 600, 10);
            }
            else if(item.name==='HasRole') {
                createElement('hasRole',600,10, true);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    })

    return (
        <div ref={drop}>
            {GetRequest() && <div
                style={{
                    border: '1px solid rgba(0,0,0,0.2)',
                    height: window.innerHeight*2/3,
                    width: window.innerWidth/2,
                    justifySelf: "center",
                    display:"flex", flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    {visible && (
                        <Popup onCancel={onCancel} onSuccess={onSuccess} onFailure={onFailure}/>
                    )}
                    <ReactFlow
                        elements={elementsList}
                        nodeTypes={{special: StepNode, condition: ConditionNode}}
                        onConnect={(params)=>onConnect(params)}
                    >
                        <Controls />
                        <Background color="#aaa" gap={16} />
                    </ReactFlow>
            </div>}
        </div>
    )

}