import React from "react";
import {Link} from "react-router-dom";
import "./index.css";
import goodImg from "../../../assets/home_tuijian_1.png";
import bigGoodImg from "../../../assets/recomend_good1.png";

import {setImgAutoHeightFn} from "../../../utils/imgAuto";
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
            <li className="recommende_good" id="recommend_good">
                <Link to={this.props.goodInfo?("/productroomdetail?id=" + this.props.goodInfo.id):"/"} className="img" target="_blank">
                    {/* <img src={this.props.goodInfo?this.props.goodInfo.coverImg:""} alt="" className="small_img" style={{height: this.state.goodImgHeight + "px"}}/> */}
                    <img src={this.props.goodInfo?this.props.goodInfo.coverImg:""} alt="" className="small_img"/>
                    {/* <img src={bigGoodImg} alt="" className="big_img"/> */}
                </Link>
                <div className="text_bottom">
                    <div className="title">{this.props.goodInfo?this.props.goodInfo.product_title:""}</div>
                    <div className="price">
                        <span>￥</span>{this.props.goodInfo?this.props.goodInfo.price:""}
                    </div>
                    <Link to={this.props.goodInfo?("/productroomdetail?id=" + this.props.goodInfo.id):""} className="but_btn" target="_blank">GO</Link>
 
                </div>
            </li>
        )
    }
}


export default Good;