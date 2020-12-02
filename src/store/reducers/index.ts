import {combineReducers} from "redux";
import astReducer from "./ast";
import stepReducer from "./step";

export const rootReducer = combineReducers({
    astReducer,
    stepReducer
})