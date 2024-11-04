import React from "react";
import {Link} from "react-router-dom";
import "./index.css";
import goodImg from "../../../assets/recomend_good1.png";
class SameGood extends React.Component {
    
    render () {
        return (
            <div className="same_kind_good">
                <Link to="/">
                    <img src={goodImg} alt="" className="img"/>
                </Link>
                <div className="txt">极简 时尚岩板 茶几 品质升 极简 时尚岩板 茶几 品质升</div>
                
                

                <div className="price">¥ 3632</div>
            </div>
        )
    }
}



export default SameGood;