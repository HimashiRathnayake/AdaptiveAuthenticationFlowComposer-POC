import * as actionTypes from "../actionTypes"
import {ParseToAst} from "../../Mapper/Parser";

const initialState: AstState = {
    changedFromVisualEditor: false,
    ast: ParseToAst(''),
}

const astReducer = (
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

export default astReducer

// import * as actionTypes from "./actionTypes"
//
// const initialState: StepState = {
//     steps.ts: [],
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
//                 position: state.steps.ts.length + 1
//             }
//             return {
//                 ...state,
//                 steps.ts: state.steps.ts.concat(newStep),
//             }
//         case actionTypes.REMOVE_STEP:
//             const updatedSteps: IStep[] = state.steps.ts.filter(
//                 step => step.id !== action.step.id
//             )
//             // const array=state.steps.ts;
//             // const newA: IStep[] = array.filter(step=>step.position<2).concat(array.filter(step => step.id>2).map(step=>));
//             return {
//                 ...state,
//                 steps.ts: updatedSteps,
//             }
//         case actionTypes.REMOVE_ALL_STEPS:
//             return {
//                 ...state,
//                 steps.ts: [],
//             }
//     }
//     return state
// }
//
// export default reducer

