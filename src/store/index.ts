import {applyMiddleware, CombinedState, createStore, Store} from "redux";
import {rootReducer} from "./reducers";
import thunk from "redux-thunk";

export const store: Store<CombinedState<{ astReducer: AstState; stepReducer: StepsState; }>, AstAction | StepAction> & {
    dispatch: DispatchType
} = createStore(rootReducer, applyMiddleware(thunk))