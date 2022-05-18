import { combineReducers } from "redux";
import { amountReducer} from "./amountReducer";
import { textReducer } from "./textReducer";

export const reducers = combineReducers({
    amount:amountReducer,
    textReducer
})



