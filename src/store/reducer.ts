import * as actionTypes from "./actionTypes"
import {ParseToAst} from "../Mapper/Parser";

const initialState: AstState = {
    changedFromVisualEditor: false,
    ast: ParseToAst(''),
}

const reducer = (
    state: AstState = initialState,
    action: AstAction
): AstState => {
    switch (action.type) {
        case actionTypes.SAVE_AST:
            return {
                ...state,
                changedFromVisualEditor: false,
                ast: action.ast,
            }
        case actionTypes.SAVE_AST_FROM_VISUAL_EDITOR:
            return  {
                ...state,
                changedFromVisualEditor: true,
                ast: action.ast
            }
    }
    return state
}

export default reducer

// import * as actionTypes from "./actionTypes"
//
// const initialState: StepState = {
//     steps: [],
// }
//
// const reducer = (
//     state: StepState = initialState,
//     action: StepAction
// ): StepState => {
//     switch (action.type) {
//         case actionTypes.ADD_STEP:
//             const newStep: IStep = {
//                 id: Math.random(), // not really unique
//                 title: action.step.title,
//                 position: state.steps.length + 1
//             }
//             return {
//                 ...state,
//                 steps: state.steps.concat(newStep),
//             }
//         case actionTypes.REMOVE_STEP:
//             const updatedSteps: IStep[] = state.steps.filter(
//                 step => step.id !== action.step.id
//             )
//             // const array=state.steps;
//             // const newA: IStep[] = array.filter(step=>step.position<2).concat(array.filter(step => step.id>2).map(step=>));
//             return {
//                 ...state,
//                 steps: updatedSteps,
//             }
//         case actionTypes.REMOVE_ALL_STEPS:
//             return {
//                 ...state,
//                 steps: [],
//             }
//     }
//     return state
// }
//
// export default reducer

