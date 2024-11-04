import React from "react";
import "./index.css";
import {Icon} from "@ant-design/compatible";

import {setVedioHeightFn} from "../../../utils/imgAuto";

class VedioShadow extends React.Component {
    constructor (props) {
        super(props)
        // console.log(props)
        this.state = {
            width: window.innerWidth * 0.8,
            vedioHeight: window.innerHeight * 0.8,
            vedioList: [
                {
                    id: 0,
                    vedioSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E5%8E%9F%E5%88%9B%E7%B3%BB%E5%88%97.mp4",
                },
                {
                    id: 1,
                    vedioSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E4%B8%87%E7%89%A9%E7%B3%BB%E5%88%97.mp4",
                },
                {
                    id: 3,
                    vedioSrc: " https://luockoo.oss-cn-shenzhen.aliyuncs.com/0/1/20240826/%E4%B8%80%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E8%BD%AF%E5%BA%8A%E4%B8%93%E4%BE%9B.mp4",
                }
            ],
            vedioHeight: 0
        }
    }
    componentDidMount () {
        this.play()
        this.autoVedioHeightFn()
    }
    play = ()=> {
     
        const video = document.getElementById("bigvideo");
     
     
        video.autoplay = true;
        video.style.outline = "none";
    }
    autoVedioHeightFn = ()=> {
        let usVideo = document.getElementById("big_vedio_con");
        let vedioHeight = setVedioHeightFn(usVideo);
        this.setState({
            vedioHeight: vedioHeight
        })
    }
    render () {
        return (
            <div className="vedio_shadow_con">
                <div className="shadow"></div>
                <div className="big_vedio_con" id="big_vedio_con">
                    <video  className="big_video" src={this.state.vedioList[this.props.index].vedioSrc} controls 
                      
                      style={{maxHeight: this.state.vedioHeight +"px", minHeight: this.state.vedioHeight + "px"}} id="bigvideo"  muted   
                    ></video>
                    <Icon type="close-circle" className="close_btn" onClick={this.props.closeFn}/> 
                </div>
            </div>
        )
    }
}

export default VedioShadow;