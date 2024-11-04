import React from "react";
import {Row, Col, Image } from "antd";
import "./index.css";

import goodImg from "../../../assets/recomend_good1.png";
 
import EmptyImg from "../../../assets/shopping.png";
class GoodDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            realPhotos: [],
            showRealPhotos: [],
            attrArr: [],
            imgHeight: 90,

            foldFlag: true,
            visible: false,
            content: ""
        }
    }
    componentDidMount () {

        this.init()
    }
    init = ()=> {
        let  product = this.props.goodDetail.product;
        let  parameters = product.parameters;
        parameters = eval(parameters);
        let realPhotos = product.realPhotos;
        let showRealPhotos = product.realPhotos.slice(0, 2);
        let content = eval(product.content)[0].content;
        this.setState({
            content: content ,
            realPhotos: realPhotos,
            attrArr: parameters,
            showRealPhotos: showRealPhotos
        }, function () {


            this.setImgHeightFn()
        })
    }
    setImgHeightFn = ()=> {
     
        let img = document.querySelectorAll(".good_edit_detail .img_list .img")[0];
        if (img) {
            let width = img.clientWidth;       
            let height = (width * 2)/3;
            this.setState({
                imgHeight: height
            })
        }
    }
    showMoreFn = ()=> {
        let flag = !this.state.foldFlag;

        let realPhotos = this.state.realPhotos;   
        let showRealPhotos = [];
        if (flag) {
            showRealPhotos = realPhotos.slice(0, 2)
        } else {
            showRealPhotos = realPhotos;
        }
        this.setState({
            foldFlag: flag,
            showRealPhotos: showRealPhotos
        })
    }
    showBigImgFn = (flag)=> {
        this.setState({
            visible: flag
        })
    }
    render () {
        return (
            <div className="good_edit_detail">
              
                <div  className="content content_common_width">       
                    {this.state.content.length>0 && <div className="left" dangerouslySetInnerHTML={{ __html: this.state.content }}>
                         
                    </div>}
                    {this.state.content.length==0 &&  <div className="left" >
                            <img src={EmptyImg} alt=""/>
                    </div>}
                  
                     
                    <div className="right">
                        {/* <div className="title_top">
                            <span className="tit">实物拍摄</span>
                            <span className={this.state.foldFlag?"show_btn":"show_btn on"} onClick={this.showMoreFn}>{this.state.foldFlag?"展开全部":"收起"}</span>
                        </div>  */}
 
               

                        <div className="img_txt_con"> 
                            <div className="img_list">
                                <Image.PreviewGroup>
                                    {this.state.showRealPhotos.length>0 && this.state.showRealPhotos.map((item, index)=> {
                                        // return (
                                        //     <div  className="img_con" key={index} style={{height:this.state.imgHeight+"px"}}>
                                        //         <Image src= {item}    preview={{ visible: false }}  width={150} height={this.state.imgHeight} className="img" onClick={this.showBigImgFn}/>
                                        //     </div>
                                        // )
                                        return (
                                            <div  className="img_con" key={index}>
                                                <Image
                                                    src= {item}      
                                                    // width={150} height={this.state.imgHeight} className="img"
                                                    width={150} height={150} className="img"
                                            />
                                        </div>
                                        )
                                    })}  
                                </Image.PreviewGroup>
                               
                                { this.state.showRealPhotos.length == 0 &&   (<div className="err_msg">~暂未上传实拍图~</div>)}
                            </div>

                            <div className="text_con">
                                <div className="tit">商品信息</div>
                                <ul className="txt_list">
                                    <li><span className="title">分类:</span>  <span className="txt">{this.props.goodDetail.product.categoryName} </span> </li>
                                    <li><span className="title">风格:</span>  <span className="txt">{this.props.goodDetail.product.styleName}</span> </li>
                                    <li><span className="title">型号:</span>  <span className="txt">{ this.props.currentGood.marque }</span> </li>
                                    
                                    <li><span className="title">体积(m³):</span>  <span className="txt">{ this.props.currentGood.capacity }</span> </li>
                                    <li><span className="title">包件数:</span>  <span className="txt">{ this.props.currentGood.bomNums }</span> </li>
                                    {this.state.attrArr.map((item, index)=>{
                                        if (item.value) {
                                            return (<li key={index}><span className="title">{item.label}:</span>  <span className="txt">{item.value}</span> </li>)
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </div>
        )
    }
}


export default GoodDetail;