import React from "react";
import {shallowEqual, useSelector} from "react-redux";
import * as syntax from "./AdaptiveCodeSyntax";
import generate from "@babel/generator";
import {parse} from "@babel/parser";
import traverse from "@babel/traverse";
import { transform } from "@babel/core";
// import {generate} from "escodegen";

export function ParseToAst(value?:string) {
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

    //......................................cherow......................................................
    // const cherow = require("cherow");
    // let ast = cherow.parseScript(value);
    // console.log(ast);

    //......................................babel.......................................................
    if (value===undefined){
        value=''
    }
    try {
        return parse(value);
    }catch (e) {
        console.log(e);
        return ''
    }

}

export function GetRequest(){

    let request: boolean = false;
    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

    try{
        let count=0;
        traverse(ast, {
            VariableDeclarator(path: any){
                if (path.node.id.name === syntax.loginRequest){
                    request = true;
                }
            },
        })
    }
    catch(e){
        console.log(e);
    }

    return(request);
}

export function GetSuccessStep(ast : any, scope:any, parentPath:any, state:any){
    let successSteps: number[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onSuccess){
                successSteps.push(GetCallExpression(path.node, path.scope, path.parentPath, path.state));
                path.skip()
            }
        }
    }, scope, state, parentPath)
    return successSteps[0];
}

export function GetFailureStep(ast : any, scope:any, parentPath:any, state:any){
    let failSteps: number[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onFail){
                failSteps.push(GetCallExpression(path.node, path.scope, path.parentPath, path.state));
                path.skip()
            }
        }
    }, scope, state, parentPath)
    return failSteps.pop();
}

export function GetCallExpression(ast : any, scope:any, parentPath:any, state:any): any{
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

export function GetStepsFromAst(){

    const stepsArray: any[] = [];
    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

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
        console.log(stepsArray);
    }
    catch(e){
        console.log(e);
    }

    return(stepsArray);
}

export function GenerateCodeFromAst(): string|undefined{

    const ast: any = useSelector(
        (state: AstState) => {
            return state.ast
        },
        shallowEqual
    )

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
    }catch (e) {
        console.log(e);
    }
}

export function AddStepToEnd(step: string, ast: any): object|undefined{
    let pathASt:any;
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                pathASt = path
            }
            path.skip()
        }
    })
    console.log(pathASt)
    return;
}