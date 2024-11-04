import { combineReducers } from "redux";
import commonState from "./common";
import homeState from "./home";

import productRoomState from "./ProductRoom";

import productRoomDetailState from "./ProductRoomDetail";

import cartState from "./cart"
export default combineReducers({
    commonState,
    homeState,
    productRoomState,
    productRoomDetailState,


    cartState

})




