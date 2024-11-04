import React from "react";
import SameGood from "../SameKindGood";
import {Link} from "react-router-dom";

import "./index.css";
 
import goodImg from "../../../assets/recomend_good1.png";
class SameKind extends React.Component {

    constructor (props) {
        super(props)
        // console.log("sameGoodArr sameGoodArr")
        // console.log(props)
        // console.log("sameGoodArr sameGoodArr")
    }

    goDetailFn = (goodId)=> {
        window.location.href = "/productroomdetail?id=" + goodId;
    }
    render () {
        return (
            <div className="same_kind_con">
                {this.props.sameGoodArr.map((item, index)=>{
                    return (
                        
                        <div className="same_kind_good" key={index} onClick={()=>{this.goDetailFn(item.id)}}>
                            {/* <Link to={"/productroom/detail/" + item.id }>
                                <img src={goodImg} alt="" className="img"/>
                            </Link> */}

                            <div>
                                <img src={item.goodsImg} alt="" className="img"/>
                            </div>
                            <div className="txt">{item.product_title}</div>
                            <div className="price">¥ {item.price}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}







export default SameKind;