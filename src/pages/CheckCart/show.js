import React from "react";
import {Row, Col, DatePicker, Button, message, Input} from "antd";
import { RightOutlined } from '@ant-design/icons';

import Header from "../../components/Header";

import Footer from "../../components/Footer";
import GoodTable from "../../components/CheckCart/GoodTable";
import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import PasswordShadow from "../../components/Home/PasswordShadow";
import PasswordShadowSwitch from "../../components/Home/PasswordShadowSwitch";
import request from "../../api/request";
import moment from "moment";
import zhCN from "antd/es/date-picker/locale/zh_CN";
import 'moment/locale/zh-cn';

import "./index.css";

moment.locale('zh-cn')
class Show extends React.Component {
    constructor (props) {

        super(props)
        this.state = {
            cartArr: [], 

            orderInfo: "",
            orders: [],
            totalVolume: 0, 
            totalPrice: 0, 
            taxation: 0, 
            orderFlag: true,
            date: "",
            userInfo: ""
        }
    }
    componentDidMount () {
    
    
        this.getCartInfoFn()    
    }
    // init = ()=> {
    //     let userInfo = JSON.parse(getStorageFn("userInfo"));
    //     this.setState({
    //         userInfo: userInfo
    //     })
    // }
    getSelectIdsFn = ()=> {
        let _this = this;
        let cartArr = this.state.cartArr;
        let ids = "";
        cartArr.forEach((item, index)=> {
            if (item.checked) {
                ids += item.id + ",";
            }
        })
        setTimeout(()=>{
            _this.getCartListFn(ids)
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
            let resData = res.data.data.data || [];
            setStorageFn("cartArr", resData)

            _this.setState({
                cartArr: resData
            }, function () {
                _this.getSelectIdsFn()
            })
        })
    }
    getCartListFn = (selectId)=> {
        let orderFlag = this.state.orderFlag;

        this.setState({
            orderFlag: false
        })
        if (!orderFlag) {
            return ;
        }
        let _this = this;   
        let formData = new FormData();
        let token = getStorageFn("token");
        
        formData.append("api", "app.orderV2.confirmOrder");
        formData.append("accessId", token);  
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("cartIds",  selectId);
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {
            let resData = res.data.data  || [];
            let orders =  [];
            if (resData.orders && resData.orders.length>0) {
                orders = resData.orders;
            }
            orders.forEach((item, index)=>{
                item.remark = "";
            })
     
            
            let payOption = {         
                totalVolume: resData.totalVolume, 
                totalPrice: resData.totalPrice, 
                taxation: resData.taxation 
            }
            setStorageFn("payOption", JSON.stringify(payOption))
            this.setState({     
                orderInfo: resData,
                orders: orders,

                totalPrice: resData.totalPrice,
                taxation: resData.taxation,
                totalVolume: resData.totalVolume
            })
        })
    }
    payOrderFn = ()=> {
        let _this = this;        
        let formData = new FormData();

        let token = getStorageFn("token");
        
        
        let orderInfo = this.state.orderInfo;
        let orders = this.state.orders;
        let remarks = [];
        orders.forEach((item, index)=>{

            let orderItem = {
            
                mchId: item.mchId,
                remark: item.remark
            }
            remarks.push(orderItem)
        })

        let skuNums = [];
        let orderList = orders[0].details;
        orderList.forEach((orderItem, index)=> {
            let item = {num: orderItem.num, skuId: orderItem.skuId}
            skuNums.push(item)
        })
        let skuNumsStr = JSON.stringify(skuNums);
        
        let userInfoDetail = getStorageFn("userInfoDetail");
        if (!this.state.date) {
            message.error("请选择日期")
            return ;
        }
        formData.append("api", "app.orderV2.placeOrder");   
        formData.append("accessId", token);  
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("cartIds", orderInfo.cartIds); 
        formData.append("taxType", 0); 
        formData.append("taxName", ""); 
        formData.append("taxCardNo", ""); 
        formData.append("expectedDeliveryTime", this.state.date); 
        formData.append("organization", ""); 

        formData.append("taxpayerNumber", ""); 
        formData.append("taxAddress", ""); 
        formData.append("taxPhone", ""); 
        formData.append("taxAccount", ""); 
        formData.append("taxBank", "");
        formData.append("name", userInfoDetail.recipient); 
        formData.append("sheng", userInfoDetail.province); 
        formData.append("city",  userInfoDetail.city);
        formData.append("quyu",  userInfoDetail.area);
        formData.append("address",  userInfoDetail.detailAdress);
        formData.append("tel",  userInfoDetail.phone);
        formData.append("invoice", 1);
        formData.append("skuNums", skuNumsStr)
        formData.append("remarks", JSON.stringify(remarks))
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {
            if (res.data.code == 200) {
                setStorageFn("orderNumber", res.data.data);
                message.success(res.data.message)
                setTimeout(()=>{
                    _this.props.history.push("/pay")
                }, 2000)     
            } else {
                message.error(res.data.message)
            }
        })
    }

    selectDateFn = (e)=> {
        let value = e.target.value;        
        this.setState({
            date: value
        })
    }
    remarkFn = (index, value)=> {
        let orders = this.state.orders;
        orders[index].remark = value;
    
        this.setState({
            orders: orders
        })
    }
    render () {
        return (   
            <div className="check_cart_page">
                <Header></Header>
                    


                <div className="content_common_width">
                    {this.state.orders.length>0 && this.state.orders.map((orderItem, index)=> {
                        return (<GoodTable orderItem={orderItem} key={index} index={index} remarkFn={this.remarkFn}></GoodTable>)
                    })}
                    
                    <ul className="invoice_info_con">
                        <li>
                            <div className="title">期望发货时间</div>             
                            {/* <DatePicker onChange={this.selectDateFn} locale={zhCN} ></DatePicker> */}
                            {/* <input type="date" style={{display:"block",width:"250px",height: "32px", border:"1px solid #d9d9d9"}} onChange={this.selectDateFn} placeholder="请选择日期"/> */}
                           

                            <Input type="date" value={this.state.date} className="date_con" placeholder="年-月-日" onChange={this.selectDateFn} />
                        </li>
                        {/* <li>
                            <div className="title">发货说明</div>
                            <div className="txt">                         
                                1.现货订单我们将在期望发货时间内发货。 <br/>
                                2.无现货订单，发货时间以实际生产周期为准。
                            </div>
                        </li> */}
            

                        <li style={{display:"none"}}>
                            <div className="title">开票信息</div>           
                            <div className="invoice_select">开票</div>
                            <div className="invoice_btn">请完善发票信息<RightOutlined /></div>
                        </li>
                    </ul>
                </div>
           
           

                <div className="total_con">
                    <div className="total_list_con content_common_width">
                        <div className="order_btn" onClick={this.payOrderFn}>提交订单</div>
                        <ul className="total_list">
                            <li>体积: {this.state.totalVolume>0?this.state.totalVolume.toFixed(2):this.state.totalVolume}m²</li>
                            {/* <li>税额: ￥{this.state.taxation}</li> */}
                            <li>商品总额: ￥{this.state.totalPrice}</li>
                            <li>应付总额:</li>
                            {/* <li className="money">￥{this.state.totalPrice + this.state.taxation} </li> */}
                            <li className="money">￥{this.state.totalPrice } </li>
                            
                        </ul>
                    </div>
                </div>
                <Footer></Footer>
                { this.props.state.commonState.showSupplyPriceFlag && <PasswordShadow></PasswordShadow>}
                { this.props.state.commonState.showSupplyPriceSwitchFlag && <PasswordShadowSwitch></PasswordShadowSwitch> }
            </div>
        )
    }
}



export default Show;