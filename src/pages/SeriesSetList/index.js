import {connect} from "react-redux";
import Show from "./show";
import {CHANGE_NAV_INDEX} from "../../actionType/common";

let mapStateToProps = state=> {
 
    return {
        state: {
            commonState: state.commonState
        }
    }
}


let mapDispatchToProps = dispatch=> {

    return {
        setNavIndexFn () {
            dispatch({type:CHANGE_NAV_INDEX, payload: 3})
        },
        hideSmallCartFn () {
            dispatch({type:"show_small_cart", payload: false})
        },
        totalCartGoodCountFn (goodCount) {
            dispatch({type:"change_good_count", payload: goodCount})
        }
    }
}

let SeriesSetList = connect(mapStateToProps, mapDispatchToProps)(Show);
export default SeriesSetList;