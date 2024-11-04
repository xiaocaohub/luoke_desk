import React from "react";
import {connect} from "react-redux";
import Show from "./show";
import {CHANGE_NAV_INDEX} from "../../actionType/common";
var mapStateToProps = (state)=> {
    
    return {
        state: {
            commonState: state.commonState
        }
    }
}
var mapDispatchToProps = (dispatch)=> {
    return {   
        setNavIndexFn () {
            dispatch({type:CHANGE_NAV_INDEX, payload: 0})
        },    
        hideSmallCartFn () {
            
            dispatch({type:"show_small_cart", payload: false})
        },
        totalCartGoodCountFn (goodCount) {
            dispatch({type:"change_good_count", payload: goodCount})
        }
    }
}
const Home = connect(mapStateToProps, mapDispatchToProps)(Show);

export default Home;