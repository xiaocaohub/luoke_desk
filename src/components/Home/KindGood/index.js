import React from "react";
import {Link} from "react-router-dom";
import "./index.css";

import goodImg from "../../../assets/recomend_good1.png";
class KindGood extends React.Component {
    render () {
        return (
            <li className="kind_good">
                
                <Link to="/">
                    <img src={goodImg} alt="" className="good_img"/>
                </Link>

                <div className="text_con">

                    <div className="txt">轻松俘获你的心</div>
                    <div className="price">¥16199</div>
                </div>
            </li>
        )
    }
}




export default KindGood;