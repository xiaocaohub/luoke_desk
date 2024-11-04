import React from "react";
import {Link} from "react-router-dom";
import {Input, message} from "antd";

import { RightOutlined, StarOutlined, ShareAltOutlined } from '@ant-design/icons';

import {setStorageFn, getStorageFn} from "../../../utils/localStorage";
import codeImg from "../../../assets/footer_code2.png";
import "./index.css";

class DetailInfo extends React.Component {
    constructor (props) {
        super(props)
        // console.log("show detail props")
        // console.log(props)

        // console.log("show detail props")
        this.state = {
            currentIndex: 0,
            bigImg: require("../../../assets/vedio_list1.png"),
            bigHeight: 450,
            count: 1,
            colorArr: [],
            currentColorIndex: 0,
            currentColor: "",
            sizeArr: [],
            currentSizeIndex: 0,
            currentSize: "",
            allGoodArr: [],

            selectGoodIds: [],
            // currentGood: props.goodDetail.skuBeanList[0],
            currentGood: "",
            goodFirst: props.goodDetail.skuBeanList[0],
            allColorSizeGoodArr: [],

            supplyPriceStatus: false,
            vedioSrc: props.goodDetail.product.productVideo,
            defaultImgArr: []
            // defaultImgArr: props.goodDetail.product.defaultImgArr
        }   
    }
    componentDidMount () {
       this.initDataFn()

    //    this.setBigImgHeightFn()
    //    this.setBigVedioHeightFn()
    }
    initDataFn = ()=> {
        let _this = this;
        let supplyPriceStatus = getStorageFn("supplyPriceStatus");
        let vedioSrc = this.props.goodDetail.product.productVideo;
        let vedioNavSrc = "";

        let defaultImgArr = this.props.goodDetail.product.defaultImgArr;
        let attrList = this.props.goodDetail.attrList;
        let colorArr = attrList[0].attr;
        let colorTitle = attrList[0].attrName;
        let sizeArr = attrList[1].attr;
        let sizeTile = attrList[1].attrName;
        let allGoodArr = this.props.goodDetail.skuBeanList;
        let selectGoodIds = [];
        let currentGood = "";

        let currentColorIndex = 0;
        let currentSizeIndex = 0;
        let bigImg = "";
        selectGoodIds[0] = colorArr[0].id;
        selectGoodIds[1] = sizeArr[0].id;
        let goodFirst = this.props.goodDetail.skuBeanList[0];
        if (!vedioSrc && defaultImgArr.length == 0) {
            currentGood = goodFirst;
        } else {
            currentColorIndex = -1;
            currentSizeIndex = -1;
        }
        if (vedioSrc) {
            vedioNavSrc =  vedioSrc + "?x-oss-process=video/snapshot,t_1,m_fast";
            let indexType = defaultImgArr.find((item)=>{
                return item == vedioNavSrc;
            })

            if (!indexType) {

                defaultImgArr.unshift(vedioNavSrc)
            }
        }

        if (!currentGood && vedioSrc) {
            bigImg = "";
        } else if (!currentGood && !vedioSrc && defaultImgArr.length > 0) {
            bigImg = defaultImgArr[0];
        } else if (currentGood) {
            bigImg = goodFirst.imgurl;
        }
        this.setState({
            colorArr: colorArr,
            colorTitle: colorTitle,
            sizeArr: sizeArr,
            sizeTile: sizeTile,
            allGoodArr: allGoodArr,
            selectGoodIds: selectGoodIds,
            goodFirst: goodFirst,

            currentGood: currentGood,
            // bigImg: goodFirst.imgurl,
            bigImg: bigImg,
            supplyPriceStatus: supplyPriceStatus,
            currentColorIndex: currentColorIndex,
            currentSizeIndex: currentSizeIndex,
            vedioNavSrc: vedioNavSrc,
            defaultImgArr: defaultImgArr
        }, function () {
            if (vedioSrc) {
                // _this.selectSizeFn(-1)
                // _this.selectColorFn(-1)
                _this.setBigVedioHeightFn()
                 _this.vedioCheckColorArrDisableFn()
                 _this.vedioCheckSizeArrDisableFn()


                _this.props.setSelectGood("")
            } else if (!vedioSrc && defaultImgArr.length > 0) {
                _this.setBigVedioHeightFn()
                _this.vedioCheckColorArrDisableFn()
                
                _this.vedioCheckSizeArrDisableFn()
            
                _this.props.setSelectGood("")
            } else if (!vedioSrc && defaultImgArr.length == 0) {
                _this.selectSizeFn(0)
                _this.selectColorFn(0)
                _this.setBigImgHeightFn()

                _this.props.setSelectGood(goodFirst)
            }
            this.play()
        })  
    }
    setBigImgHeightFn () {
        let bigImg = document.getElementById("big_img");
        console.log("width bigImg -----", bigImg)
        if (!bigImg) {
            return ;
        }
        let width = bigImg.width;
        let height = (width * 2)/3 ;

        // console.log("width bigImg")
        // console.log(width)
        // console.log(height)
        // console.log("width bigImg")
        let smallImg = document.querySelectorAll(".img_nav li")[0];
        let smallWidth = smallImg.clientWidth;

        let smallHeight = (smallWidth * 2) / 3;   
        this.setState({
            bigHeight: height,
            smallHeight: smallHeight
        })
    }
    setBigVedioHeightFn () {
        let bigVedio = document.getElementById("bigvideo");
        let vedioSrc = this.state.vedioSrc;

        if (!bigVedio) {
            return ;
        }
        let width = bigVedio.clientWidth;
        let height = (width * 2)/3 ;
        // console.log("width bigVedio")
        // console.log(width)
        // console.log(height)
        // console.log("width bigVedio")

        this.setState({
            vedioHeight: height
        })
    }
    play = ()=> {  
        const video = document.getElementById("bigvideo");
        // console.log("------------------------------")
        // console.dir(video)
        if (video) {
            video.autoplay = true;
            video.style.outline = "none";
        }
        // setTimeout(()=>{
        //     video.autoplay = true;
        //     video.style.outline = "none";
        // })
    }
    leftImgFn = ()=> {
        let _this = this;
     
        let currentGood = this.state.currentGood;
        let defaultImgArr = this.state.defaultImgArr;
        if (currentGood) {
            let imgArr = this.state.currentGood.imgArr;       
            let length = imgArr.length;
            let currentIndex = this.state.currentIndex;
            let bigImg = "";
            if (currentIndex > 0) {
                currentIndex -= 1;
            } else {
                currentIndex = length - 1;
            }
            bigImg = imgArr[currentIndex];
            this.setState({
                currentIndex: currentIndex,
              
                bigImg: bigImg
            })
        } else {
            let length = defaultImgArr.length;
            let currentIndex = this.state.currentIndex;
            let bigImg = "";
            if (currentIndex > 0) {
                currentIndex -= 1;
            } else {
                currentIndex = length - 1;
            }
            if (currentIndex==0) {
                _this.play()
            }
            bigImg = defaultImgArr[currentIndex];
            this.setState({
                currentIndex: currentIndex,
                bigImg: bigImg
            })
        }
    }
    rightImgFn = ()=> {
        let _this = this;
        let currentGood = this.state.currentGood;
        let defaultImgArr = this.state.defaultImgArr;
        if (currentGood) {
            let imgArr = this.state.currentGood.imgArr;
            let length = imgArr.length;
            let currentIndex = this.state.currentIndex;
            let bigImg = "";
            if (currentIndex >= (length-1)) {
                currentIndex = 0;
            } else {
                currentIndex +=  1;
            }
            bigImg = imgArr[currentIndex];
            this.setState({
                currentIndex: currentIndex,
                bigImg: bigImg
            })
        } else {
            let length = defaultImgArr.length;
            let currentIndex = this.state.currentIndex;
            let bigImg = "";
            if (currentIndex >= (length-1)) {
                currentIndex = 0;
                if (currentIndex==0) {
                    _this.play()
                }
            } else {
                currentIndex +=  1;
            }
            bigImg = defaultImgArr[currentIndex];
    
            this.setState({
                currentIndex: currentIndex,
                bigImg: bigImg
            })
        }
    }

    selectNavFn = (index, item)=> {
        let _this = this;

        this.setState({
            currentIndex: index,
            bigImg: item
        }, function () {
            if (index == 0) {
                _this.play()
             }
        })
    }
    changeCountFn = (e) => {
        let value = e.target.value;
        this.setState({
            count: value
        })
    }
    handleCountFn = (dir)=> {
        let count = this.state.count;
        if (dir<0) {
            if (count>=2) {
                count -= 1;
            }
        } else {
            count += 1;
        }
        this.setState({
            count: count
        })
    }
    selectColorFn = (index, clickStatus)=> {

        let _this = this;
        let currentColorIndex = this.state.currentColorIndex;
        let color = this.state.colorArr[index];
        let selectGoodIds = this.state.selectGoodIds;
        let sizeArr = this.resetSizeArrFn();
        let vedioSrc = this.state.vedioSrc;
        let defaultImgArr = this.state.defaultImgArr;
        if ((currentColorIndex == index && clickStatus && vedioSrc) || currentColorIndex == index && clickStatus && !vedioSrc && defaultImgArr.length > 0) {
            index = -1;
            selectGoodIds[0] = "";     
            color = "";

            _this.setState({
                currentColorIndex: index,
                currentIndex: 0,
                selectGoodIds: selectGoodIds,
                currentColor: color,
                currentGood: ""
            
            }, function () {
                _this.props.setSelectGood("")


                _this.setBigImgFn()
            })
            
        } else {
            selectGoodIds[0] = color.id;
            _this.setState({
                currentColorIndex: index,
                selectGoodIds: selectGoodIds,
                currentColor: color
            }, function () {   
                if (_this.state.currentSizeIndex != -1) {
                    // _this.checkColorArrDisableFn()

                    _this.checkSizeArrDisableFn()
                    _this.selectGoodFn()
                }
            })
        }
        
    
        // this.setState({
        //     currentColorIndex: index,
        //     selectGoodIds: selectGoodIds,

        //     currentColor: color
        // }, function () {
        //     if (index != -1) {
        //         this.checkColorArrDisableFn()
        //         this.selectGoodFn()
        //     }
        // })
    }
    resetSizeArrFn = ()=> {

        let sizeArr = this.state.sizeArr;
        sizeArr.forEach((item)=> {
            item.showFlag = true;
        })
        return sizeArr;
    }

    checkSizeArrDisableFn = ()=> {    
        let currentColor = this.state.currentColor;
        let colorId = currentColor.id;
        let sizeArr = this.state.sizeArr;
        let sizeLength = sizeArr.length;
        let allGoodArr = this.state.allGoodArr;

        let allLength = allGoodArr.length;
        for (let i=0; i<sizeLength; i++) {
            let sizeItem = sizeArr[i];
            sizeItem.showFlag = false;
            for (let j=0; j<allLength; j++) {
                let allItem = allGoodArr[j];                
                if (colorId == allItem.attributes[0].attributeValId && sizeItem.id == allItem.attributes[1].attributeValId) {
                    if (allItem.status == 0) {
                        sizeItem.showFlag = true;
                    }
                }
            }
        }
        this.setState({
            sizeArr: sizeArr
        })
    }
    selectSizeFn = (index, clickStatus)=> {
        let _this = this;
        let currentSizeIndex = this.state.currentSizeIndex;
        let size = this.state.sizeArr[index];
        let selectGoodIds = this.state.selectGoodIds;    
        let vedioSrc = this.state.vedioSrc;
        let defaultImgArr = this.state.defaultImgArr;
        if ((currentSizeIndex == index && clickStatus && vedioSrc) || currentSizeIndex == index && clickStatus && !vedioSrc && defaultImgArr.length > 0) {
            index = -1;
            selectGoodIds[1] = "";

            size = "";
            _this.setState({
                currentSizeIndex: index,
                currentIndex: 0,
                selectGoodIds: selectGoodIds,
                currentSize: size,
                currentGood: ""
            }, function () {
                _this.props.setSelectGood("")
                _this.setBigImgFn()
            })
        } else {
            selectGoodIds[1] = size.id;
            this.setState({
                currentSizeIndex: index,

                selectGoodIds: selectGoodIds,
                
                currentSize: size
            
            }, function () {
                if (_this.state.currentColorIndex != -1) {
                    _this.checkColorArrDisableFn()
                    _this.selectGoodFn()
                }
               
            })
        }
        // this.setState({
        //     currentSizeIndex: index,
        //     selectGoodIds: selectGoodIds,
        //     currentSize: size
        // }, function () {

        //     if (index != -1) {
        //         this.checkColorArrDisableFn()
        //         this.selectGoodFn()
        //     }
           
        // })
    }

    checkColorArrDisableFn = ()=> {    
        let currentSize = this.state.currentSize;
        let sizeId = currentSize.id;
        let colorArr = this.state.colorArr;
        let colorLength = colorArr.length;
        let allGoodArr = this.state.allGoodArr;
        let allLength = allGoodArr.length;
        for (let i=0; i<colorLength; i++) {
            let colorItem = colorArr[i];
            
            colorItem.showFlag = false;
            for (let j=0; j<allLength; j++) {
                let allItem = allGoodArr[j];  

                if (colorItem.id == allItem.attributes[0].attributeValId && sizeId == allItem.attributes[1].attributeValId) {
                    if (allItem.status == 0) {
                        colorItem.showFlag = true;
                    }
                }
            }
        }
       
        this.setState({
            colorArr: colorArr
        })
    }
    vedioCheckColorArrDisableFn = ()=> {
        let colorArr = this.state.colorArr;

        colorArr.forEach((colorItem)=>{
            colorItem.showFlag = true;
        })
        // console.log("colorArr vedioCheckColorArrDisableFn")
        // console.log(colorArr)

        // console.log("colorArr vedioCheckColorArrDisableFn")
        
        
        this.setState({
            colorArr: colorArr
        })
    }



    vedioCheckSizeArrDisableFn = ()=> {    
        let sizeArr = this.state.sizeArr;
        sizeArr.forEach((sizeItem)=> {
            sizeItem.showFlag = true;
        })
        this.setState({
            sizeArr: sizeArr
        })
    }
    selectGoodFn () {   
        let allGoodArr = this.state.allGoodArr;
        let selectGoodIds =  this.state.selectGoodIds;
        let length = allGoodArr.length;
        let currentGood = "";

        for (let i=0; i<length; i++) {
            let attributes = allGoodArr[i].attributes;
            let flag = attributes[0].attributeValId == selectGoodIds[0] && attributes[1].attributeValId == selectGoodIds[1];           
            if (flag) {
                allGoodArr[i].imgArr = allGoodArr[i].imgArr;        
                currentGood = allGoodArr[i];
            }
        }
        let bigImg = currentGood.imgurl;

        this.setState({
            currentGood: currentGood,
            bigImg: bigImg,
            currentIndex: 0
        }, function () {

            // console.log("currentGood currentGood")
            // console.log(currentGood)
            // console.log("currentGood currentGood")
            this.props.setSelectGood(currentGood)
        })
    }
    copyFn () {
        const text = document.getElementById("code_con").innerText;
        const input = document.createElement('input');


        input.value = text;
        document.body.appendChild(input);
        input.select(); 
        document.execCommand('copy');
        
        document.body.removeChild(input)
        message.success("复制成功")
    }
    addCartFn = ()=> {
        this.props.addCartFn(this.state.count)
    }
    setBigImgFn = () => {
        let vedioSrc = this.state.vedioSrc;
        let defaultImgArr = this.state.defaultImgArr;

        let currentGood = this.state.currentGood;
        let bigImg = "";
        if (!currentGood && !vedioSrc && defaultImgArr.length > 0) {
             bigImg = defaultImgArr[0];
        }
        this.setState({
            bigImg: bigImg
        })
    }

    render () {
        return (
            <div className="detail_info_con">
                <div className="detail_info">             
                    <div className="left">
                        <div className="big_img_con">  
                            <div className="big_img_c" style={{height: this.state.bigHeight + "px"}}>
                                
                                { !this.state.currentGood && this.state.vedioSrc && this.state.currentIndex==0 && <video  className="big_video" src={this.state.vedioSrc} controls 
                                    style={{width:"100%",height: this.state.vedioHeight + "px"}} id="bigvideo"  muted>
                                </video>} 
                                
                         
                                { this.state.currentGood && <img src={this.state.bigImg} alt="" className="big_img" id="big_img"   style={{height: this.state.bigHeight + "px"}} />}
                                { !this.state.currentGood && this.state.vedioSrc && this.state.defaultImgArr.length>0 && this.state.currentIndex>0 && <img src={this.state.bigImg} alt="" className="big_img" id="big_img"   style={{height: this.state.bigHeight + "px"}} />}
                                { !this.state.currentGood && !this.state.vedioSrc && this.state.defaultImgArr.length>0 &&  <img src={this.state.bigImg} alt="" className="big_img" id="big_img"   style={{height: this.state.bigHeight + "px"}}/>}
                                {/* {!this.state.currentGood &&this.state.defaultImgArr.length == 0 && <img src={this.state.bigImg} alt="" className="big_img" id="big_img"   style={{height: this.state.bigHeight + "px"}} onClick={this.checkSizeArrDisableFn}/>} */}
                                {/* <img src={this.state.bigImg} alt="" className="big_img" id="big_img"  onClick={this.checkSizeArrDisableFn}/> */}
                              
                            </div>
                            <div className="btn left_btn" onClick={this.leftImgFn}></div>
                            <div className="btn right_btn" onClick={this.rightImgFn}></div>
                        </div>
                       
                        <ul className="img_nav">
                            {/* <li className={this.state.currentIndex==0?"small_img on":"small_img"}  style={{height:this.state.smallHeight + "px"}} onClick={()=>{this.selectNavFn(0, item)}} key={0}>
                                
                            </li> */}

                            {
                                !this.state.currentGood && this.state.vedioSrc && this.state.defaultImgArr.length>0 && this.state.defaultImgArr.map((item, index)=> {
                                  // return (<li className={this.state.currentIndex==index?"small_img on":"small_img"}  onClick={()=>{this.selectNavFn(index, item)}} key={index}> 
                                    return (<li className={ this.state.currentIndex==index?"small_img on":"small_img"}  style={{height:this.state.smallHeight + "px"}} onClick={()=>{this.selectNavFn(index, item)}} key={index}>      
                                        <img src={item} alt=""  />
                                        <p>{index + "---"}</p>
                                    </li>)
                                })
                            }


                            {
                                !this.state.currentGood && !this.state.vedioSrc && this.state.defaultImgArr.length>0 && this.state.defaultImgArr.map((item, index)=> {
                                  // return (<li className={this.state.currentIndex==index?"small_img on":"small_img"}  onClick={()=>{this.selectNavFn(index, item)}} key={index}> 
                                    return (<li className={ this.state.currentIndex==index?"small_img on":"small_img"}  style={{height:this.state.smallHeight + "px"}} onClick={()=>{this.selectNavFn(index, item)}} key={index}>      
                                        <img src={item} alt=""  />
                                    </li>)
                                })
                            }
                            
                           
                            {   
                                this.state.currentGood && this.state.currentGood.imgArr.map((item, index)=> {
                                  // return (<li className={this.state.currentIndex==index?"small_img on":"small_img"}  onClick={()=>{this.selectNavFn(index, item)}} key={index}>      
                                    
                                    return (<li className={ this.state.currentIndex==index?"small_img on":"small_img"}  style={{height:this.state.smallHeight + "px"}} onClick={()=>{this.selectNavFn(index, item)}} key={index}>      
                                        <img src={item} alt=""  />
                                    </li>)
                                })
                            }


                            {
                                !this.state.currentGood &&this.state.defaultImgArr.length == 0 && this.state.goodFirst.imgArr.map((item, index)=> {
                                  // return (<li className={this.state.currentIndex==index?"small_img on":"small_img"}  onClick={()=>{this.selectNavFn(index, item)}} key={index}>
                                 
                                    return (<li className={ this.state.currentIndex==index?"small_img on":"small_img"}  style={{height:this.state.smallHeight + "px"}} onClick={()=>{this.selectNavFn(index, item)}} key={index}>      
                                        <img src={item} alt=""  />
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                    
                    <div className="right">
                        <div className="top_tit">
                            <span className="tit">{this.props.goodDetail.product.brandName}</span>
                            <span className="txt">
                                <Link to= {"/serieslist?id=" + this.props.goodDetail.product.brandId }>进入系列</Link> 
                                <RightOutlined className="right_icon"/>    
                            </span>
                            <span className="company_name">{this.props.goodDetail.mchName}</span>
                        </div>

                        <div className="title">
                            {/* <span className="tit">新品</span>
                            <span className="tit">现货</span> */}

                            <div className="tit_txt">{this.props.goodDetail.product.productName} </div>
                            <div className="intro">{this.props.goodDetail.product.subTitle} </div>
                        </div>

                        <div className="price">
                            <span className="unit">￥</span>{this.state.currentGood?this.state.currentGood.price:this.props.goodDetail.skuBeanList[0].price}
                            { this.state.supplyPriceStatus && <span className="supply_price">供货价: {this.state.currentGood?this.state.currentGood.discountPrice:this.props.goodDetail.skuBeanList[0].discountPrice}</span> }
                        </div>
                      
                      
                        <div className="specifications_con">
                            <div className="title_name">{this.state.colorTitle}</div>
                            <ul className="specifications_list">
                                {this.state.colorArr && this.state.colorArr.map((item, index)=> {
                                    if (item.showFlag) {
                                        return (<li className={this.state.currentColorIndex==index?"on":""} key={item.id} onClick={()=>{this.selectColorFn(index, "click")}}>{item.attributeValue}</li>)
                                    } else {
                                        return (<li className="dis" key={item.id} >{item.attributeValue}</li>)
                                    }
                                })}
                            </ul>
                        </div>

                        <div className="specifications_con">
                            <div className="title_name">{this.state.sizeTile}</div>
                            <ul className="specifications_list">   

                                {this.state.sizeArr && this.state.sizeArr.map((item, index)=>{
                                    if (item.showFlag) {
                                        return (<li className={this.state.currentSizeIndex==index?"on":""} key={item.id} onClick={()=>{this.selectSizeFn(index, "click")}}>{item.attributeValue}</li>)
                                    } else {
                                        return (<li className="dis" key={item.id}>{item.attributeValue}</li>)
                                    }
                                })}                               
                            </ul>
                        </div>

                        <div className="specifications_con">
                            <div className="title_name">编码</div>

                            <div className="code_con" id="code_con" onClick={this.copyFn}>{this.state.currentGood?this.state.currentGood.productCode:this.props.goodDetail.skuBeanList[0].productCode}</div>
                        </div>

                        {/* <div className="specifications_con">
                            <div className="title_name">模型</div>
                            <div className="download_btn">点击下载</div>
                        </div> */}



                        <div className="specifications_con">
                            <div className="title_name">数量</div>
                            <div className="count_con">
                                <div className="btn reduce_btn" onClick={()=>{this.handleCountFn(-1)}}>-</div>
                                
                                <Input className="count" value={this.state.count} onChange={this.changeCountFn}/>      
                                <div className="btn add_btn" onClick={()=>{this.handleCountFn(1)}}>+</div>
                            </div>
                        </div>

                        <div className="buy_con">
                            <div className="btn buy_btn" onClick={this.addCartFn}>加入购物车</div>

                            {/* <div className="btn">定制询价</div> */}
                            {/* <div className="small_btn">
                                <StarOutlined className="icon"/> 收藏
                            </div>
                            <span className="line"></span>
                            <div className="small_btn share_btn">
                                <ShareAltOutlined className="icon"/> 分享
                                <img src={codeImg} alt="" className="code_img"/>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default DetailInfo;