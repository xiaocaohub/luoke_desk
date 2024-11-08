import React from "react";
import {Link} from "react-router-dom";
import {Row, Col, Input, Modal, message} from "antd";
import "./index.css";
import Header from "../../components/Header";

import Footer from "../../components/Footer";
import GoodTable from "../../components/Cart/GoodTable";
import UserInfo from "../../components/Cart/UserInfo";
import PasswordShadow from "../../components/Home/PasswordShadow";
import PasswordShadowSwitch from "../../components/Home/PasswordShadowSwitch";
import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import SmallCart from "../../components/SmallCart";
import request from "../../api/request";
class Show extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            cartArr: [],
            selectAllFlag: 0,
            totalMoney: 0,
            totalCount: 0,
            totalVol: 0, 
            setImgHeight: 0,
            userInfo: {
                province: "",
                city: "",
                area: "",
                detailAdress: "",
                recipient: "", 
                remark: ""
            },
            totalSelectGoodCount: 0,
            isKeep: false,

            supplyPriceStatus: false,


            supplyPriceStatusValue: null
        }
    }
    componentDidMount () {

        this.initFn()

        this.getCartInfoFn()
    }
    initFn = ()=> {
        let userInfo = JSON.parse(getStorageFn("userInfo"));
        let supplyPriceStatus = getStorageFn("supplyPriceStatus");
        let supplyPriceStatusValue = "";
        if (supplyPriceStatus == true) {
            supplyPriceStatusValue = 1;
        } else {
            supplyPriceStatusValue = ""
        } 
        this.setState({
            supplyPriceStatus: supplyPriceStatus,
            supplyPriceStatusValue: supplyPriceStatusValue,
            userInfo: userInfo
        })
    }
    reduceFn = (item, index)=> {
        let cartArr = this.state.cartArr;
        
        if (item.goods_num > 1) {
            cartArr[index].goods_num = item.goods_num - 1;
        }
        this.setState({
            cartArr: cartArr
        }, function () {
            this.changeGoodCountFn(cartArr[index])    
            this.totalAll()
        })
    }
    addFn = (item, index)=> {
        let cartArr = this.state.cartArr;
        cartArr[index].goods_num = Number(item.goods_num) + 1;
        this.setState({
            cartArr: cartArr
        }, function () {
            this.changeGoodCountFn(cartArr[index])
            this.totalAll()
        })
    }
    changeGoodCountFn = (selectGood)=> {   
        let _this = this; 
        let formData = new FormData();
        let token = getStorageFn("token");
        let goodsJson = [{"num": selectGood.goods_num,"cart_id":selectGood.id}]
        formData.append("api", "app.cart.updateCart");
        formData.append("accessId", token);
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("goodsJson", JSON.stringify(goodsJson))
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {
            // console.log(res.data)     
        })
    }
    putCountFn = (e, item, index)=> {
        let cartArr = this.state.cartArr;
        let value = e.target.value;
        item.goods_num = value;
        cartArr[index] = item;
        this.setState({
            cartArr: cartArr
        })
    }
    blurGoodCountFn = (goodItem)=> {
        this.changeGoodCountFn(goodItem)
        this.totalAll()
    }
    totalAll = ()=> {
        let _this = this;
        let cartArr = this.state.cartArr;
        let selectAllFlag = 1;
        let totalMoney = 0;
        let totalVol = 0;
        let supplyPriceStatusValue = this.state.supplyPriceStatusValue;
        let totalSelectGoodCount = 0;
        if (cartArr.length>0) {
            cartArr.forEach((item,index)=> {
                if (item.checked == 0 || !item.checked) {
                    selectAllFlag = 0;
                }
                if (item.checked) {
                    if (supplyPriceStatusValue == 1 ||  _this.state.userInfo.roleId) {
                        totalMoney += item.discountPrice * item.goods_num;
                    } else {
                        totalMoney += item.price * item.goods_num;
                    }  
                    totalVol += item.capacity * item.goods_num;
                    totalSelectGoodCount += 1;
                }
            })
        } else {
            selectAllFlag = 0;
            totalMoney = 0;
            totalVol = 0;
        }
        this.setState({
            selectAllFlag: selectAllFlag,
            totalMoney: totalMoney,
            totalVol: totalVol,
            totalSelectGoodCount:  totalSelectGoodCount
        })
    }
    totalSelectGoodFn = ()=> {
        let cartArr = this.state.cartArr;
        let count = 0;
        cartArr.forEach((item, index)=> {       
            if (item.checked == 1) {
                count += 1;
            }
        })

        this.setState({
            totalCount: count
        })
    }
    selectGoodFn = (item, index)=> {
        let cartArr = this.state.cartArr;
        item.checked = item.checked == 1?0:1;
        cartArr[index] = item;
        setStorageFn("cartArr", cartArr)
        this.selectGoodRequestFn(item.id)
        this.setState({
            cartArr: cartArr
        }, function () {
            this.totalAll()
            this.totalSelectGoodFn()
        })
    }
    selectGoodRequestFn = (selectId)=> {   
        let _this = this; 
        let formData = new FormData();
        let token = getStorageFn("token");
        selectId = selectId + "";
        formData.append("api", "app.cart.checkedCart");
        formData.append("accessId", token);
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("cartIds", selectId)
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {

            if (res.data.data) {
            //    _this.getCartInfoFn()
            } else {
                message.error(res.data.message)
            }
        })
    }
    selectAllGoodRequestFn = (selectId, checked)=> {   
        let _this = this; 
        let formData = new FormData();
        let token = getStorageFn("token");
        selectId = selectId + "";
        formData.append("api", "app.cart.checkedAllCart");
        formData.append("accessId", token);
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("cartIds", selectId)
        formData.append("checked", checked)
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {
            if (res.data.data) {
                 _this.totalAll()
            } else {
                message.error(res.data.message)
            }
        })
    }
    selectAllFn = ()=> {
        let cartArr = this.state.cartArr;
        let selectAllFlag = this.state.selectAllFlag==1?0:1;
        let ids = "";
        cartArr.forEach((item,index)=> {
            item.checked = selectAllFlag;
            ids += item.id + ",";
        })
        this.selectAllGoodRequestFn(ids, selectAllFlag)

        this.setState({
            cartArr: cartArr,
            selectAllFlag: selectAllFlag
        })
        this.totalSelectGoodFn()
    }
    deleteGoodConfirmFn = (item, index)=> {
        let _this = this;
        let cartArr = this.state.cartArr;
        let selectAllFlag = this.state.selectAllFlag;
        let deleteId = item.id;
        Modal.confirm({
            title: "温馨提示",
            content: "确认删除吗?",
            cancelText: "取消",
            centered: true,
            okText: "确认",
            onOk: function () {
                _this.deleteGoodFn(deleteId)
            }
        })
    }
    deleteGoodFn = (deleteId)=> {     
        let _this = this;   
        let formData = new FormData();
        let token = getStorageFn("token");
        formData.append("api", "app.cart.delCart");
        formData.append("accessId", token);
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("cartIds", deleteId);
        request({
            url: "/api/gw",              
            method: "POST",    
            data: formData
        }).then((res)=> {
            if (res.data.data) {
               message.success("删除成功")
               _this.getCartInfoFn()
            } else {
                message.error(res.data.message)
            }
        })
    }
    getCartInfoFn = ()=> {
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
            let arr = [];
            if (resData && resData.length > 0) {
                resData.forEach((item, index)=> {
                    if (item.checked == 1) {
                        arr.push(item)
                    }
                })
            }
            _this.setState({
                cartArr: arr
            }, function () {
                _this.totalSelectGoodFn()
                _this.totalAll()
                _this.totleSelectGoodCountFn()
            })
            setStorageFn("cartArr", arr)
        })
    }
    detailAdressFn = (value)=> {
     
        console.log()
    }
    changeInfoFn = (userInfo)=> {
        this.props.changeInfo(userInfo)
    }
    showFn = ()=> {
        console.log(this.props.state.cartState.userInfo)
    }
    deleteSelectAllFn = ()=> {
        let _this = this;
        let cartArr = this.state.cartArr;
        let length = cartArr.length;
        if (length > 0) {
            let selectCount = 0;
            cartArr.forEach((item)=> {
                if (item.checked) {
                    selectCount += 1;
                }
            })
            if (selectCount > 0) {
                Modal.confirm({
                    title: "温馨提示",
                    content: "确认删除吗?",
                    cancelText: "取消",
                    okText: "确认",
                    centered: true,

                    onOk: function () {
                        let deleteIds = "";
                        for (let i=length-1; i>=0; i--) {
                            if (cartArr[i].selectFlag) {               
                                deleteIds += cartArr[i].id + ",";
                            }
                        }     
                        _this.deleteGoodFn(deleteIds)
                    }
                })
            }
        }
    }

    deleteGoodFn = (deleteId)=> {   
        let _this = this; 
        let formData = new FormData();
        let token = getStorageFn("token");
        formData.append("api", "app.cart.delCart");
        formData.append("accessId", token);
        formData.append("storeId", 1);
      
        formData.append("storeType", 6);
        formData.append("cartIds", deleteId)
        request({
            url: "/api/gw",         
            method: "POST",    
      
            data: formData
        }).then((res)=> {
            if (res.data.data) {
               message.success("删除成功")
               _this.getCartInfoFn()
            } else {
                message.error(res.data.message)
            }
        })
    }
    totleSelectGoodCountFn = ()=> {
        let cartArr = this.state.cartArr;
        let length = cartArr.length;
        let totalSelectGoodCount = 0;
        cartArr.forEach((item)=> {
            if (item.checked) {
                totalSelectGoodCount += 1;
            }
        })
        this.setState({
            totalSelectGoodCount: totalSelectGoodCount
        })
    }
    goPayFn = ()=> {
        if (!this.state.isKeep) {
            message.error("请保存客户信息")
            return ;
        }
        if (this.state.totalSelectGoodCount > 0) {
            window.location.href = "/checkcart";
        } else {
            message.error("未选择商品")
        }
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
    setKeepFn = (flag)=> {
        this.setState({
            isKeep: flag
        })
    }
    render () {
        return (    
            <div className="cart_page_con">
                <Header></Header>
                <div className="content_common_width">
                    <div className="search_good_con">
                        <div className="title">普通购买</div>
                        {/* <div className="search_btn"></div>       
                        <Input className="serach_put"/> */}
                    </div>

                    {this.state.cartArr.length>0 && <GoodTable cartArr={this.state.cartArr} totalSelectGoodCount={this.state.totalSelectGoodCount} reduceFn={this.reduceFn} addFn={this.addFn} selectGoodFn={this.selectGoodFn} deleteGoodConfirmFn={this.deleteGoodConfirmFn} putCountFn={this.putCountFn} blurGoodCountFn={this.blurGoodCountFn}></GoodTable>}

                    <UserInfo userInfo={this.props.state.cartState.userInfo} detailAdressFn={this.detailAdressFn} changeInfo={this.changeInfoFn} setKeepFn={this.setKeepFn}></UserInfo>
                </div>
             
                <div className="total_con">    
                    <div className="content_common_width total_con_content">
                        <div className={this.state.selectAllFlag?"item select_all on":"item select_all"} onClick={this.selectAllFn}>全选</div>        
                        <div className="item delete_all" onClick={this.deleteSelectAllFn}>删除选中商品</div>            
                        <div className="item total_count">已选<span className="count"> <span>{this.state.totalCount}</span> </span>件商品</div>
                        {/* <Link to="/checkcart" className="pay_btn">去结算</Link> */}
                        <div className="pay_btn" onClick={this.goPayFn}>去结算</div>
                        {/* <div className="item total_money">￥{this.state.totalMoney}</div>
                        <div className="item total_money_tit">应付总额 </div> */}
                        <div className="item good_money">商品总额: ￥ <span>{this.state.totalMoney}</span></div>
                        <div className="item vol"> 体积: <span>{this.state.totalVol.toFixed(2) }</span> m³ </div>
                    </div>
                </div>
                {/* {this.props.state.commonState.showCartFlag && <SmallCart hideSmallCart={this.props.hideSmallCartFn}  totalCartGoodCountFn={this.totalCartGoodCountFn}></SmallCart>} */}
                { this.props.state.commonState.showSupplyPriceFlag && <PasswordShadow></PasswordShadow>}
                { this.props.state.commonState.showSupplyPriceSwitchFlag && <PasswordShadowSwitch></PasswordShadowSwitch> }
                
                <Footer></Footer>
            </div>
        )
    }
}
   

export default Show;