import traverse from "@babel/traverse";
import * as syntax from "./AdaptiveCodeSyntax";
import generate from "@babel/generator";
import * as type from "@babel/types";
import {
    createExpressionStatement, createExpressionStatementWithSuccess, createIfStatement, createIfStatementWithArguments,
    createObjectExpressionWithCondition,
    createObjectExpressionWithProperty,
    createSuccessFailurePropertyWithStep,
    createSuccessPropertyWithCondition, createVariableDeclarationForCondition,
} from "./GenerateTypes";
import {parse} from "@babel/parser";
import {last} from "lodash-es";

const parser = require('@babel/parser').parse;

export const GetRequest = (ast:any) => {
    let request: boolean = false;
    try{
        traverse(ast, {
            VariableDeclarator(path: any){
                if (path.node.id.name === syntax.loginRequest){
                    request = true;
                }
            },
        })
    }
    catch(e){}
    return(request);
}

export const GetLastStep = (ast: any): number => {
    let lastStep: number = 0;
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                if (path.node.arguments[0].value > lastStep){
                    lastStep = path.node.arguments[0].value
                }
            }
        },
    })
    return lastStep;
}

export const GetSuccessStep = (ast : any, scope:any, parentPath:any, state:any) => {
    let successSteps: any[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onSuccess){
                let steps = GetCallExpression(path.node, path.scope, path.parentPath, path.state);
                let [condition, success] = GetCondition(path.node, path.scope, path.parentPath, path.state)
                let remaining = steps.filter( (step:any) => success.indexOf(step)===-1);
                successSteps.push([condition, success, remaining]);
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return successSteps[0];
}

export const GetFailureStep = (ast : any, scope:any, parentPath:any, state:any) => {
    let failSteps: number[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onFail){
                failSteps.push(GetCallExpression(path.node, path.scope, path.parentPath, path.state));
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return failSteps.pop();
}

export const GetCondition = (ast : any, scope:any, parentPath:any, state:any): any => {
    let condition: string|undefined = undefined;
    let success: any[] = [];
    traverse(ast, {
        CallExpression(path:any){
            if (path.node.callee.name===syntax.stepExecutor){
                path.stop();
            }
        }
        ,IfStatement(path: any){
            if (path.node.test.type==='Identifier'){
                condition = path.node.test.name
            }else if (path.node.test.type==='CallExpression'){
                condition = path.node.test.callee.name
            }else{
                condition = generate(path.node.test).code;
            }
            success = GetCallExpression(path.node, path.scope, path.parentPath, path.state);
        }
    }, scope, state, parentPath)
    return [condition, success];
}

export const GetConditionArguments = (ast : any, condition:string): any => {
    let params: any[] = [];
    traverse(ast, {
        VariableDeclarator(path: any){
            if(path.node.id.name===syntax.roles){
                params = path.node.init.elements.map((ele:any)=>ele.value);
            }else if (path.node.id.name === syntax.invalidAttemptsToStepUp){
                params = path.node.init.value;
            }
        }
    })
    return params;
}

export const GetCallExpression = (ast : any, scope:any, parentPath:any, state:any): any => {
    const steps: number[] = [];
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                steps.push(path.node.arguments[0].value)
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return steps;
}

export const GetStepsFromAst = (ast : any) => {

    let stepsArray: any[] = [];

    try{
        let count=0;
        traverse(ast, {
            CallExpression(path: any){
                if (path.node.callee.name===syntax.stepExecutor){
                    let success = GetSuccessStep(path.node, path.scope, path.parentPath, path.state);
                    let fail = GetFailureStep(path.node, path.scope, path.parentPath, path.state);
                    stepsArray.push([count, path.node.arguments[0].value, success, fail]) //key, step, onSuccess, onFail
                    count = count+1
                }
            }
        })
    }
    catch(e){}

    return(stepsArray);
}

export const AddStepToEnd = (ast: any): object => {
    let pathASt: any = ast;
    let AlreadyHasStep = false;
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                pathASt = path
                AlreadyHasStep = true;
                path.skip()
            }
        },
    })
    if (AlreadyHasStep) {
        let stepNode = type.callExpression(type.identifier(syntax.stepExecutor), [type.numericLiteral(+GetLastStep(ast)+1)])
        pathASt.insertAfter(stepNode);
    }else{
        let stepNode = type.callExpression(type.identifier(syntax.stepExecutor), [type.numericLiteral(+GetLastStep(ast)+1)])
        let node = type.variableDeclaration(
            syntax.variable,
            [
                type.variableDeclarator(type.identifier(syntax.loginRequest),
                    type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement([type.expressionStatement(stepNode)])))]
        );
        ast = parser('');
        ast.program.body.push(node);
    }
    return ast;
}

export const FindStep = (ast:any, step:string) => {
    let stepPath : any = {};
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor && path.node.arguments[0].value == step) {
                stepPath = path;
            }
        },
    })
    return stepPath;
}

export const FindConditionWithLastStep = (ast:any, condition:string) => {
    let stepPath : any = {};
    let lastStep : any = 0;
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                lastStep = path.node.arguments[0].value;
            }
        },
        IfStatement(path: any){
            if (path.node.test.callee && path.node.test.callee.name===condition) {
                stepPath = path;
                path.stop();
            }
        }
    })
    return [lastStep, stepPath];
}

export const checkSuccessFailurePath = (ast : any, scope:any, parentPath:any, state:any, type:string) => {
    let successPath :any = null;
    traverse(ast, {
        ObjectMember(path: any){
            let key = (type==='success')?syntax.onSuccess : syntax.onFail
            if (path.node.key.name===key){
                successPath = [path.node, path.scope, path.parentPath, path.state];
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return successPath;
}

export const AddSuccessFailureSteps = (ast: any, currentStep: string, nextStep: string, stepType:string) => {
    let path = FindStep(ast, currentStep);
    let successPath = checkSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, stepType);
    if (successPath === null) {
        let key = (stepType==='success')?syntax.onSuccess : syntax.onFail
        if(path.node.arguments.length===1) {
            path.node.arguments.push(createObjectExpressionWithProperty(key, nextStep));
        }else{
            path.node.arguments[1].properties.push(createSuccessFailurePropertyWithStep(key, nextStep));
        }
    } else {
        successPath[0].value.body.body.push(type.expressionStatement(type.callExpression(type.identifier(syntax.stepExecutor), [type.numericLiteral(+nextStep)])));
    }
    return ast;
}

export const AddSuccessFailureStepsBefore = (ast: any, beforeStep:string) => {
    let pathBefore = FindStep(ast, beforeStep);
    traverse(ast, {
        CallExpression(path: any) {
            if (path.node.callee.name === syntax.stepExecutor && path.node.arguments[0].value > +beforeStep-1) {
                path.node.arguments[0].value = path.node.arguments[0].value + 1;
            }
        }
    });
    let args = pathBefore.parentPath.parent.body[0];
    pathBefore.parentPath.parent.body[0] = createExpressionStatementWithSuccess(beforeStep, args);
    return ast;
}

export const AddSuccessFailureStepsBeforeCondition = (ast: any, beforeStep:string) => {
    let [lastStep, pathBefore] = FindConditionWithLastStep(ast, beforeStep);
    traverse(ast, {
        CallExpression(path: any) {
            if (path.node.callee.name === syntax.stepExecutor && path.node.arguments[0].value > lastStep) {
                path.node.arguments[0].value = path.node.arguments[0].value + 1;
            }
        }
    })
    let args = pathBefore.parent.body[0];
    pathBefore.parent.body[0] = createExpressionStatementWithSuccess(lastStep + 1, args);
    return [ast, lastStep+1];
}

export const AddCondition = (ast:any, step:string, condition:string, params?:any) => {
    let path = FindStep(ast, step);
    let successPath = checkSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, 'success');
    if(successPath===null){
        if(path.node.arguments.length===1) {
            path.node.arguments.push(createObjectExpressionWithCondition(syntax.onSuccess, condition));
        }else{
            path.node.arguments[1].properties.push(createSuccessPropertyWithCondition(syntax.onSuccess, condition));
        }
    }else{
        successPath[0].value.body.body.push(createIfStatement(condition));
    }
    ast.program.body.unshift(parse(syntax.getConditionSyntax(condition)).program.body[0]);
    ast.program.body.unshift(createVariableDeclarationForCondition(condition, params));
    return ast;
}

export const AddConditionBeforeStep = (condition: string, params:any, ast: any, beforeStep:string) => {
    let pathBefore = FindStep(ast, beforeStep);
    let args = pathBefore.parentPath.parent.body[0];
    pathBefore.parentPath.parent.body[0] = createIfStatementWithArguments(condition, args);
    ast.program.body.unshift(parse(syntax.getConditionSyntax(condition)).program.body[0]);
    ast.program.body.unshift(createVariableDeclarationForCondition(condition, params));
    return ast;
}

export const AddStepToCondition = (ast:any, condition:string, step:string) => {
    traverse(ast, {
        IfStatement(path: any){
            if (path.node.test.callee && path.node.test.callee.name===condition) {
                path.node.consequent.body.push(createExpressionStatement(step));
            }
        }
    })
    return ast;
}

export const DeleteStep = (ast:any, step:string) => {
    let parentPath = FindStep(ast, step).parentPath;
    delete(parentPath.parent.body[parentPath.key]);
    return ast;
}