import * as actionTypes from "../actionTypes"
import {ParseToAst} from "../../mapper/Parser";
import * as syntax from "../../mapper/AdaptiveCodeSyntax";

const initialState: AstState = {
    changedFromVisualEditor: false,
    ast: ParseToAst(syntax.begin),
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

export default astReducer;