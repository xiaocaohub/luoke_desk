import {CHECK_SUPPLY_PRICE, SWITCH_SUPPLY_PRICE, CHANGE_NAV_INDEX} from "../actionType/common";
let defaultState = {
    showCartFlag: false, 

    showSupplyPriceFlag: false, 
    
    showSupplyPriceSwitchFlag: false, 
    goodCount: 0, 
    navIndex: 0  
}
function commonReducer (state = defaultState, action) {

    // console.log("action")
    // console.log(action)
    // console.log("action")
    const {type, payload} = action;

    if (type=="show_small_cart") {
        let newState = JSON.parse(JSON.stringify(state));
        newState.showCartFlag = payload;
        return newState;
    }

    if (type== "change_good_count") {
        let newState = JSON.parse(JSON.stringify(state));
        newState.goodCount = payload;
    
        return newState; 
    }
    if (type == CHECK_SUPPLY_PRICE) {

        let newState = JSON.parse(JSON.stringify(state));
        newState.showSupplyPriceFlag = payload;
        return newState;
    }





    if (type == SWITCH_SUPPLY_PRICE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.showSupplyPriceSwitchFlag = payload;
        return newState;
    }

    if (type == CHANGE_NAV_INDEX) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.navIndex = payload;
        return newState;
    }
    return state;
}



export default commonReducer;