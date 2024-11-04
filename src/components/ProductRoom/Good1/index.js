import React from "react";
import {Link} from "react-router-dom";
import GoodImg from "../../../assets/recomend_good1.png";

import "./index.css";
class Good extends React.Component {
    constructor (props) {
        super(props)
        // console.log("good props")
        
        // console.log(props)
        // console.log("good props")
    }
    render () {
        return (
           
            <li>
                <Link to="/productroom/detail/1">
                    <img  src={GoodImg} className="good_img"/>
                </Link>
                <div className="text_con">
                  <div className="txt">{this.props.itemData.product_title}</div>
                  
                  <div className="price"><span className="unit">￥</span>{this.props.itemData.price}</div>
                </div>
            </li>
        )
    }
}




export default Good;