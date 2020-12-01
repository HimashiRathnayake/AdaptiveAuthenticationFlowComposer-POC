import * as type from "@babel/types";
import * as syntax from "./AdaptiveCodeSyntax";

export const createObjectExpressionWithProperty = (identifier:string, step:string) => {
    return type.objectExpression([createSuccessFailurePropertyWithStep(identifier, step)])
}

export const createSuccessFailurePropertyWithStep = (identifier:string, step:string) => {
    return type.objectProperty(
        type.identifier(identifier),
        type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
            [createExpressionStatement(step)]
        ))
    )
}

export const createObjectExpressionWithCondition = (identifier:string, condition:string) => {
    return type.objectExpression([createSuccessPropertyWithCondition(identifier, condition)])
}

export const createSuccessPropertyWithCondition = (identifier:string, condition:string) => {
    return type.objectProperty(
        type.identifier(identifier),
        type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
            [createIfStatement(condition)]
        ))
    )
}

export const createExpressionStatement = (step:string) => {
    return type.expressionStatement(type.callExpression(type.identifier(syntax.stepExecutor), [type.numericLiteral(+step)]));
}

export const createIfStatement = (condition:string) => {
    return type.ifStatement(type.identifier(condition), type.blockStatement([]));
}