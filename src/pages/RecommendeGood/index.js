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
            dispatch({type:CHANGE_NAV_INDEX, payload: 1})
        },    
        hideSmallCartFn () {
               dispatch({type:"show_small_cart", payload: false})
        },
        totalCartGoodCountFn (goodCount) {
            console.log("totalCartGoodCountFn")
            console.log(goodCount)

            dispatch({type:"change_good_count", payload: goodCount})
        }
    }
}

const RecommendeGood = connect(mapStateToProps, mapDispatchToProps)(Show);

export default RecommendeGood;