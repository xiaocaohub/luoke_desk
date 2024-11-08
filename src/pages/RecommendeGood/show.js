import React from "react";
import {Row, Col} from "antd";
import RoomBanner from "../../components/RecommendeGood/RoomBanner";

import Good from "../../components/RecommendeGood/Good";

import Header from "../../components/Header";
import PasswordShadow from "../../components/Home/PasswordShadow";
import PasswordShadowSwitch from "../../components/Home/PasswordShadowSwitch";
import Footer from "../../components/Footer";
import "./index.css";
import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import request from "../../api/request";
import {getGoodInfoApi} from "../../api/RecommendeGood";
import SmallCart from "../../components/SmallCart";

import {scrollTopFn} from "../../utils/imgAuto";
import ShowLoading from "../../components/Loading";
class Show extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            banner: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/banner_xpj.png",
            roomList: [
                {
                    id: 0,
                    imgSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/ctq.png",
                    title: "餐厅区",
                    txt: "LIVING ROOM AREA"
                },
                {
                    id: 1,

                    imgSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/ktq.png",
                    title: "客厅区",
                    txt: "BEDROOM AREA"
                },
                {
                    id: 2,
                    imgSrc: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/wfq.png",
                    title: "卧房区",
                    txt: "DINING AREA"
                }
            ],
            roomBannerArr: [
                {
                    id: 0,
                    topTitle: "餐厅",
                    topTxt: "/Dining area",
                    imgSrc: require("../../assets/room_list_banner1.png"),
                    navBtn: 2
                },
                {
                    id: 1,
                    topTitle: "客厅",
                    topTxt: "/LIVING ROOM",
                    imgSrc: require("../../assets/room_list_banner2.png"),
                    navBtn: 0
                },
                {
                    id: 2,   
                    topTitle: "卧房",
                    topTxt: "/BEDROOM",
                    imgSrc: require("../../assets/room_list_banner3.png"),
                    navBtn: 1
                }
            ],
            roomFirstArr: "",
            roomTwoArr: "",
            roomThreeArr: "",
            loadingFlag: false
        }
    }
    componentDidMount () {
        this.props.setNavIndexFn()
        scrollTopFn()
        this.getGoodInfoFn()
        this.getGoodInfoTwoFn()
        this.getGoodInfoThreeFn()
        this.totalCartGoodCountFn()
        this.setState({
            loadingFlag: false
        })
    }
    getGoodInfoFn = ()=> {
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        let styleId = this.state.styleId;
        let token = getStorageFn("token");
        formData.append("api", "app.product.listProduct"); 
        formData.append("accessId", token);
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        formData.append("productLabel", 102);
        formData.append("productClass", "-148-167-");
        getGoodInfoApi(formData).then((res)=>{
            let goodArr = res.data.data.goodsList;
            this.setState({
                roomFirstArr: goodArr,
                loadingFlag: false
            })
        })
    }
    getGoodInfoTwoFn = ()=> {
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        let styleId = this.state.styleId;
        formData.append("api", "app.product.listProduct"); 
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        formData.append("productLabel", 102);
        formData.append("productClass", "-148-150-");
        getGoodInfoApi(formData).then((res)=>{
            console.log(res.data)
            let goodArr = res.data.data.goodsList;
            this.setState({
                roomTwoArr: goodArr
            })
        })
    }
    getGoodInfoThreeFn = ()=> {
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        let styleId = this.state.styleId;
        formData.append("api", "app.product.listProduct"); 
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        formData.append("productLabel", 102);


        formData.append("productClass", "-148-166-");
        getGoodInfoApi(formData).then((res)=>{
            let goodArr = res.data.data.goodsList;
            this.setState({
                roomThreeArr: goodArr
            })
        })
    }
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
            <div className="recommende_good_con">

                <Header></Header>
                <div className="banner">      
                    <img src={this.state.banner} alt="" />  
                </div>

           
                <div className="room_list_con">
                    <ul className="room_list content_common_width">
                        {this.state.roomList.map((item,index)=>{
                            return (
                                <li key={item.id}>
                                    <img src={item.imgSrc} alt="" className="room_img"/>
                                    {/* <div className="text_con">
                                        <div className="title">{item.title}</div>
                                        <div className="txt">{item.txt}</div>
                                    </div> */}
                                </li>
                            )
                        })}
                    </ul>
                </div>

            
                    
                <div className="big_room_content_con content_common_width" >
                    <div className="big_room_con">
                        <RoomBanner bannerData={this.state.roomBannerArr[0]}></RoomBanner>
                        <ul className="good_list">
                            {this.state.roomFirstArr && this.state.roomFirstArr.map((item,index)=> {
                                
                                return (<Good goodInfo={item} key={index}></Good>)
                                })}
                        </ul>
                    </div>
                    
                    <div className="big_room_con">
                        <RoomBanner bannerData={this.state.roomBannerArr[1]}></RoomBanner>
                        <ul className="good_list">
                            {this.state.roomTwoArr && this.state.roomTwoArr.map((item,index)=> {
                                
                                return (<Good goodInfo={item} key={index}></Good>)
                                })}
                        </ul>
                    </div>

                    <div className="big_room_con">
                        <RoomBanner bannerData={this.state.roomBannerArr[2]}></RoomBanner>
                        
                        <ul className="good_list">
                            {this.state.roomThreeArr && this.state.roomThreeArr.map((item,index)=> {
                                
                                return (<Good goodInfo={item} key={index}></Good>)
                                })}
                        </ul>
                    </div>
                </div>
                
         
                {this.props.state.commonState.showCartFlag && <SmallCart hideSmallCart={this.props.hideSmallCartFn} totalCartGoodCountFn={this.totalCartGoodCountFn}></SmallCart>}
                { this.props.state.commonState.showSupplyPriceFlag && <PasswordShadow></PasswordShadow>}
                { this.props.state.commonState.showSupplyPriceSwitchFlag && <PasswordShadowSwitch></PasswordShadowSwitch> }
                {/* {this.state.loadingFlag && <ShowLoading></ShowLoading>} */}
                <Footer></Footer>                
            </div>
        )
    }
}


export default Show;