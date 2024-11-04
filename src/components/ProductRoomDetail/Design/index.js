import React from "react";
import {Carousel, Checkbox } from "antd";
import {Link} from "react-router-dom";

import "./index.css";
import SameGood from "../SameKindGood";
import addIcon from "../../../assets/icon/plus.png";

import designImg from "../../../assets/recomend_good1.png";
class Design extends React.Component {
    prev = (index)=> {
  
        this.img.prev()
    }

    next = ()=> {
        this.img.next()
    }
    onChange = (index)=> {
       // console.log(index)
    }

    selectGoodFn (e) {
        console.log(e)
    }
    render () {
        return (
            <div className="design_con">
                {/* <SameGood></SameGood> */}

                <div className="same_kind_good">
                    <Link to="/">
                        <img src={designImg} alt="" className="img"/>
                    </Link>
                    <div className="txt">极简 时尚岩板 茶几 品质升 极简 时尚岩板 茶几 品质升</div>
                    
                    

                    <div className="price">¥ 3632</div>
                </div>

                <img src={addIcon} alt="" className="add_icon"/>
                <div className="banner_con">
                    <div className="small_left" onClick={this.prev}></div>
                    <Carousel afterChange={this.onChange} ref={dom=>{this.img=dom }}> 
                    
                        <div className="good_list">        
                            <div className="design_good">
                                <Link to="/">

                                    <img alt="" src={designImg} className="img"/>
                                </Link>
                                <div className="txt">极简 时尚岩板 茶几 品质极简 时尚岩板 茶几 品质</div>
                                <Checkbox onChange={this.selectGoodFn} className="select_good"></Checkbox>
                                <div className="price">¥ 3632</div>
                            </div>
                           
                            <div className="design_good">
                                <Link to="/">
                                    <img alt="" src={designImg} className="img"/>
                                </Link>
                                <div className="txt">极简 时尚岩板 茶几 品质极简 时尚岩板 茶几 品质</div>
                                
                                
                                <Checkbox onChange={this.selectGoodFn} className="select_good"></Checkbox>
                                <div className="price">¥ 3632</div>
                            </div>


                            <div className="design_good">
                                <Link to="/">
                                    <img alt="" src={designImg} className="img"/>
                                </Link>
                                <div className="txt">极简 时尚岩板 茶几 品质极简 时尚岩板 茶几 品质</div>
                                <Checkbox onChange={this.selectGoodFn} className="select_good"></Checkbox>
                                <div className="price">¥ 3632</div>
                            </div>
                        </div>

                       

                        <div className="good_list">
                            <div className="design_good">
                                <Link to="/">
                                    <img alt="" src={designImg} className="img"/>
                                </Link>
                                <div className="txt">极简 时尚岩板 茶几 品质极简 时尚岩板 茶几 品质</div>
                                <Checkbox onChange={this.selectGoodFn} className="select_good"></Checkbox>
                                <div className="price">¥ 3632</div>
                            </div>
                        </div>
                        <div className="good_list">
                            <div className="design_good">
                                <Link to="/">
                                    <img alt="" src={designImg} className="img"/>
                                </Link>
                                <div className="txt">极简 时尚岩板 茶几 品质极简 时尚岩板 茶几 品质</div>
                                <Checkbox onChange={this.selectGoodFn} className="select_good"></Checkbox>
                                <div className="price">¥ 3632</div>
                            </div>
                        </div>
                       
                          
                        <div className="good_list">
                            <div className="design_good">
                                <Link to="/">
                                    <img alt="" src={designImg} className="img"/>
                                </Link>
                                <div className="txt">极简 时尚岩板 茶几 品质极简 时尚岩板 茶几 品质</div>
                                <Checkbox onChange={this.selectGoodFn} className="select_good"></Checkbox>
                                <div className="price">¥ 3632</div>
                            </div>
                        </div>
                    </Carousel>
                    <div className="small_right" onClick={this.next}></div>
                </div>

                <div className="total_con">
                    <div className="total_count">已选中1个配件</div>
                    <div className="total_money">组合价 
                        <span className="unit">¥</span>
                        <span className="total">1000</span>
                    </div>
                    <div className="buy_btn">加入购物车</div>
                </div>
            </div>
        )
    }
}


export default Design;