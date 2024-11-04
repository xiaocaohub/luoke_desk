import React from "react";
import {Link} from "react-router-dom";
import goodImg from "../../../assets/recomend_good1.png";

import {setImgAutoHeightFn} from "../../../utils/imgAuto";
import "./index.css";
class StyleGood extends React.Component {    
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
     
        let recommendGood = document.getElementById("style_good");
        let goodImgHeight = setImgAutoHeightFn(recommendGood);
        this.setState({
            
            goodImgHeight: goodImgHeight
        })
    }
    render () {
        return (

            <div className="style_good" id="style_good">
                <Link to={"/productroomdetail?id=" + this.props.styleGood.id } target="_blank">
                    {/* <img src={this.props.styleGood.coverImg} alt="" className="good_img" style={{height: this.state.goodImgHeight + "px"}}/> */}
                    <img src={this.props.styleGood.coverImg} alt="" className="good_img" />
                </Link>
                <div className="good_bottom">
                    <div className="text_con">         
                        <div className="txt">{this.props.styleGood.product_title}</div>
                        <div className="price">
                            <span className="unit">¥ </span>{parseInt(this.props.styleGood.price)}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default StyleGood;