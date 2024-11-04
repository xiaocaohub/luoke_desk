import {connect} from "react-redux";
import Show from "./show";
var mapStateToProps = state=> {

    console.log("state")
    console.log(state)
    return {

    }
}

var mapDispatchToProps = dispatch=> {
    return {

    }
}


var Artist = connect(mapStateToProps, mapDispatchToProps)(Show);

export default Artist;