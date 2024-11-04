import {createStore, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import Reducer from "./reducer";

let store = new createStore(Reducer, applyMiddleware(thunk));

export default store;