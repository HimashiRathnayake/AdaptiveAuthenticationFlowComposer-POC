import * as actions from "./actionTypes"

export const saveAst = (ast: Object) => {
    const action: AstAction = {
        type: actions.SAVE_AST,
        ast,
    }
    return simulate(action)
}

export const saveAstFromVisualEditor = (ast: Object) => {
    const action: AstAction = {
        type: actions.SAVE_AST_FROM_VISUAL_EDITOR,
        ast,
    }
    return simulate(action)
}

export const saveStep = (step:string, factors:any[]) => {
    const action: StepAction = {
        type: actions.ADD_FACTOR_TO_STEP,
        step,
        factors
    }
    return simulate(action)
}

export const shiftSaveStep = (step:string, factors:any[]) => {
    const action: StepAction = {
        type: actions.SHIFT_ADD_FACTORS_TO_STEP,
        step,
        factors
    }
    return simulate(action)
}

export const setUseSubjectFromStep = (step:any) => {
    const action: StepAction = {
        type: actions.CHANGE_SUBJECT_FROM_STEP,
        step,
    }
    return simulate(action)
}

export const setUseAttributesFromStep = (step:any) => {
    const action: StepAction = {
        type: actions.CHANGE_ATTRIBUTES_FROM_STEP,
        step,
    }
    return simulate(action)
}

export const simulate = (action: AstAction|StepAction) => {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}