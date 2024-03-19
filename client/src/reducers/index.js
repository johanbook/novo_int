import { combineReducers } from "redux";
import documentReducer from "./documentReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
    document: documentReducer,
    error: errorReducer,
    auth: authReducer
})