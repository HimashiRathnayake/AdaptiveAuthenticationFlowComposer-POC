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

export const simulate = (action: AstAction) => {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}


// import * as actions from "./actionTypes"
//
// export function add(step: IStep) {
//     const action: StepAction = {
//         type: actions.ADD_STEP,
//         step,
//     }
//     return simulate(action)
// }
//
// export function remove(step: IStep) {
//     const action: StepAction = {
//         type: actions.REMOVE_STEP,
//         step,
//     }
//     return simulate(action)
// }
//
// export function removeAll() {
//     const action: StepsAction = {
//         type: actions.REMOVE_ALL_STEPS
//     }
//     return simulate2(action)
// }
//
// export function simulate(action: StepAction) {
//     return (dispatch: DispatchType) => {
//         setTimeout(() => {
//             dispatch(action)
//         }, 500)
//     }
// }
//
// export function simulate2(action: StepsAction) {
//     return (dispatch: DispatchType2) => {
//         setTimeout(() => {
//             dispatch(action)
//         }, 500)
//     }
// }
