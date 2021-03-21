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

//check whether the script has a login request
export const HasLoginRequest = (ast:any) : boolean => {
    let request: boolean = false;
    try{
        traverse(ast, {
            VariableDeclarator(path: any){
                if (path.node.id.name === syntax.loginRequest){
                    request = true;
                    path.stop();
                }
            },
        })
    }
    catch(error){
        //console.log(error);
    }
    return(request);
}

export const HasHarmfulOperations = (ast:any) : number[] => {
    let harmfulLocationArray: number[] = [];
    try{
        traverse(ast, {
            WhileStatement(path: any){
                harmfulLocationArray.push(path.node.body.loc.start.line);
            },
            ForStatement(path: any){
                harmfulLocationArray.push(path.node.body.loc.start.line);
            }
        })
    }
    catch(error){
        //console.log(error);
    }
    return(harmfulLocationArray);
}

export const GetStepsInSuccessPath = (ast : any, scope:any, parentPath:any, state:any) : object|undefined => {
    let successSteps: object|undefined = undefined;
    try {
        traverse(ast, {
            ObjectMember(path: any) {
                if (path.node.key.name === syntax.onSuccess) {
                    let steps = GetCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state);
                    let condition: any = GetCondition(path.node, path.scope, path.parentPath, path.state);
                    let remaining = steps.filter((step: any) => condition.onSuccess.indexOf(step) === -1);
                    successSteps = {
                        condition: condition.condition,
                        onConditionSuccess: condition.onSuccess,
                        remainingSuccess: remaining
                    };
                }
                path.skip()
            }
        }, scope, state, parentPath)
    } catch (error){
        //console.log(error);
    }
    return successSteps;
}

export const GetStepsInFailurePath = (ast : any, scope:any, parentPath:any, state:any) => {
    let failSteps: number[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onFail){
                failSteps.push(GetCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state));
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return failSteps.pop();
}

export const GetCondition = (ast : any, scope:any, parentPath:any, state:any): object => {
    let condition: string|undefined = undefined;
    let success: any[] = [];
    try {
        traverse(ast, {
            CallExpression(path: any) {
                if (path.node.callee.name === syntax.stepExecutor) {
                    path.stop();
                }
            }
            , IfStatement(path: any) {
                if (path.node.test.type === 'Identifier') {
                    condition = path.node.test.name
                } else if (path.node.test.type === 'CallExpression') {
                    condition = path.node.test.callee.name
                } else {
                    condition = generate(path.node.test).code;
                }
                success = GetCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state);
            }
        }, scope, state, parentPath)
    } catch (error) {
        //console.log(error);
    }
    return {
        condition: condition,
        onSuccess: success,
    };
}

export const GetConditionArguments = (ast : any): any => {
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

export const GetCallExpressionsInPath = (ast : any, scope:any, parentPath:any, state:any): any => {
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

export const GetAllStepsFromAst = (ast : any) : any[] => {
    let stepsArray: any[] = [];
    try{
        traverse(ast, {
            CallExpression(path: any){
                if (path.node.callee.name===syntax.stepExecutor){
                    let success = GetStepsInSuccessPath(path.node, path.scope, path.parentPath, path.state);
                    let fail = GetStepsInFailurePath(path.node, path.scope, path.parentPath, path.state);
                    stepsArray.push({
                        step: path.node.arguments[0].value,
                        onSuccess: success,
                        onFail: fail
                    })
                }
            }
        })
    }
    catch(error){
        //console.log(error);
    }
    return(stepsArray);
}

export const GetPathOfStep = (ast:any, step:string) : any => {
    let stepPath : any = {};
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor && path.node.arguments[0].value === +step) {
                stepPath = path;
            }
        },
    })
    return stepPath;
}

export const GetConditionPathWithLastStep = (ast:any, condition:string) : any[] => {
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
            }else if (path.node.test && path.node.test.name===condition) {
                stepPath = path;
                path.stop();
            }else if (path.node.test.left.callee.object.name===condition){
                stepPath = path;
                path.stop();
            }
        }
    })
    return [lastStep, stepPath];
}

export const GetSuccessFailurePath = (ast : any, scope:any, parentPath:any, state:any, type:string) : any => {
    let successPath : any = null;
    traverse(ast, {
        ObjectMember(path: any){
            let key = (type==='success') ? syntax.onSuccess : syntax.onFail
            if (path.node.key.name===key){
                successPath = [path.node, path.scope, path.parentPath, path.state];
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return successPath;
}

export const AddSuccessFailureSteps = (ast: any, currentStep: string, nextStep: string, stepType:string) => {
    let path = GetPathOfStep(ast, currentStep);
    let successPath = GetSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, stepType);
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
    let pathBefore = GetPathOfStep(ast, beforeStep);
    traverse(ast, {
        CallExpression(path: any) {
            if (path.node.callee.name === syntax.stepExecutor && path.node.arguments[0].value > +beforeStep-1) {
                path.node.arguments[0].value = path.node.arguments[0].value + 1;
            }
        }
    });
    let args = pathBefore.parentPath.parent.body[pathBefore.parentPath.key];
    pathBefore.parentPath.parent.body[pathBefore.parentPath.key] = createExpressionStatementWithSuccess(beforeStep, args);
    return ast;
}

export const AddSuccessFailureStepsBeforeCondition = (ast: any, beforeStep:string) => {
    let [lastStep, pathBefore] = GetConditionPathWithLastStep(ast, beforeStep);
    traverse(ast, {
        CallExpression(path: any) {
            if (path.node.callee.name === syntax.stepExecutor && path.node.arguments[0].value > lastStep) {
                path.node.arguments[0].value = path.node.arguments[0].value + 1;
            }
        }
    })
    let args = pathBefore.parent.body[pathBefore.key];
    pathBefore.parent.body[pathBefore.key] = createExpressionStatementWithSuccess(lastStep + 1, args);
    return [ast, lastStep+1];
}

export const AddCondition = (ast:any, step:string, condition:string, params?:any) => {
    let path = GetPathOfStep(ast, step);
    let successPath = GetSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, 'success');
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
    let pathBefore = GetPathOfStep(ast, beforeStep);
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
    let parentPath = GetPathOfStep(ast, step).parentPath;
    delete(parentPath.parent.body[parentPath.key]);
    return ast;
}