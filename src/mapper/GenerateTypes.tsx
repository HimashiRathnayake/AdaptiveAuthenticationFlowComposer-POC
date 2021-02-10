import * as type from "@babel/types";
import * as syntax from "./AdaptiveCodeSyntax";

export const createObjectExpressionWithProperty = (identifier:string, step:string) : type.ObjectExpression => {
    return type.objectExpression([createSuccessFailurePropertyWithStep(identifier, step)])
}

export const createSuccessFailurePropertyWithStep = (identifier:string, step:string) : type.ObjectProperty => {
    return type.objectProperty(
        type.identifier(identifier),
        type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
            [createExpressionStatement(step)]
        ))
    )
}

export const createObjectExpressionWithCondition = (identifier:string, condition:string) : type.ObjectExpression => {
    return type.objectExpression([createSuccessPropertyWithCondition(identifier, condition)])
}

export const createSuccessPropertyWithCondition = (identifier:string, condition:string) : type.ObjectProperty => {
    return type.objectProperty(
        type.identifier(identifier),
        type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
            [createIfStatement(condition)]
        ))
    )
}

export const createExpressionStatement = (step:string) : type.ExpressionStatement => {
    return type.expressionStatement(type.callExpression(type.identifier(syntax.stepExecutor), [type.numericLiteral(+step)]));
}

export const createExpressionStatementWithSuccess = (step:string, args:any) : type.ExpressionStatement=> {
    return type.expressionStatement(type.callExpression(type.identifier(syntax.stepExecutor),
        [type.numericLiteral(+step), type.objectExpression(
            [type.objectProperty(
                type.identifier(syntax.onSuccess),
                type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
                    [args]
                )))]
        )]
    ));
}

export const createVariableDeclarationForCondition = (condition:string, params?:any) : type.VariableDeclaration => {
    let parameters: any = type.arrayExpression([]);
    let variableNameForParameters = syntax.params;
    if (condition==="hasRole"){
        let roles = params.map((param:any)=>type.stringLiteral(param.value));
        parameters=type.arrayExpression(roles);
        variableNameForParameters = syntax.roles;
    }
    else if (condition==="isExceedInvalidAttempts"){
        parameters=type.numericLiteral(+params); variableNameForParameters = syntax.invalidAttemptsToStepUp;
    }
    return type.variableDeclaration(syntax.variable, [type.variableDeclarator(type.identifier(variableNameForParameters), parameters)])
}

export const createIfStatement = (condition:string) : type.IfStatement => {
    // return type.ifStatement(type.identifier(condition), type.blockStatement([]));
    return type.ifStatement(type.callExpression(type.identifier(condition), [type.identifier(syntax.context)]), type.blockStatement([]))
}

export const createIfStatementWithArguments = (condition:string, args:any) : type.IfStatement => {
    return type.ifStatement(type.callExpression(type.identifier(condition), [type.identifier(syntax.context)]), type.blockStatement([args]))
}