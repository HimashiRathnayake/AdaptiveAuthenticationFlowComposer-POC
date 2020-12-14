import React, {useEffect, useState} from "react";
import {
    AddCondition,
    AddStepToCondition,
    AddSuccessFailureSteps,
    DeleteStep,
    GetConditionArguments,
    GetStepsFromAst
} from "../mapper/TraverseAst";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import ReactFlow, {Background, Controls, ReactFlowProvider} from "react-flow-renderer";
import {Condition, CustomEdge, Edge, Element, Invisible, MultiFactor, Plus, Success} from "./Elements";
import {Popup} from "./PopUp";
import {Dispatch} from "redux";
import {saveAstFromVisualEditor, saveStep} from "../store/actionCreators";
import {GetRequest} from "../mapper/TraverseAst";
import {DroppableContainer} from "./DroppableContainer";
import "../styles/visualEditor.css";
import {AuthFactorList} from "./AuthFactorList";
import {edgeTypes, nodeTypes} from "../nodes";
import {ConditionList} from "./ConditionList";

let uniqueNodeIdList: any[] = []; //Array to keep a unique nodes id list
let lastStep: any = null;
let x = 10; let y = 200;
let stepHeight = 220;
let distanceX=350; let distanceY=150;
let lastStepX = 10; let lastStepY = 200;
let stepsToSuccess: any[] = [];
let endsWithCondition: string|null = null ;

export const VisualFlowGenerator: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [visibleAuthFactors, setVisibleAuthFactors] = useState(false);
    const [visibleConditions, setVisibleConditions] = useState(false);
    const [elementsList, setElements] : [any, any] = useState([]);
    const [stepToViewAuthFactors, setStep] : [any, any] = useState(null);

    const [ast, steps] : [any, any] = useSelector(
        (state:any) => {
            return [state.astReducer.ast, state.stepReducer.steps]
        },
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch();

    const addFactorToStore = React.useCallback(
        (step: any, factors:any[]) => dispatch(saveStep(step, factors)),
        [dispatch]
    )

    const saveAstToStore = React.useCallback(
        (ast: Object) => dispatch(saveAstFromVisualEditor(ast)),
        [dispatch]
    );

    let stepsArray = GetStepsFromAst(ast);

    const createEdge = (source:string|null, target:string|null, color:string, label?:string) => {
        setElements((elements:any[])=>[...elements, Edge(`${source}${target}`, source, target, label, color)]);
        stepsToSuccess = stepsToSuccess.filter((value, index, arr)=>{
            return value != source;
        });
    }

    const createElement = (step:string, xVal:number, yVal:number, type?:string, args?:string[]) => {
        if(type==='condition'){
            setElements((elements:any[])=>[...elements, Condition(step, step, xVal, yVal, args)])
            uniqueNodeIdList.push(step);
            stepsToSuccess.push(step);
            endsWithCondition = step;
        }else if (type==='success'){
            setElements((elements:any[])=>[...elements, Success(xVal, yVal)])
        }else if (type==='plus'){
            setElements((elements:any[])=>[...elements, Plus(xVal, yVal)])
        } else{
            let authFactorsWithStep = steps.filter((element:any)=>element.id==step);
            setElements((elements:any[])=>[...elements, Element(step, xVal, yVal, ()=>onClickDelete(step), ()=>showAuthenticatorsList(step))])
            uniqueNodeIdList.push(step);
            lastStep = step;
            if (authFactorsWithStep.length>0){
                let basic = authFactorsWithStep[0].options.indexOf("basic") !== -1
                let factors=authFactorsWithStep[0].options.filter((factor:any)=>factor!=="basic")
                let elementList: any[] = [];
                if (factors.length>0) {
                    elementList.push(Invisible(step + "invisible", xVal + 650, yVal -4 + stepHeight));
                    uniqueNodeIdList.push(step+"invisible");
                    if (basic){
                        elementList.push(Edge(`${step}${step + "invisible"}`, step, step + "invisible", undefined, "#D6D5E6", undefined, "targetLeft"));
                    }
                    let indexToSplit = factors.length/2, firstHalf:any[]=[], secondHalf:any[] =[];
                    if (factors.length===1){firstHalf=factors}
                    else{
                        [firstHalf, secondHalf]  = [factors.slice(0, indexToSplit), factors.slice(indexToSplit)];
                    }
                    for (let index in firstHalf) {
                        let factor = firstHalf[index];
                        elementList.push(MultiFactor(step + factor, factor, xVal + 385, yVal -120 - 250*+index));
                        elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor, undefined, "#D6D5E6", undefined, undefined, -10*(+index+1)));
                        elementList.push(CustomEdge(`${step + factor}${step + "invisible"}`, step + factor, step + "invisible", undefined, "#D6D5E6", undefined, "targetTop", undefined, 10*+index, (index==="0")?0:-10));
                    }
                    for (let index in secondHalf) {
                        let factor = secondHalf[index];
                        elementList.push(MultiFactor(step + factor, factor, xVal + 385, yVal + 160 + 250*+index));
                        elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor, undefined, "#D6D5E6", undefined, undefined, 10*(+index+1)));
                        elementList.push(CustomEdge(`${step + factor}${step + "invisible"}`, step + factor, step + "invisible", undefined, "#D6D5E6", undefined, "targetBottom", undefined, 10*+index));
                    }
                    setElements((elements: any[]) => [...elements, ...elementList])
                    stepsToSuccess.push(step + "invisible");
                    x+=400;
                }else{
                    stepsToSuccess.push(step);
                }
            }else{
                stepsToSuccess.push(step);
            }
        }
    }

    const onConnect = (params:any) => {
        // setVisible(true);
        // setParams(params);
    }

    const onCancel = () =>{
        setVisible(false);
    }

    const addStep = () => {
        setVisible(false);
        setVisibleAuthFactors(true);
    }

    const addCondition = () => {
        setVisible(false);
        setVisibleConditions(true);
    }

    const addConditionToFlow = (condition:string) => {
        setVisibleConditions(false);
        let newAst = AddCondition(ast, lastStep, condition);
        saveAstToStore({});
        saveAstToStore(newAst);
    }

    const onClick = (element:any) => {
        if(element.type==='plus'){
            setVisible(true);
        }
    }

    const onClickDelete = (step:string) => {
        let newAst = DeleteStep(ast, step);
        saveAstToStore({});
        saveAstToStore(newAst);
    }

    const showAuthenticatorsList = (step:string) => {
        setVisibleAuthFactors(true);
        setStep(step);
    }

    const onDone = (authFactors:any[]) => {
        let step: string = '';
        if (stepToViewAuthFactors===null) {
            let newAst;
            if (endsWithCondition===null){
                newAst = AddSuccessFailureSteps(ast, lastStep.toString(), (+lastStep + 1).toString(), 'success');
            }
            else{
                newAst = AddStepToCondition(ast, endsWithCondition, (+lastStep + 1).toString());
                endsWithCondition = null;
            }
            saveAstToStore({});
            saveAstToStore(newAst);
            step = (lastStep + 1).toString();
        }else{
            step = stepToViewAuthFactors.toString();
            setStep(null);
        }
        addFactorToStore(step, authFactors);
        setVisibleAuthFactors(false);
    }

    useEffect(()=>{
            uniqueNodeIdList = [];
            stepsToSuccess = [];
            x=10; y=200; lastStepX=0; lastStepY=100; lastStepX = 10; lastStepY = 200;
            setElements([]);

            for (let step of stepsArray){
                let currentStep = step[1];
                let successSteps = step[2];
                let failureSteps = step[3];

                if (uniqueNodeIdList.indexOf(currentStep)===-1){
                    if(uniqueNodeIdList.length>=1){
                        x=x+20; y=lastStepY;
                        let last = uniqueNodeIdList[uniqueNodeIdList.length-1];
                        createEdge(last, currentStep, '#D6D5E6');
                    }
                    createElement(currentStep, x, y);
                    lastStepX=x;
                    x+=distanceX;
                }

                if (successSteps!==undefined){
                    let condition = successSteps[0];
                    let successPath = successSteps[1];
                    let remainSuccess=successSteps[2];

                    if(condition!==undefined && uniqueNodeIdList.indexOf(condition)===-1){
                        createElement(condition, x, y+187.5, 'condition', GetConditionArguments(ast, condition).toString());
                        createEdge(uniqueNodeIdList[uniqueNodeIdList.length-2], condition, 'green', 'Success');
                        x+=distanceX;
                    }

                    for (let successStep of successPath){
                        if (uniqueNodeIdList.indexOf(successStep)===-1){
                            createElement(successStep, x, y);
                            x+=distanceX;
                        }
                        if (successPath.indexOf(successStep)===0){
                            createEdge(condition, successStep, 'green', 'Success');
                        }
                        else{
                            createEdge(successPath[successPath.indexOf(successStep)-1], successStep,'#D6D5E6');
                        }
                    }

                    for (let successStep of remainSuccess){
                        if (uniqueNodeIdList.indexOf(successStep)===-1){
                            if (remainSuccess.indexOf(successStep)===0){
                                createEdge(uniqueNodeIdList[uniqueNodeIdList.length-1], successStep, 'green', 'Success');
                            }
                            else{
                                createEdge(remainSuccess[remainSuccess.indexOf(successStep)-1], successStep,'#D6D5E6');
                            }
                            createElement(successStep, x, y);
                            x+=distanceX;
                        }
                    }
                }

                if (failureSteps!==undefined){
                    x=lastStepX+distanceX;
                    y=lastStepY+distanceY;
                    for (let failureStep of failureSteps){
                        if (uniqueNodeIdList.indexOf(failureStep)===-1){
                            createElement(failureStep, x, y);
                            x+=distanceX;
                        }
                        if (failureSteps.indexOf(failureStep)===0){
                            createEdge(currentStep, failureStep, '#c63046', 'Failure');
                        }
                        else{
                            createEdge(failureSteps[failureSteps.indexOf(failureStep)-1], failureStep,'#D6D5E6');
                        }
                    }
                }
            }

            if (stepsToSuccess.length !==0) {
                y+=186.5;
                createElement('plus', x+40, y+9, 'plus');
                createElement('success', x+200, y, 'success');
                createEdge('plus', 'success', '#D6D5E6');
            }

            for (let step of stepsToSuccess){
                createEdge(step, 'plus', '#D6D5E6');
            }

        }, [ast, steps]
    );

    return (
        <DroppableContainer className='Flow' containerName="Flow">
            {GetRequest(ast) && <div className='Flow-container'>
                    {visible ? (
                        <Popup onCancel={onCancel} addStep={addStep} addCondition={addCondition}/>
                    ): visibleAuthFactors ? (
                        <AuthFactorList onDone={onDone} step={stepToViewAuthFactors}/>
                    ): visibleConditions ? (
                        <ConditionList onDoneCondition={addConditionToFlow}/>
                    ):(
                        <ReactFlow
                            elements={elementsList}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            onConnect={(params)=>onConnect(params)}
                            onElementClick={(params, element)=>onClick(element)}
                        >
                            <Controls className="flow-control"/>
                            <Background color="#aaa" gap={16} />
                        </ReactFlow>
                        )}
            </div>}
        </DroppableContainer>
    )

}