import {shallowEqual, useSelector} from "react-redux";
import * as syntax from "./AdaptiveCodeSyntax";
import generate from "@babel/generator";
import {parse} from "@babel/parser";
import traverse from "@babel/traverse";
const parser = require('@babel/parser').parse;

export const ParseToAst = (value?:string) => {
    //.......................................acorn....................................................
    // try{
    //     const acorn = require("acorn")
    //     return acorn.parse(value);
    // }catch (e) {
    //     console.log(e);
    // }

    //.......................................esprima....................................................
    // const esprima = require('esprima');
    // let tokens = esprima.tokenize(value);
    // console.log(tokens);
    // let ast = esprima.parseScript(value);
    // console.log(ast);

    //......................................babel.......................................................
    if (value===undefined){
        value=''
    }
    try {
        return parse(value);
    }catch (e) {return ''}

}

export const GetRequest = () => {

    let request: boolean = false;
    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

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

export const GetSuccessStep = (ast : any, scope:any, parentPath:any, state:any) => {
    let successSteps: number[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onSuccess){
                successSteps.push(GetCallExpression(path.node, path.scope, path.parentPath, path.state));
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

export const GetSuccessStepsAsNodes = (ast : any, scope:any, parentPath:any, state:any) => {
    let successSteps: any[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onSuccess){
                successSteps.push(GetCallExpressionAsNode(path.node, path.scope, path.parentPath, path.state));
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return successSteps[0];
}

export const GetFailureStepsAsNodes = (ast : any, scope:any, parentPath:any, state:any) => {
    let failureSteps: any[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onFail){
                failureSteps.push(GetCallExpressionAsNode(path.node, path.scope, path.parentPath, path.state));
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return failureSteps[0];
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

export const GetCallExpressionAsNode = (ast : any, scope:any, parentPath:any, state:any): any => {
    const steps: any[] = [];
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                steps.push(path.node)
            }
            path.skip()
        }
    }, scope, state, parentPath)
    return steps;
}

export const GetStepsFromAst = (ast : any) => {

    let stepsArray: any[] = [];

    //.....................................acorn-walk....................................................
    // const walk = require("acorn-walk")

    // try{
    //     let count=0;
    //     walk.simple(ast, {
    //         CallExpression(node: any) {
    //             if (node.callee.name === syntax.stepExecutor) {
    //                 if (node.arguments[0] !== undefined) {
    //                     stepsArray.push([node.arguments[0].raw, count])
    //                     // console.log(`${node.arguments[0].raw}`)
    //                     count=count+1;
    //                 }
    //             }
    //         }
    //     })
    // }
    // catch(e){
    //     console.log(e);
    // }

    //.....................................babel-traverse...............................................................
    // const regEx = new RegExp('executeStep\\((.*?)\\);$');

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

export const GenerateCodeFromAst = (ast : any): string|undefined => {

    //...................................with acorn............................................
    // console.log('script', ast)
    // try{
    //     console.log(generate(ast));
    //     return generate(ast).substr(0,generate(ast).length-1);
    // }catch (e) {
    //     console.log(e);
    // }

    //....................................for @babel/generator..................................................
    try{
        return generate(ast).code.substr(0,generate(ast).code.length-1);
    }catch (e) {}
}

export const AddStepToEnd = (step: string, ast: any): object => {
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
        pathASt.insertAfter(parser(`executeStep(${step});`, {sourceType: 'script'}).program.body[0]);
    }else{
        ast = parser(`var onLoginRequest = function(context){executeStep(${step});}`)
    }
    return ast;
}

export const AddSuccessFailureSteps = (stepToAdd: string, currentStep: string, ast: any, type:string) => {
    let pathASt: any = ast;
    let successSteps: any;
    let failureSteps: any;
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor && path.node.arguments[0].value == currentStep) {
                pathASt = path
                successSteps = GetSuccessStepsAsNodes(path.node, path.scope, path.parentPath, path.state);
                failureSteps = GetFailureStepsAsNodes(path.node, path.scope, path.parentPath, path.state);
            }
        },
    })
    let codeToParse = `executeStep(${currentStep},`;
    if (type==='success' && successSteps === undefined){successSteps = []}
    if (type==='fail' && failureSteps === undefined){failureSteps = []}
    codeToParse+='{';
    if (successSteps) {
        codeToParse += `onSuccess: function(context){`;
        for (let step in successSteps) {
            codeToParse += generate(successSteps[step]).code.concat(';');
        }
        if (type==='success'){
            codeToParse += `executeStep(${stepToAdd});`;
        }
        codeToParse += `},\n`
    }
    if (failureSteps) {
        codeToParse += `onFailure: function(context){`;
        for (let step in failureSteps) {
            codeToParse += generate(failureSteps[step]).code.concat(';');
        }
        if (type==='fail'){
            codeToParse += `executeStep(${stepToAdd});`;
        }
        codeToParse += `},\n`
    }
    codeToParse = codeToParse+'})';
    pathASt.replaceWith(parse(codeToParse, {sourceType: 'script'}).program.body[0]);
    return ast;
}
