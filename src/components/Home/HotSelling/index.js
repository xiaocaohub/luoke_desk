import React from "react";
import {Link} from "react-router-dom";
import {Row, Col, Carousel} from "antd";

import hotSellImg1 from "../../../assets/hot_sell_1.png";

import hotSellImg2 from "../../../assets/hot_sell_2.png";
import hotSellImg3 from "../../../assets/hot_sell_3.png";
import hotSellImg4 from "../../../assets/hot_sell_4.png";

import {setImgAutoHeightFn} from "../../../utils/imgAuto";
import hotTitleImg from "../../../assets/index_title_hot.png";
import "./index.css";
class HotSelling extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            currentIndex: 1,
            goodImgHeight: 0
        }

        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
    }
    componentDidMount () {
        this.loadImgHeightFn()
    }
    prev = (index)=> {
        this.img.prev()
    }
    next = ()=> {
        this.img.next()
    }
    onChange = (index)=> {
        let longLine = document.getElementById("longline");
        longLine.style.cssText="width:"+(index+1)*25+"%;" 
    }
    loadImgHeightFn = ()=> {
        let recommendGood = document.getElementById("hot_good");
        let goodImgHeight = setImgAutoHeightFn(recommendGood);
        this.setState({    
            goodImgHeight: goodImgHeight
        })
    }
    render () {
        return (
            <div className="hot_selling_con">
                    <div className="content_common_width">
                        <div className="title_con">
                            <div className="left">
                                <img src={hotTitleImg} alt=""/>
                            </div>

                            <Link to="/productroom" className="more_btn">搜索更多</Link>
                        </div>

                        <div className="hot_banner_con">
                            <div className="left_btn" onClick={this.prev}></div>
                            <div className="right_btn" onClick={this.next}></div>
                         
                            {/* <Carousel  afterChange={this.onChange} dots={false}    ref={dom=>{this.img=dom }}>
                                <div>
                         
                                    {this.props.hotSellArrData.length>0 && this.props.hotSellArrData.map((item, index)=>{
                                        if (index <= 3) {
                                            return (
                                                <div className="good_item" key={item.id} id="hot_good">
                                                    <Link to={"/productroom/detail/" + item.id} >   
                                                        <img src={item.coverImg} className="good_img" style={{height: this.state.goodImgHeight + "px", marginTop:-(this.state.goodImgHeight/2) + "px"}}/> 
                                                    </Link>
            
                                                    <div className="text_con">
                                                        <div className="txt">{item.product_title}</div>
                                                        <div className="price">¥{parseInt(item.price)}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <div>
                                    {this.props.hotSellArrData.length>0 && this.props.hotSellArrData.map((item, index)=>{
                                        if (4<= index && index <= 7) {
                                            return (
                                                <div className="good_item" key={item.id}>
                                                    <Link to="/">
                                                      
                                                        <img src={item.coverImg} className="good_img" style={{height: this.state.goodImgHeight + "px", marginTop:-(this.state.goodImgHeight/2) + "px"}}/> 
                                                    </Link>
            
                                                    <div className="text_con">
                                                        <div className="txt">{item.product_title}</div>
                                                        <div className="price">¥{parseInt(item.price)}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                
                                <div>
                                    {this.props.hotSellArrData.length>0 && this.props.hotSellArrData.map((item, index)=>{
                                        if (8 <= index && index <= 11) {
                                            return (
                                                <div className="good_item" key={item.id}>
                                                    <Link to="/">
                                
                                                        <img src={item.coverImg} className="good_img" style={{height: this.state.goodImgHeight + "px", marginTop:-(this.state.goodImgHeight/2) + "px"}}/> 
                                                    </Link>
            
                                                    <div className="text_con">
                                                        <div className="txt">{item.product_title}</div>
                                                        <div className="price">¥{parseInt(item.price)}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <div>
                                  
                                    {this.props.hotSellArrData.length>0 && this.props.hotSellArrData.map((item, index)=>{
                                      
                                      if (12 <= index && index <= 15) {
                                            return (
                                                <div className="good_item" key={item.id}>
                                                    <Link to="/">
                                                        <img src={item.coverImg} className="good_img" style={{height: this.state.goodImgHeight + "px", marginTop:-(this.state.goodImgHeight/2) + "px"}}/> 
                                                    </Link>
            
                                                    <div className="text_con">
                                                        <div className="txt">{item.product_title}</div>
                                                        <div className="price">¥{parseInt(item.price)}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </Carousel>  */}
                            
                            <Carousel  afterChange={this.onChange} dots={false}    ref={dom=>{this.img=dom }}>
                                <div>
                                    <div className="good_item"  id="hot_good">
                                        <Link to={"/productroomdetail?id=563"}  target="_blank" >   
                                            <img src={hotSellImg1} className="good_img"/> 
                                        </Link>

                                        <div className="text_con">
                                            <div className="txt"> 极简风格设计师款式蜗牛沙发LKS8873</div>
                                            <div className="price"> ¥24700</div>
                                        </div>
                                    </div>
                            
                                    <div className="good_item"  id="hot_good">
                                        <Link to={"/productroomdetail?id=635"}  target="_blank">   
                                            <img src={hotSellImg2} className="good_img"/> 
                                        </Link>

                                        <div className="text_con">
                                            <div className="txt"> 极简风格设计师款式云朵沙发S2208</div>
                                            <div className="price"> ¥8548</div>
                                        </div>
                                    </div>

                                    <div className="good_item"  id="hot_good">
                                        <Link to={"/productroomdetail?id=648"}  target="_blank">   
                                            <img src={hotSellImg3} className="good_img"/> 
                                        </Link>

                                        <div className="text_con">
                                            <div className="txt">极简风格设计师款式棉花糖沙发LKS8850</div>
                                            <div className="price"> ¥8686</div>
                                        </div>
                                    </div>

                                    
                                    <div className="good_item"  id="hot_good">
                                        <Link to={"/productroomdetail?id=645"}  target="_blank">   
                                            <img src={hotSellImg4} className="good_img"/> 
                                        </Link>

                                        <div className="text_con">
                                            <div className="txt"> 极简风格设计师款式皮埃蒙特沙发LKS8848</div>
                                            <div className="price"> ¥4232</div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel>

                            <div className="banner_line">
                                <span id="longline"></span>
                            </div>
                        </div>
                    </div>
       
            </div>
        )
    }
}




export default HotSelling;