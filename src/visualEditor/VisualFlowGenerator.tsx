import React, {useEffect, useState} from "react";
import {
    AddCondition, AddConditionBeforeStep,
    AddStepToCondition,
    AddSuccessFailureSteps,
    AddSuccessFailureStepsBefore, AddSuccessFailureStepsBeforeCondition,
    DeleteStep,
    GetConditionArguments,
    GetRequest,
    GetStepsFromAst
} from "../mapper/TraverseAst";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import ReactFlow, {Background, Controls} from "react-flow-renderer";
import {Condition, CustomEdge, Edge, Element, Connector, MultiFactor, Plus, Success, Start} from "./Elements";
import {ComponentSelector} from "../modals/ComponentSelector";
import {Dispatch} from "redux";
import {saveAstFromVisualEditor, saveStep, shiftSaveStep} from "../store/actionCreators";
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
let stepWidth = 300;
let distanceX=350; let distanceY=600;
let lastStepX = 10; let lastStepY = 200;
let gapX = 150, conditionWidth = 50;
let stepsToSuccess: any[] = [];

export const VisualFlowGenerator: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [visibleAuthFactors, setVisibleAuthFactors] = useState(false);
    const [visibleConditions, setVisibleConditions] = useState(false);
    const [elementsList, setElements] : [any, any] = useState([]);
    const [stepToViewAuthFactors, setStep] : [any, any] = useState(null);
    const [successFailure, setSuccessFailure] : [any, any] = useState(null);
    const [beforeStep, setBeforeStep] : [any,any] = useState(null);
    const [endsWithCondition, setEndsWithCondition] : [any, any] = useState(null);

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
    );

    const addShiftFactorsToStore = React.useCallback(
        (step: any, factors:any[]) => dispatch(shiftSaveStep(step, factors)),
        [dispatch]
    );

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
        if(type==='start'){
            setElements((elements:any[])=>[...elements, Start(step, xVal, yVal)])
        }else if(type==='condition'){
            setElements((elements:any[])=>[...elements, Condition(step, step, xVal, yVal, args)])
            uniqueNodeIdList.push(step);
            stepsToSuccess.push(step);
        }else if (type==='success'){
            setElements((elements:any[])=>[...elements, Success(step, xVal, yVal)])
        }else if (type==='plus') {
            setElements((elements: any[]) => [...elements, Plus(step, xVal, yVal)])
        }else if(type==='connector'){
            setElements((elements: any[]) => [...elements, Connector(step, xVal, yVal)]);
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
                    elementList.push(Connector(step + "connector", xVal + 650, yVal - 12.5 + stepHeight));
                    uniqueNodeIdList.push(step+"connector");
                    if (basic){
                        elementList.push(Edge(`${step}${step + "connector"}`, step, step + "connector", " Basic ", "#D6D5E6", undefined, "targetLeft"));
                    }
                    let indexToSplit = factors.length/2, firstHalf:any[]=[], secondHalf:any[] =[];
                    if (!basic && factors.length===1){
                        let factor=factors[0];
                        elementList.push(MultiFactor(step + factor, factor, xVal + 350, yVal+stepHeight/2-28.5));
                        elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor, undefined, "#D6D5E6", undefined, undefined));
                        elementList.push(CustomEdge(`${step + factor}${step + "connector"}`, step + factor, step + "connector", undefined, "#D6D5E6", undefined, "targetLeft", undefined));
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
                            elementList.push(CustomEdge(`${step + factor1}${step + "connector"}`, step + factor1, step + "connector", undefined, "#D6D5E6", undefined, "targetTop", undefined, 10*+index1));
                        }
                        for (let index in secondHalf) {
                            let factor = secondHalf[index];
                            elementList.push(MultiFactor(step + factor, factor, xVal + 380, yVal + 260 + 300 * +index));
                            elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor, undefined, "#D6D5E6", undefined, undefined, 10 * (+index + 1)));
                            elementList.push(CustomEdge(`${step + factor}${step + "connector"}`, step + factor, step + "connector", undefined, "#D6D5E6", undefined, "targetBottom", undefined, 10*+index));
                        }
                    }
                    stepsToSuccess.push(step + "connector");
                    x+=distanceX; //Add a space after adding authenticators
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

    const addConditionToFlow = (condition:string, params?:any) => {
        let newAst : any;
        setVisibleConditions(false);
        if (beforeStep!==null){
            if(isNaN(+beforeStep)) {
                // [newAst, step] = AddSuccessFailureStepsBeforeCondition(ast, beforeStep);
            }else{
                newAst = AddConditionBeforeStep(condition, params, ast, beforeStep);
                // step = beforeStep;
            }
            setBeforeStep(null);
        }else{
            newAst = AddCondition(ast, lastStep, condition, params);
            setEndsWithCondition(condition);
        }
        saveAstToStore({});
        saveAstToStore(newAst);
    }

    const onClick = (element:any) => {
        if(element.type==='plus'){
            let nextStep = element.id.split(" ")[1].split(".")[0];
            if(nextStep!=="final"){
                setBeforeStep(nextStep);
            }
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
                step = (lastStep + 1).toString();
                addFactorToStore(step, authFactors);
            }else if (beforeStep!==null){
                if(isNaN(+beforeStep)) {
                    [newAst, step] = AddSuccessFailureStepsBeforeCondition(ast, beforeStep);
                }else{
                    newAst = AddSuccessFailureStepsBefore(ast, beforeStep);
                    step = beforeStep;
                }
                addShiftFactorsToStore(step, authFactors);
                setBeforeStep(null);
            }
            else if (endsWithCondition===null){
                newAst = AddSuccessFailureSteps(ast, currentStep, (+lastStep + 1).toString(), stepType);
                step = (lastStep + 1).toString();
                addFactorToStore(step, authFactors);
            }
            else if (endsWithCondition!==null){
                newAst = AddStepToCondition(ast, endsWithCondition, (+lastStep + 1).toString());
                setEndsWithCondition(null);
                step = (lastStep + 1).toString();
                addFactorToStore(step, authFactors);
            }
            saveAstToStore({});
            saveAstToStore(newAst);
        }else{
            step = stepToViewAuthFactors.toString();
            addFactorToStore(`${step}`, authFactors);
            console.log(step, authFactors)
            setStep(null);
        }
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
            setSuccessFailure(null);

            for (let step of stepsArray){
                let currentStep = step[1];
                let successSteps = step[2];
                let failureSteps = step[3];

                if (uniqueNodeIdList.indexOf(currentStep)===-1){
                    if(uniqueNodeIdList.length<1){
                        createElement("start", x, y+stepHeight - 31.5, "start");
                        createEdge("start", 'plus '+currentStep, '#D6D5E6');
                        x+=gapX+115;
                    }else{
                        y=lastStepY;
                        let last = uniqueNodeIdList[uniqueNodeIdList.length-1];
                        createEdge(last, 'plus '+currentStep, '#D6D5E6');
                    }
                    createElement('plus '+currentStep, x-gapX/2-15, y+stepHeight-18.5, 'plus');
                    createElement(currentStep, x, y);
                    createEdge('plus '+currentStep, currentStep, '#D6D5E6');
                    lastStepX=x;
                    x+=stepWidth + gapX;
                }

                if (successSteps!==undefined){
                    let condition = successSteps[0];
                    let successPath = successSteps[1];
                    let remainSuccess=successSteps[2];

                    if(condition!==undefined && uniqueNodeIdList.indexOf(condition)===-1){
                        createElement("plus "+condition, x-gapX/2-15, y+201.5, 'plus');
                        createElement(condition, x, y+185.5, 'condition', GetConditionArguments(ast, condition).toString());
                        createEdge(uniqueNodeIdList[uniqueNodeIdList.length-2], "plus "+condition, '#D6D5E6');
                        createEdge("plus "+condition, condition, '#D6D5E6');
                        createCustomEdge(condition, 'success', 'red', 'Else','failure', 'targetTop');
                        x+=gapX+conditionWidth;
                    }

                    for (let successStep of successPath){
                        if (uniqueNodeIdList.indexOf(successStep)===-1){
                            createElement("plus "+successStep, x-gapX/2-15, y+201.5, 'plus');
                            createElement(successStep, x, y);
                            createEdge("plus "+successStep, successStep, '#D6D5E6');
                            x+=stepWidth + gapX;
                        }
                        if (successPath.indexOf(successStep)===0){
                            createEdge(condition, "plus "+successStep, '#D6D5E6');
                        }
                        else{
                            createEdge(uniqueNodeIdList[uniqueNodeIdList.length-3], "plus " + successStep,'#D6D5E6');
                        }
                    }

                    for (let successStep of remainSuccess){
                        if (uniqueNodeIdList.indexOf(successStep)===-1){
                            if (remainSuccess.indexOf(successStep)===0){
                                createEdge(uniqueNodeIdList[uniqueNodeIdList.length-1], "plus "+successStep, '#D6D5E6');
                            }
                            else{
                                createEdge(remainSuccess[remainSuccess.indexOf(successStep)-1], "plus "+successStep,'#D6D5E6');
                            }
                            createElement("plus "+successStep, x-gapX/2-15, y+201.5, 'plus');
                            createElement(successStep, x, y);
                            createEdge("plus "+successStep, successStep, '#D6D5E6');
                            x+=stepWidth + gapX;
                        }
                    }
                }

                // if (failureSteps!==undefined){
                //     let count=1;
                //     for (let failureStep of failureSteps){
                //         if (uniqueNodeIdList.indexOf(failureStep)===-1){
                //             createElement(failureStep, lastStepX, lastStepY+distanceY+200);
                //         }
                //         if (failureSteps.indexOf(failureStep)===0){
                //             createEdge(currentStep, failureStep, '#c63046', undefined, "failure", "failTarget");
                //         }
                //         else{
                //             createEdge(failureSteps[failureSteps.indexOf(failureStep)-1], failureStep,'#D6D5E6');
                //         }
                //     }
                //     count+=1;
                // }
            }

            y+=186.5;
            if(stepsToSuccess.length!==0) {
                createElement('success', x, y - 10, 'success');
            }
            for (let step of stepsToSuccess){
                createElement('plus'+step+' final', x-gapX/2-15, y+15, 'plus');
                createEdge('plus'+step+' final', 'success', '#D6D5E6');
                createEdge(step, 'plus'+step+' final', '#D6D5E6');
                // y+=800;
            }

        }, [ast, steps]
    );

    return (
        <DroppableContainer className='Flow' containerName="Flow">
            {GetRequest(ast) && <div className='Flow-container'>
                    <ComponentSelector isOpen={visible} onCancel={onCancel} addStep={addStep} addCondition={addCondition}/>
                    {visibleAuthFactors &&
                        <AuthFactorList isOpen={visibleAuthFactors} onDone={onDone} step={stepToViewAuthFactors} nextStep={beforeStep} onBack={()=>{setVisibleAuthFactors(false); setStep(null);}}/>
                    }
                    <ConditionList isOpen={visibleConditions} onDoneCondition={addConditionToFlow} onBack={()=>{setVisibleConditions((false))}}/>
                    <ReactFlow
                        elements={elementsList}
                        nodesConnectable={false}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onConnect={(params)=>onConnect(params)}
                        onElementClick={(params, element)=>onClick(element)}
                    >
                        <Controls className="flow-control"/>
                        <Background color="#aaa" gap={16} className="flowBackground"/>
                    </ReactFlow>
            </div>}
        </DroppableContainer>
    )

}