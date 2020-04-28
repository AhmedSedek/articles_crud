import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { login, signup } from "./reducers";

const reducer = combineReducers({ login, signup });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
