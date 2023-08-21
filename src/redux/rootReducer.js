import { combineReducers } from "redux";
import { fontReducer } from "./font";
import { verseReducer } from "./books";

export const rootReducers = combineReducers({
    fontReducer,
    verseReducer
})