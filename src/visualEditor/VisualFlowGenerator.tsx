import React, {useEffect, useState} from "react";
import {AddCondition, AddStepToCondition, AddSuccessFailureSteps, DeleteStep, GetConditionArguments, GetRequest, GetStepsFromAst} from "../mapper/TraverseAst";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import ReactFlow, {Background, Controls} from "react-flow-renderer";
import {Condition, CustomEdge, Edge, Element, Invisible, MultiFactor, Plus, Success} from "./Elements";
import {ComponentSelector} from "../modals/ComponentSelector";
import {Dispatch} from "redux";
import {saveAstFromVisualEditor, saveStep} from "../store/actionCreators";
import {DroppableContainer} from "./DroppableContainer";
import "../styles/visualEditor.css";
import {AuthFactorList} from "../modals/AuthFactorList";
import {nodeTypes} from "../nodes";
import {edgeTypes} from "../edges";
import {ConditionList} from "../modals/ConditionList";

let uniqueNodeIdList: any[] = []; //Array to keep a unique nodes id list
let lastStep: any = null;
let x = 20; let y = 200;
let stepHeight = 220;
let distanceX=350; let distanceY=600;
let lastStepX = 10; let lastStepY = 200;
let stepsToSuccess: any[] = [];
let endsWithCondition: string|null = null ;

export const VisualFlowGenerator: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [visibleAuthFactors, setVisibleAuthFactors] = useState(false);
    const [visibleConditions, setVisibleConditions] = useState(false);
    const [elementsList, setElements] : [any, any] = useState([]);
    const [stepToViewAuthFactors, setStep] : [any, any] = useState(null);
    const [successFailure, setSuccessFailure] : [any, any] = useState(null);

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

    const createEdge = (source:string|null, target:string|null, color:string, label?:string, handler?:string, targetHandler?:string) => {
        setElements((elements:any[])=>[...elements, Edge(`${source}${target}`, source, target, label, color, handler, targetHandler)]);
        stepsToSuccess = stepsToSuccess.filter((value, index, arr)=>{
            return value != source;
        });
    }

    const createCustomEdge = (source:string|null, target:string|null, color:string, label?:string, handler?:string, targetHandler?:string) => {
        setElements((elements:any[])=>[...elements, CustomEdge(`${source}${target}`, source, target, label, color, handler, targetHandler, undefined, undefined, -40, 400)]);
    }

    const createElement = (step:string, xVal:number, yVal:number, type?:string, args?:string[]) => {
        if(type==='condition'){
            setElements((elements:any[])=>[...elements, Condition(step, step, xVal, yVal, args)])
            uniqueNodeIdList.push(step);
            stepsToSuccess.push(step);
            endsWithCondition = step;
        }else if (type==='success'){
            setElements((elements:any[])=>[...elements, Success(step, xVal, yVal)])
        }else if (type==='plus') {
            setElements((elements: any[]) => [...elements, Plus(step, xVal, yVal)])
        }else if(type==='invisible'){
            setElements((elements: any[]) => [...elements, Invisible(step, xVal, yVal)]);
        } else{
            let elementList: any[] = [];
            let authFactorsWithStep = steps.filter((element:any)=>element.id==step);
            elementList.push(Element(step, xVal, yVal, ()=>onClickDelete(step), ()=>showAuthenticatorsList(step)));
            // elementList.push(Failure(step+'failure', xVal+125, yVal+2*stepHeight));
            // elementList.push(Edge(step+step+'failure', step, step+'failure', undefined, "#D6D5E6", "failure", ""));
            uniqueNodeIdList.push(step);
            lastStep = step;
            if (authFactorsWithStep.length>0){
                let basic = authFactorsWithStep[0].options.indexOf("basic") !== -1
                let identifierFirst = authFactorsWithStep[0].options.indexOf("identifier-first") !== -1
                let factors;
                if(basic){
                    factors=authFactorsWithStep[0].options.filter((factor:any)=>factor!=="basic")
                }else if(identifierFirst){
                    factors=authFactorsWithStep[0].options
                        // .filter((factor:any)=>factor!=="identifier-first")
                }else{
                    factors=authFactorsWithStep[0].options
                }
                if (factors.length>0) {
                    elementList.push(Invisible(step + "invisible", xVal + 650, yVal - 16 + stepHeight));
                    uniqueNodeIdList.push(step+"invisible");
                    if (basic){
                        elementList.push(Edge(`${step}${step + "invisible"}`, step, step + "invisible", " Basic ", "#D6D5E6", undefined, "targetLeft"));
                    }
                    let indexToSplit = factors.length/2, firstHalf:any[]=[], secondHalf:any[] =[];
                    if (!basic && factors.length===1){
                        let factor=factors[0];
                        elementList.push(MultiFactor(step + factor, factor, xVal + 350, yVal+stepHeight/2-28.5));
                        elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor, undefined, "#D6D5E6", undefined, undefined));
                        elementList.push(CustomEdge(`${step + factor}${step + "invisible"}`, step + factor, step + "invisible", undefined, "#D6D5E6", undefined, "targetLeft", undefined));
                    }
                    else{
                        if (factors.length === 1) {
                            firstHalf = factors
                        } else {
                            [firstHalf, secondHalf] = [factors.slice(0, indexToSplit), factors.slice(indexToSplit)];
                        }
                        for (let index1 in firstHalf) {
                            let factor1 = firstHalf[index1];
                            elementList.push(MultiFactor(step + factor1, factor1, xVal + 380, yVal - 100 - 300 * +index1));
                            elementList.push(CustomEdge(`${step}${step + factor1}`, step, step + factor1, undefined, "#D6D5E6", undefined, undefined, -10 * (+index1 + 1)));
                            elementList.push(CustomEdge(`${step + factor1}${step + "invisible"}`, step + factor1, step + "invisible", undefined, "#D6D5E6", undefined, "targetTop", undefined, 10*+index1));
                        }
                        for (let index in secondHalf) {
                            let factor = secondHalf[index];
                            elementList.push(MultiFactor(step + factor, factor, xVal + 380, yVal + 260 + 300 * +index));
                            elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor, undefined, "#D6D5E6", undefined, undefined, 10 * (+index + 1)));
                            elementList.push(CustomEdge(`${step + factor}${step + "invisible"}`, step + factor, step + "invisible", undefined, "#D6D5E6", undefined, "targetBottom", undefined, 10*+index));
                        }
                    }
                    stepsToSuccess.push(step + "invisible");
                    x+=distanceX;
                }else{
                    stepsToSuccess.push(step);
                }
            }else{
                stepsToSuccess.push(step);
            }
            setElements((elements: any[]) => [...elements, ...elementList]);
        }
    }

    const onConnect = (params:any) => {
        // setVisible(true);
        // setParams(params);
    }

    const onCancel = () =>{
        setVisible(false);
    }

    const addStep = (state:string) => {
        setVisible(false);
        setVisibleAuthFactors(true);
    }

    const addCondition = (state:string) => {
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
            setSuccessFailure(null);
        }else if(element.type==='failure'){
            setSuccessFailure(element.id);
            setVisibleAuthFactors(true);
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
            let currentStep = lastStep;
            let stepType = 'success';
            if(successFailure!==null){
                currentStep=successFailure[0];
                stepType='failure';
                newAst = AddSuccessFailureSteps(ast, currentStep, (+lastStep + 1).toString(), stepType);
            }
            else if (endsWithCondition===null){
                newAst = AddSuccessFailureSteps(ast, currentStep, (+lastStep + 1).toString(), stepType);
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
            x=20; y=200; lastStepX=0; lastStepY=100; lastStepX = 10; lastStepY = 200;
            setElements([]);
            setVisible(false);
            setVisibleAuthFactors(false);
            setVisibleConditions(false);
            setElements([]);
            setStep(null);
            setSuccessFailure(null);

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
                    x+=distanceX+30;
                }

                if (successSteps!==undefined){
                    let condition = successSteps[0];
                    let successPath = successSteps[1];
                    let remainSuccess=successSteps[2];

                    if(condition!==undefined && uniqueNodeIdList.indexOf(condition)===-1){
                        createElement(condition, x+20, y+189.5, 'condition', GetConditionArguments(ast, condition).toString());
                        createEdge(uniqueNodeIdList[uniqueNodeIdList.length-2], condition, '#D6D5E6');
                        // createCustomEdge(condition, lastStep, 'red', 'Failure','failure', 'failTarget');
                        x+=120;
                    }

                    for (let successStep of successPath){
                        if (uniqueNodeIdList.indexOf(successStep)===-1){
                            createElement(successStep, x, y);
                            x+=distanceX;
                        }
                        if (successPath.indexOf(successStep)===0){
                            createEdge(condition, successStep, '#D6D5E6');
                        }
                        else{
                            console.log(uniqueNodeIdList[uniqueNodeIdList.length-1])
                            createEdge(uniqueNodeIdList[uniqueNodeIdList.length-3], successStep,'#D6D5E6');
                        }
                    }

                    for (let successStep of remainSuccess){
                        if (uniqueNodeIdList.indexOf(successStep)===-1){
                            if (remainSuccess.indexOf(successStep)===0){
                                createEdge(uniqueNodeIdList[uniqueNodeIdList.length-1], successStep, '#D6D5E6');
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
                    let count=1;
                    for (let failureStep of failureSteps){
                        if (uniqueNodeIdList.indexOf(failureStep)===-1){
                            createElement(failureStep, lastStepX, lastStepY+distanceY+200);
                        }
                        if (failureSteps.indexOf(failureStep)===0){
                            createEdge(currentStep, failureStep, '#c63046', undefined, "failure", "failTarget");
                        }
                        else{
                            createEdge(failureSteps[failureSteps.indexOf(failureStep)-1], failureStep,'#D6D5E6');
                        }
                    }
                    count+=1;
                }
            }

            y+=186.5;
            for (let step of stepsToSuccess){
                createElement(step+'plus', x+40, y+8, 'plus');
                createElement(step+'success', x+distanceX/2, y, 'success');
                createEdge(step+'plus', step+'success', '#D6D5E6');
                createEdge(step, step+'plus', '#D6D5E6');
                // y+=800;
            }

        }, [ast, steps]
    );

    return (
        <DroppableContainer className='Flow' containerName="Flow">
            {GetRequest(ast) && <div className='Flow-container'>
                    {visible ? (
                        <ComponentSelector isOpen={visible} onCancel={onCancel} addStep={addStep} addCondition={addCondition}/>
                    ):
                    visibleAuthFactors ? (
                        <AuthFactorList onDone={onDone} step={stepToViewAuthFactors} onBack={()=>{setVisibleAuthFactors(false); setStep(null);}}/>
                    ): visibleConditions ? (
                        <ConditionList onDoneCondition={addConditionToFlow} onBack={()=>{setVisibleConditions((false))}}/>
                    ):(
                        <ReactFlow
                            elements={elementsList}
                            nodesConnectable={false}
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