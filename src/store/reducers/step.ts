import * as actionTypes from "../actions/actionTypes"

const initialState: StepsState = {
    steps: [{
        id: 1,
        options: ["basic"]
    }],
    useSubjectFrom: 1,
    useAttributesFrom: 1
}

const stepReducer = (
    state: StepsState = initialState,
    action: StepAction
): StepsState => {

    switch (action.type) {

        case actionTypes.ADD_FACTOR_TO_STEP:
            let index=state.steps.map(step=>step.id).indexOf(+action.step);
            if(index===-1) {
                return {
                    ...state,
                    steps: state.steps.concat([{id: +action.step, options: action.factors}]),
                }
            }else if(action.factors?.length===0){
                return {
                    ...state,
                    steps: state.steps.filter((step)=> {
                        return step.id !== action.step
                    }),
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

        case actionTypes.SHIFT_ADD_FACTORS_TO_STEP:
            let stepIndex = action.step;
            return {
                ...state,
                steps: state.steps.map((item) => {
                    if (item.id < stepIndex) {
                        return item
                    } else {
                        return {
                            ...item,
                            id: item.id + 1
                        }
                    }
                }).concat([{id: stepIndex, options: action.factors}])
            }

        case actionTypes.CHANGE_SUBJECT_FROM_STEP:
            return {
                ...state,
                useSubjectFrom: action.step
            }

        case actionTypes.CHANGE_ATTRIBUTES_FROM_STEP:
            return{
                ...state,
                useAttributesFrom: action.step
            }

    }
    return state
}

export default stepReducer
