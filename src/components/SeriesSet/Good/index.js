import React from "react";
import {Link} from "react-router-dom";
import "./index.css";
 
import goodImg from "../../../assets/recomend_good1.png";

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
        let recommendGood = document.getElementById("good");
        
        let goodImgHeight = setImgAutoHeightFn(recommendGood);
        this.setState({      
            goodImgHeight: goodImgHeight
        })
    }
    render () {
        return (

            <li className="good" id="good">
            
                <Link to={ "/serieslist?id=" + this.props.goodInfo.brand_id } target="_blank">         
                    <img src={this.props.goodInfo.brand_pic} alt="" className="good_img" style={{height: this.state.goodImgHeight + "px"}} />
                </Link>

                <div className="title">{this.props.goodInfo.brand_name}</div>
                <div className="txt">{this.props.goodInfo.brand_introduce}</div>
                <div className="total">在售商品 { this.props.goodInfo.goodsCount} 款</div>
            </li>
        )
    }
}



export default Good;