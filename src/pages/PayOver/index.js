import {connect} from "react-redux";
import Show from "./show";
let mapStateToProps = state=> {
    return {
        state: {

            commonState: state.commonState
        }
    } 
}
let mapDispatchToProps = dispatch=> {
    return {

    }
}

let PayOver = connect(mapStateToProps, mapDispatchToProps)(Show);
export default PayOver;