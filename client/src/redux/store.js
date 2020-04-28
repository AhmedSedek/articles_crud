import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import login from "./reducers";

const reducer = combineReducers({login});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
