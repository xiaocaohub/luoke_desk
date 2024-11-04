import React from "react";
import {Link} from "react-router-dom";
import GoodImg from "../../../assets/recomend_good1.png";

import "./index.css";

class Good extends React.Component {
    constructor (props) {
        super(props)
        console.log("props good")
        console.log(props)
        console.log("props good")
    }
    render () {
        return (

            <li className="good">
                <Link to={"/productroom/detail/" + this.props.styleGood.id}>        
                    <img src={this.props.styleGood.coverImg} alt="" className="good_img"/>
                </Link>  
                <div className="text">{ this.props.styleGood.product_title }</div>
            </li>
        )
    }
}






export default Good;