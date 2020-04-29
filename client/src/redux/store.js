import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { article, login, signup } from "./reducers";

const reducer = combineReducers({ login, signup, article });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
