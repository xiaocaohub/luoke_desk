import {SET_USER_INFO} from "../actionType/common";
let defaultState = {
    userInfo: {
        province: "",
        city: "",
        
        area: "",
        detailAdress: "",
        recipient: "", 
        phone: "",
        remark: ""
    }
}



function cartReducer (state=defaultState, action) {
    // console.log("reducer")
    // console.log(action)
    let {type, payload} = action;
    let newState = JSON.parse(JSON.stringify(state));

    if (type == SET_USER_INFO) {
        newState.userInfo = payload;        
        return newState;
    }
    
    return state;
}

export default cartReducer;