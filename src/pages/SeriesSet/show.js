import React from "react";
import {Row, Col} from "antd";
import { getStyleApi, getStyleGoodArrApi} from "../../api/SeriesSet";

import {setStorageFn, getStorageFn} from "../../utils/localStorage";

import Header from "../../components/Header";

import Footer from "../../components/Footer";
import PasswordShadow from "../../components/Home/PasswordShadow";
import PasswordShadowSwitch from "../../components/Home/PasswordShadowSwitch";
import Empty from "../../components/Empty";
import Nav from "../../components/SeriesSet/Nav";
import "./index.css";
import bannerImg from "../../assets/series_banner.png";
import SmallCart from "../../components/SmallCart";
import Good from "../../components/SeriesSet/Good";
import {scrollTopFn} from "../../utils/imgAuto";
import request from "../../api/request";
import ShowLoading from "../../components/Loading";

class Show extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            styleNav: [
                {id: 0, text:"全部", value: 0}
            ],
            styleIndex: 0,
            styleId: 0,

            styleGoodArr: [],
            loadingFlag: false,
            banner: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/series_set_banner.png"
           
            // https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/ruanchuang_bg.png, 
            // https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/series_set_banner.png,
            // https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/wanwu_bg.png,
            // https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/yuanchuang_bg.png
        }
    }
    componentDidMount () {
        this.props.setNavIndexFn()
        scrollTopFn()
        this.getStyleFn()
        this.totalCartGoodCountFn()
        this.setState({
            loadingFlag: true
        })
    }
    getStyleFn = ()=> {
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;

        formData.append("api", "saas.dic.getDictionaryInfo");
        
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        formData.append("key", "");

        formData.append("pageSize", 10);
        getStyleApi(formData).then((res)=>{  
            let styleArr = res.data.data.list;
            
            let item = {id: 0, text:"全部", value: ""};
            styleArr.unshift(item);
            let styleId = "";
          
            this.setState({
                styleNav: styleArr,
                styleId: styleId,
                loadingFlag: false
            }, function () {
          
                this.getStyleGoodArrFn()
            })
        })
    }
    styleNavSelectFn = (index)=> {
        let styleNav = this.state.styleNav;
        let item = styleNav[index];
        this.setState({ 
            styleIndex: index,
            styleId: item.value
        }, function () {
            this.getStyleGoodArrFn()
        })
    }
    getStyleGoodArrFn = ()=> {   
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        let styleId = this.state.styleId;
        formData.append("api", "app.product.getBrands"); 
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        // formData.append("productLabel", 102);
        formData.append("styleId", styleId);
        getStyleGoodArrApi(formData).then((res)=>{
            let goodArr = res.data.data.brandsList;
            this.setState({
                styleGoodArr: goodArr
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
           <div className="series_con">
                <Header></Header>               
                <div className="content_common_width">    
                    <div className="banner_con">
                        <img src={this.state.banner} alt="" className="banner_img"/>
                        {/* <div className="text_con">
                            <div className="title">A MASIVE PRODUCT SUPPLY SYSTEM</div>
                            <div className="txt">大而全的产品供应体系</div>
                        </div> */}
                    </div>

                    <div className="series_list_con">
                        <div className="series_nav_con">
                            {/* <Nav></Nav> */}
                            <ul className="tab_nav_list">
                                {this.state.styleNav.map((item,index)=>{
                                    return (<li className={this.state.styleIndex==index?"on":""} onClick={()=>{this.styleNavSelectFn(index)}}>{item.text}</li>)
                                })}
                            </ul>
                        </div>
                        <ul className="good_list">
                            {this.state.styleGoodArr && this.state.styleGoodArr.map((item, index)=> {
                                return (<Good goodInfo={item}></Good>)

                            })}    
                        </ul>
                        {this.state.styleGoodArr.length==0 && <Empty></Empty>}
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