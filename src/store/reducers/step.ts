import * as actionTypes from "../actionTypes"

const initialState: StepsState = {
    steps: [{
        id:"1",
        options: ["basic"]
    }],
}

const stepReducer = (
    state: StepsState = initialState,
    action: StepAction
): StepsState => {
    switch (action.type) {
        case actionTypes.ADD_FACTOR_TO_STEP:
            let index=state.steps.map(step=>step.id).indexOf(action.step);
            if(index===-1) {
                return {
                    ...state,
                    steps: state.steps.concat([{id: action.step, options: action.factors}]),
                }
            }else{
                return {
                    ...state,
                    steps: state.steps.map((item, id) => {
                        if (id !== index) {
                            return item
                        }
                        return {
                            ...item,
                            options: action.factors
                        }
                    })
                }
            }
    }
    return state
}

export default stepReducer
