import {connect} from "react-redux";
import Show from "./show.js";
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


let Pay = connect(mapStateToProps, mapDispatchToProps)(Show);

export default Pay;