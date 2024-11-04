import {connect} from "react-redux";
import Show from "./show";
import {getGoodInfoAction} from "../../actions/ProductRoomDetail";
import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import {CHANGE_NAV_INDEX} from "../../actionType/common";
let mapStateToProps = state=> {
    // console.log("mapState detail")
    // console.log(state)
    // console.log("mapState detail")
    return {
        productRoomDetailState: state.productRoomDetailState,
        state: {
            commonState: state.commonState
        }
    }
}

let mapDispatchToProps = dispatch=> {
    return {

        setNavIndexFn () {
            dispatch({type:CHANGE_NAV_INDEX, payload: 2})
        },
        
        getGoodInfoFn (goodId) {
            let _this = this;    
            let formData = new FormData();
            let option = {"brandId":"","minPrice":"","maxPrice":""};
            let token = getStorageFn("token");
            formData.append("api", "app.product.productDetails"); 
            formData.append("accessId", token);         
            formData.append("storeId", 1);
            formData.append("storeType", 6);
            formData.append("productId", goodId);       
            let action = getGoodInfoAction(formData)(dispatch)
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

let ProductRoomDetail = connect(mapStateToProps, mapDispatchToProps)(Show);





export default ProductRoomDetail;