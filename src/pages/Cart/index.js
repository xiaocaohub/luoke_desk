import {connect} from "react-redux";
import Show from "./show";
import {setUserInfoAction} from "../../actions/cart";

let mapStateToProps = state=> {
    
    return {
        state: {
            commonState: state.commonState,
            cartState: state.cartState
        }
    }
}

let mapDispatchToProps = dispatch=> {

    return {
        hideSmallCartFn () {
            dispatch({type:"show_small_cart", payload: false})
        },
        changeInfo (userInfo) {
           
            let action = setUserInfoAction(userInfo);
            dispatch(action)
        },

        totalCartGoodCountFn (goodCount) {
            dispatch({type:"change_good_count", payload: goodCount})
        }
    }
}


let Cart = connect(mapStateToProps, mapDispatchToProps)(Show);
export default Cart;