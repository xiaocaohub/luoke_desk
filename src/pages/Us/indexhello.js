import React,{useEffect, useState } from "react";
import {Row, Col} from "antd";
import bannerImg from "../../assets/us_banner.png";

import totalBanner from "../../assets/total_banner.png";

import vedioImg from "../../assets/rsw_pic.png";
import competeIcon1 from "../../assets/icon/service_cycle.png";
import competeIcon2 from "../../assets/icon/competence.png";
import flow from "../../assets/flow.png";
import VedioShadow from "../../components/Home/VedioShadow";
import SmallCart from "../../components/SmallCart";
import "./index.css";

import brandTitle1 from "../../assets/brand_title1.png";
import brandList1 from "../../assets/brand_list_1.png";
import brandList2 from "../../assets/brand_list_2.png";
import brandList3 from "../../assets/brand_list_3.png";
import coreCompetence from "../../assets/core_competence.png";
import productAdvantages from "../../assets/product_advantages.png";
import {scrollTopFn} from "../../utils/imgAuto";
import {setVedioHeightFn} from "../../utils/imgAuto";


import request from "../../api/request";
import {getStorageFn,setStorageFn} from "../../utils/localStorage";
class Show extends React.Component {
        constructor (props) {
            super(props)
            this.state = {
                currentVedioIndex: 0,
                // vedioShadowFlag: false,
                vedioHeight: 0,
                
                vedioSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E5%8E%9F%E5%88%9B%E7%B3%BB%E5%88%97.mp4"
            }
        } 


        componentDidMount () {
            let _this = this;
            setTimeout(()=> {
                scrollTopFn()
            
                _this.autoVedioHeightFn()
               
                _this.play()
                _this.totalCartGoodCountFn()
            }, 2000) 
        }
        play = ()=> {
         
            const video = document.getElementById("bigvideo");
            video.autoplay = true;
            video.style.outline = "none";
        }
        closeVedioFn = ()=> {
            this.setState({
                vedioShadowFlag: false
            })
        }

        autoVedioHeightFn = ()=> {
            let usVideo = document.getElementById("us_video");
            let vedioHeight = setVedioHeightFn(usVideo);
            console.log("vedioHeight", vedioHeight)
            this.setState({
                vedioHeight: vedioHeight
            })
        }

        // 统计购物车数量
        totalCartGoodCountFn = ()=> {
        
            let _this = this;
            let formData = new FormData();
            let token = getStorageFn("token");
            formData.append("api", "app.cart.index");    
            formData.append("accessId", token);  
            formData.append("storeId", 1);
            formData.append("storeType", 6);
            request({
                url: "/api/gw",         
            
                method: "POST",    
            
            
                data: formData
            }).then((res)=> {
                let resData = res.data.data.data;
                _this.setState({
                
                    cartArr: resData
                
                },function () {
                    let cartArr = _this.state.cartArr;
                    let length = cartArr.length;
                    _this.props.totalCartGoodCountFn(length)
                })
                setStorageFn("cartArr", resData)
            })
        }
        render () {
            return (
                <div className="us_page_con">
                    <img src={bannerImg} className="banner_img"/>
                    <div>
                        <div className="content_common_width">
                            <div className="intro_text">
                                <div className="text_con">
                                    <div className="title">
                                        <span>珞珂是谁</span>

                                        <div className="line"></div>
                                    </div>
    
                                    <div className="txt">
                                        <p>LUOCKOO | 珞珂家居创立于2022年，是深圳新崛起的一线国潮家居软装平台，致力于提供更懂年轻人，更符合国人审美，更舒适有品的家居解决方案。</p>
                                        <p>珞珂家居以互联网软装平台业务为核心，依靠互联网与大数据技术，以线上化的形式连接业主和软装企业，产品交易、交易保障、质量监督、评价反馈等多个角度，为软装行业参与者提供渗透到软装各环节的服务。</p>
                                        
                                    </div>
                                </div>
    
                                {/* <div className="video_con"  onClick={this.play}>
                                 
                                    <img src={vedioImg} alt=""/>
                                    <div className="play_btn" onClick={this.play}></div>
                                </div> */}


                                <div className="video_con"  id="us_video">
                                 
                                    <video  className="big_video" id="bigvideo" src="https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E5%8E%9F%E5%88%9B%E7%B3%BB%E5%88%97.mp4" controls     muted   
                                       
                                       style={{height: this.state.vedioHeight + "px"}}
                                    ></video>
                                   
                                </div>
                          </div>
    
                            {/* <div className="brand_con">
                                <div className="brand_title_con">
    
                                    <div className="tit">BRAND POSITIONING</div>
                                    <div className="title">品牌定位</div>
                                    <div className="line"></div>
                                </div>
    
                                <ul className="brand_list">
                                    <li>
                                        <div className="icon"></div>
                                        <div className="title">目标客群</div>
                                        <div className="line"></div>
                                        <ul className="text_list">
                                            <li>
                                                <div className="txt">Y/Z</div>
                                                <div className="txt">世代</div>
                                            </li>
                                            <li>
                                                <div className="txt">新中产</div>
                                                <div className="txt">群体</div>
                                            </li>
                                        </ul>
                                        <div className="tit">
                                            <span>追求原价比</span>
                                            <span></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <div className="title">产品定位</div>
                                        <div className="line"></div>
                                        <ul className="text_list">
                                            <li>
                                                <div className="txt">国际潮流</div>
                                                <div className="txt">设计产品</div>
                                            </li>
                                            <li>
                                                <div className="txt">国内设计</div>
                                                <div className="txt">原创产品</div>
                                            </li>
                                        </ul>
                                        <div className="tit">
                                            <span>国潮元素 中国制造</span>
                                            <span></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <div className="title">价格定位</div>
                                        <div className="line"></div>
                                        <ul className="text_list">
                                            <li>
                                                <div className="txt">大平层</div>
                                                <div className="txt">别墅</div>
                                            </li>
                                            <li>
                                                <div className="txt">大户型</div>
                                                <div className="txt">豪宅</div>
                                            </li>
                                            <li>
                                                <div className="txt">小户型</div>
                                                <div className="txt">轻奢</div>
                                            </li>
                                        </ul>
                                        <div className="tit">
                                            <span>100-300m²</span>
                                            <span>整屋零售6-20W+</span>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>




                    <div className="brand_con">
                      
                        <div className="content_common_width">
                                <img src={brandTitle1} alt="" className="title_img"/>
                                <ul className="brand_list">
                                    <li>
                                        <img src={brandList1} alt="" />
                                    </li>
                                    <li>
                                        <img src={brandList2} alt="" />
                                    </li>
                                    <li>
                                        <img src={brandList3} alt="" />
                                    </li>
                                </ul>
                        </div>
                       
                    </div>

                    <div className="brand_total_con">                       
                   
                        <div className="content_common_width">
                            <ul className="total_list">
                                <li>
                                    <div className="title">10年</div>
                                    <div className="tit">深圳</div>
                                    <div className="tit">品牌</div>
                                </li>
                                <li>
                                    <div className="title">1000000+</div>
                                    <div className="tit">用户</div>
                                    <div className="tit">至爱之选</div>
                                </li>
                                <li>
                                    <div className="title">20000m²</div>
                                    <div className="tit">深惠国际化</div>
                                    <div className="tit">生产基地</div>
                                </li>
                                <li>
                                    <div className="title">2000+SKU</div>
                                    <div className="tit">高颜高品</div>

                                    <div className="tit">高质量产品</div>
                                </li>
                            </ul>
                        </div>
                  
                    </div>

                    <div className="compete_con">

                      
                        <div className="content_common_width">                           
                            <img src={coreCompetence} alt="" />
                        </div>
                       
                    </div>


                    <div className="product_text_con">
                        
                        <div className="content_common_width">
                             <img src={productAdvantages} alt=""/>
                        </div>
                       
                    </div>
                    {/* {this.state.vedioShadowFlag && <VedioShadow index={this.state.currentVedioIndex} closeFn={this.closeVedioFn}/>} */}
                    
                    {this.props.state.commonState.showCartFlag && <SmallCart hideSmallCart={this.props.hideSmallCartFn} totalCartGoodCountFn={this.totalCartGoodCountFn}></SmallCart>}
                </div>
            )
        }

    

}



export default Show;