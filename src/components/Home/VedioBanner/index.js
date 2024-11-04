import React from "react";
import {Row, Col} from "antd";
import {Link} from "react-router-dom";

import VedioShadow from "../VedioShadow";
import "./index.css";
 
import vedioImga from "../../../assets/vedio_list1.png";
import playIcon from "../../../assets/play.png";

class VedioBanner extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            vedioHeight: 0,
            vedioShadowFlag: false,
            currentVedioIndex: 0,
            vedioList: [
                {
                    id: 0,
                    imgSrc: require("../../../assets/vedio_list1.png"),
                    // vedioSrc: "../../../assets/big_vedio1.mp4",
                    vedioSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E5%8E%9F%E5%88%9B%E7%B3%BB%E5%88%97.mp4",
                    txt: "一分钟了解原创系列",
                    total: "9.5w"
                },
                {
                    id: 1,
                    imgSrc: require("../../../assets/vedio_list2.png"),
                    // vedioSrc: "../../../assets/big_vedio2.mp4",
                    vedioSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E4%B8%87%E7%89%A9%E7%B3%BB%E5%88%97.mp4",
                    txt: "一分钟了解万物系列",
                    total: "2.3w"
                },
                {
                    id: 2,
                    imgSrc: require("../../../assets/vedio_list3.png"),


                    // vedioSrc: "../../../assets/big_vedio3.mp4",
                    vedioSrc: " https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E8%BD%AF%E5%BA%8A%E4%B8%93%E4%BE%9B.mp4",
                    txt: "一分钟了解软床专供",
                    total: "8.8w"
                }
            ]
        }
    }
    componentDidMount () {

        
        this.play()
        this.getVedioHeight()
    }
    play = ()=> {
     
        const video = document.getElementById("video");
        video.autoplay = true;
        video.style.outline = "none";
    }
    getVedioHeight = ()=> {
        const screeWidth = window.innerWidth;
        const vedioHeight = screeWidth * 0.4;
        this.setState({
            vedioHeight: vedioHeight
        })
    }
    showVedioFn = (index)=> {
        this.setState({
            vedioShadowFlag: true,
            currentVedioIndex: index
        })
    }
    closeVedioFn = ()=> {
        this.setState({
            vedioShadowFlag: false
        })
    }
    render () {
        return (
            <div className="vedio_banner_con">
                <video  className="big_video" src="https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E5%8E%9F%E5%88%9B%E7%B3%BB%E5%88%97.mp4" style={{maxHeight: this.state.vedioHeight +"px", minHeight: this.state.vedioHeight + "px"}} id="video" muted   
                    ></video>
                <div className="vedio_list_con">
                    <div className="shadow"></div>
                    <div className="vedio_list_content">
                       
                            <div className="content_common_width">
                                <div className="title_con">
                                    <div className="left">
                                        <div className="small_title">镜头说</div>
                                        <div className="big_title">video introduced</div>
                                    </div>
                                    {/* <Link to="/" className="more_btn">搜索更多</Link> */}
                                </div>
                                <ul className="vedio_list">
                                    {this.state.vedioList.map((item, index)=> {
                                        return (
                                            <li key={item.id} onClick={()=>{this.showVedioFn(index)}}>
                                                <img src={item.imgSrc} alt="" className="img"/>
                                                <img src={playIcon} alt="" className="play_icon"/>
                                                <div className="text_con">
                                                    <div className="shadow"></div>
                                                    <div className="text">
                                                        <span className="txt">{item.txt}</span>
                                                        <div className="collect_txt">{item.total}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                     
                    </div>
                </div>
                {this.state.vedioShadowFlag && <VedioShadow index={this.state.currentVedioIndex} closeFn={this.closeVedioFn}/>}
            </div>
        )
    }
}

export default VedioBanner;