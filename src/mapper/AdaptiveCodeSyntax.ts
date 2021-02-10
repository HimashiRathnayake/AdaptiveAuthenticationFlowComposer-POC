export const begin = "var onLoginRequest = function(context){executeStep(1);}"
export const loginRequest = "onLoginRequest"
export const stepExecutor = "executeStep"
export const onSuccess = "onSuccess"
export const onFail = "onFail"
export const context = "context"
export const params = "params"
export const variable = "var"
export const roles = "rolesToStepUp"
export const invalidAttemptsToStepUp = "invalidAttemptsToStepUp"
export const hasRolesDefaultVar = "hasRole"
export const user = "user"
export const currentKnownSubject = "currentKnownSubject"

export const getConditionSyntax = (condition:string) => {
    let code = `var ${condition}= function (context){\n`;
    if (condition === "hasRole") {code+= "var user = context.currentKnownSubject;\nreturn hasAnyOfTheRoles(user, rolesToStepUp);\n";}
    else if (condition === "isExceedInvalidAttempts") {code+=
        "var failedLoginAttemptsBeforeSuccessClaim= 'http://wso2.org/claims/identity/failedLoginAttemptsBeforeSuccess';" +
        "var user = context.steps[1].subject;\n" +
        "   if (user.localClaims[failedLoginAttemptsBeforeSuccessClaim] >= invalidAttemptsToStepUp) {\n" +
        "       return true;\n" +
        "   } else {\n" +
        "       return false;\n" +
        "   }"}
    else {code+= "//You can define and return the condition from here\n\n";}
    code+="};";
    return code;
}

