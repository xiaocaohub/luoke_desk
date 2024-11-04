import React from "react";
import {Link} from "react-router-dom";
import {Icon} from "antd";

import { HeartOutlined   } from '@ant-design/icons';
import "./index.css";
import goodImg from "../../../assets/recomend_good1.png";

class Good extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className="series_good">
                <Link to={"/productroomdetail?id=" + this.props.goodItem.id} target="_blank">
                    <img src={this.props.goodItem.coverImg} alt="" className="good_img"/>
                </Link>
                <div className="text_con">
                    <div className="txt">{this.props.goodItem.product_title}</div>
                    
                    <div className="price"><span className="unit">￥</span>{this.props.goodItem.price}</div>
                </div>
                {/* <ul className="btn_group">
                    <li>
                       
                       <HeartOutlined className="collect_icon"/>加入收藏夹
                    </li>
                    <li>进入系列集</li>
                </ul> */}



                <ul className="btn_group">
                    <li className="item_btn"><Link to={"/serieslist?id=" + this.props.goodItem.brand_id} target="_blank">进入系列集</Link></li>  
                    <li className="item_btn"><Link to={"/productroomdetail?id=" + this.props.goodItem.id} target="_blank">立即购买</Link></li> 
                </ul>  
            </div>
        )
    }
}






export default Good;