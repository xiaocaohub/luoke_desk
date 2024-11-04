let defaultState = {
    //goodInfo: {}
}

function productRoomDetailReducer (state=defaultState, action) {
    // console.log("productRoomDetailReducer", action)
    let {type, payload} = action;
    if (type==="set_good_info") {
        let newState = JSON.parse(JSON.stringify(state));
        
        newState.goodInfo = payload;
        return newState;
    }

    return state;
}








export default productRoomDetailReducer;