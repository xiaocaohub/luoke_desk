import React from "react";
import {Row, Col} from "antd";
import {Link} from "react-router-dom";

import "./index.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BannerCon from "../../components/BannerCon";
import HotSell from "../../components/Home/HotSell";
import VedioBanner from "../../components/Home/VedioBanner";
import Good from "../../components/Home/Good";
import HotSelling from "../../components/Home/HotSelling";
import KindGood from "../../components/Home/KindGood";
import SmallCart from "../../components/SmallCart";
import StyleGood from "../../components/Home/StyleGood";
import popularImg from "../../assets/popular_img.png";


import {homeInfoApi, getStyleApi, getStyleGoodArrApi} from "../../api/home";

import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import request from "../../api/request";
import {scrollTopFn} from "../../utils/imgAuto";
import titleImg  from "../../assets/index_title.png";

import titleImg2 from "../../assets/index_title2.png";
import EmptyPage from "../../components/Empty";

import ShowLoading from "../../components/Loading";
 
class Show extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            styleNav: [
                // {id: 0, text:"奶油"}
            ],

            styleIndex: 0,
            styleId: 1,
            styleGoodArr: [],
            showCartFlag: false,
            
            hotSellArr: [], 

            recomendGoodArr: [], 
            loadingFlag: false
        }
    }
    componentDidMount () {
        this.props.setNavIndexFn()
        this.getHotSellInfoFn()
        this.getRecomendGoodFn()
        this.getStyleFn()
        scrollTopFn()
        this.getCartInfoFn()

        this.totalCartGoodCountFn()
        this.setState({
            loadingFlag: true
        })
    }
    getHotSellInfoFn = ()=> {
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        formData.append("api", "app.product.listProduct");
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 20);
        formData.append("productLabel", 101);
        formData.append("styleIds", "");
        homeInfoApi(formData).then((res)=>{
            let hotSellArr = res.data.data.goodsList;   
            this.setState({
                hotSellArr: hotSellArr,
                loadingFlag: false
            })
        })
    }
    getRecomendGoodFn = ()=> {
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        formData.append("api", "app.product.listProduct");
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        formData.append("productLabel", 102);
        formData.append("styleIds", "");
        homeInfoApi(formData).then((res)=>{     
            let recomendGoodArr = res.data.data.goodsList;
            this.setState({
                recomendGoodArr: recomendGoodArr
            })
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

            // console.log("style arr")
            // console.log(res.data) 
            // console.log("style arr")  
            let styleArr = res.data.data.list;
            let styleId = styleArr[0].value;
            this.setState({
                styleNav: styleArr,
                styleId: styleId
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
        let _this = this;
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        let styleId = this.state.styleId;
        formData.append("api", "app.product.listProduct"); 
        
        
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        // formData.append("productLabel", 102);
        formData.append("styleIds", styleId);

        getStyleGoodArrApi(formData).then((res)=>{
            let goodArr = res.data.data.goodsList;
            _this.setState({
                styleGoodArr: goodArr
            })
        })
    }
    getCartInfoFn = ()=> {
        
        let _this = this;
        let formData = new FormData();
        let token = getStorageFn("token");
        let option = {"brandId":"","minPrice":"","maxPrice":""};
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
            resData.forEach((item, index)=>{

                item.selectFlag = false;
            })
        
        
            setStorageFn("cartArr", resData)
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
            <div className="main_content">

                <Header></Header>
                <BannerCon></BannerCon>
                     
                {/* 热销爆款 */}
                {this.state.hotSellArr.length>0 && <HotSell hotSellArrData={this.state.hotSellArr}></HotSell>}

                <div className="vedio_text_con">
                    {/* <div className="small_title">Quality of life</div>
                    <div className="big_title">LUOCKOO HOME</div>
                    <div className="txt">品质生活，从细节开始<br/> 让每一处空间都有故事，每一款产品都有灵魂<br/> 打造温馨舒适的家，让生活更美好</div> */}
                    <img src={titleImg} alt=""/>
                </div>

                <VedioBanner></VedioBanner>        

                {/* 品一览 */}
                <div className="recommend_good_list_con">        
                    <div className="recommend_text_con">
                        <img src={titleImg2} className="title_img" alt=""/>
                    </div>
          
                    <div className="recommend_good_con">
                            <div className="content_common_width">                        
                                <ul className="recommend_good_list">
                                    {this.state.recomendGoodArr.length>0 && this.state.recomendGoodArr.map((item, index)=>{                      
                                        return (<Good goodInfo={item} key={item.id}></Good>)
                                    })}
                                </ul>
                                <Link to="/productroom" className="more_btn">搜索更多</Link>
                            </div>
                    </div>
                </div>  
                {this.state.hotSellArr.length>0 && <HotSelling hotSellArrData={this.state.hotSellArr}></HotSelling>}



                <img src={popularImg} className="popular_img" alt=""/>
                <div className="king_style_good_list_con">
                    <div className="content_common_width">

                            <div className="king_good_list_con">
                        
                                <ul className="nav_list">
                                    {this.state.styleNav.map((item, index)=> {
                                        return (<li key={item.id} className={this.state.styleIndex===index?"on":""} onClick={()=>{this.styleNavSelectFn(index)}}>{item.text}</li>)
                                    })}
                                </ul>

                                <ul className="good_list">
                                    {/* <KindGood></KindGood> */}                             
                                    {this.state.styleGoodArr.length>0 && this.state.styleGoodArr.map((item, index)=>{
                                        return (<StyleGood styleGood={item} key={index}></StyleGood>)
                                    })}
                                
                                </ul>
                
                                {this.state.styleGoodArr.length==0 && <EmptyPage></EmptyPage>}
                            </div>
                        
                    </div>
                </div>
                
                {this.props.state.commonState.showCartFlag && <SmallCart hideSmallCart={this.props.hideSmallCartFn} totalCartGoodCountFn={this.totalCartGoodCountFn}></SmallCart>}
          
                {/* {this.state.loadingFlag && <ShowLoading></ShowLoading>} */}

                <Footer></Footer>
            </div>
        )
    }
}


export default Show;