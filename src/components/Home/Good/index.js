import React from "react";
import {Link} from "react-router-dom";
import goodImg from "../../../assets/recomend_good1.png";

import {setImgAutoHeightFn} from "../../../utils/imgAuto";
import "./index.css";
class Good extends React.Component {    
    constructor (props) {
        super(props)
        this.state = {
            goodImgHeight: 0
        }
    }
    componentDidMount () {
        this.loadImgHeightFn()
    }
    loadImgHeightFn = ()=> {
     
        let recommendGood = document.getElementById("recommend_good");
        let goodImgHeight = setImgAutoHeightFn(recommendGood);
        this.setState({
            
            goodImgHeight: goodImgHeight
        })
    }
    render () {
        return (
            <div className="recommend_good" id="recommend_good">
                <Link to={"/productroomdetail?id=" + this.props.goodInfo.id} target="_blank">
                    {/* <img src={this.props.goodInfo.coverImg} alt="" className="good_img" style={{height: this.state.goodImgHeight + "px"}}/> */}
                    <img src={this.props.goodInfo.coverImg} alt="" className="good_img"/>
                </Link>
                <div className="good_bottom">
                    <div className="text_con">
                        
                        <div className="txt">{this.props.goodInfo.product_title}</div>
                        <div className="price">
                            <span className="unit">¥ </span>{parseInt(this.props.goodInfo.price)}
                        </div>
                    </div>

                    {/* <div className="cart_btn"></div> */}
                    <Link to={"/productroom/detail/" + this.props.goodInfo.id} target="_blank" className="cart_btn"></Link>

                </div>
                <div className="line">
                    <span></span>
                </div>
            </div>
        )
    }
}

export default Good;