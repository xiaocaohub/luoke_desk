import React from "react";
import { Link } from "react-router-dom";
import {Steps, Table, Button, message, Modal  } from "antd";

import goodImg from "../../assets/recomend_good1.png";

import {setStorageFn, getStorageFn} from "../../utils/localStorage";

import request from "../../api/request";

import Header from "../../components/People/Header";
import "./index.css";

const { Step } = Steps;
class PeopleOrderDetail extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            orderNumber: "",
            orderArr: [],

            orderInfo: "",
            orderStatus: "",
            supplyPriceStatus: false,
            
            supplyPriceStatusValue: null,
            userInfo: "",
            menuList: [
                {
                    id: 0,
                    title: "订单列表",
                    path: "/people_order_list"
                }
                // {
                //     id: 1,
                //     title: "定制订单",
                //     path: "/people/order/list"
                // }
            ],
            navIndex: 0
        }
    }
    componentDidMount () {
       this.getOrderNumberFn()
       this.initFn()
    }

    selectNavFn = (index)=> {
     
        this.setState({
            navIndex: index
        })
    }
    initFn = ()=> {
        let supplyPriceStatus = getStorageFn("supplyPriceStatus");
        let supplyPriceStatusValue = "";
        
        let userInfo = JSON.parse(getStorageFn("userInfo"));
     

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
    getOrderNumberFn = ()=> {
        let orderNumber = window.location.href.split("id=")[1];
       
        // let search = window.location.search;
        // let searchArr = search.split("&&");

        // let orderNumber = searchArr[0].split("id=")[1];
        // let orderStatus = searchArr[1].split("=")[1];

  
        this.setState({

            orderNumber: orderNumber
        }, function () {
            this.getOrderDetialFn()
        })
    }
    getOrderDetialFn = (optionIds)=> {
        let _this = this;


        let formData = new FormData();        
        let token = getStorageFn("token");
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;

        formData.append("api", "app.orderV2.orderDetail");
        
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("accessId", token);
        formData.append("orderParentNo", this.state.orderNumber);   
        request({
            url: "/api/gw",
            method: "POST",      
            data: formData
        }).then((res)=> {

            let resData =  res.data.data;
            let orderArr = [];
            
            if (resData) {
                orderArr =  resData.orders;
            }
            let orderStatus = resData.status;
            if (orderStatus === 5) {

                orderStatus += 2;
            }
            _this.setState({
            
                orderInfo: resData,
                orderArr: orderArr,
                orderStatus: orderStatus
            })
        })
    }
    orderStatusFn = (status)=> {
        let orderStatus = this.state.orderStatus;
        if (orderStatus == 7) {
            status = 6;
        }


        switch (status) {
            case 0:
                return "--";
                break ;
            case 1: 
                return "待付款";
                break;
            case 2: 
                return "审核中"; //"备货中"
                break;
            case 3:
                return "备货中" 
                break;
            case 4:
                return "已发货";
                break;
            case 5:
                return "待收货";
                break;  
            case 6:
                return "已完成";
                break;
        }
    } 
    showCancelBrnFn = (status)=> {
        switch (status) {
            case 1: 
               return true;
               break;
            default:
                return false;
                break;
        }
    }
    showPayBtnFn = (status)=> {
        switch (status) {
            case 1: 
               return true;
               break;
            default:
                return false;
                break;
        }
    }
    cancelOrderFn = ()=> { 
        let _this = this;

        let formData = new FormData();
        let token = getStorageFn("token");
        formData.append("api", "app.orderV2.cancelOrder");    
        formData.append("accessId", token);  
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("orderParentNo",  this.state.orderNumber); 
        
        Modal.confirm({
            content: "确认取消吗?",
            okText:"确认",
            cancelText: "取消",
            title: "温馨提示",
            centered: true,
            onOk: function () {

                request({
                    url: "/api/gw",
                    method: "POST",    
                    data: formData
                }).then((res)=> {

                    if (res.data.code == 200) {
                        message.success(res.data.message)
                        setTimeout(()=> {
                            window.location.href = "/people_order_list"; 
                        }, 2000)
                            
                    } else {
                        message.error(res.data.message)
                    }
                })
            }
        })
    }

    goPayFn = ()=> {
        let totalPrice = this.state.orderInfo.payPrice;
        let payOption = {
            totalVolume: 0,
            totalPrice: totalPrice,
            taxation: 0
        }
        let orderNumber = this.state.orderNumber;
        setStorageFn("orderNumber", orderNumber)

        setStorageFn("payOption", JSON.stringify(payOption))
        window.location.href = "/pay";
    }
    render () {
        return (
            <div className="people_order_list_con">
                <Header></Header>
                <div className="people_order_con">
                    <div className="left_content">
                        <div className="title"><span>订单管理</span></div>



                        <ul className="menu_list">        
                            {this.state.menuList.map((item, index)=> {
                                return (<li className={this.state.navIndex==index?"on":""} key={index} onClick={()=>{this.selectNavFn(index)}}> <Link to={item.path}>{ item.title }</Link></li>) 
                            })}
                        </ul>
                    </div>

                    <div className="main_content">
                        <div className="people_order_detail">
                            <div className="step_con">
                                {this.state.orderInfo.status>0 && <Steps current={ this.state.orderStatus  }> 
                                    <Step title="提交订单" description="" />
                                    <Step title="待付款" description="" />
                                    <Step title="审核中" description="" />
                                    <Step title="配货中" description="" />
                                    <Step title="已发货" description="" />
                                    <Step title="待收货" description="" />
                                    <Step title="已完成" description="" />
                                </Steps>}
                            </div>

                            <ul className="order_dedtail_con">                    
                                <li>
                                    <div className="title" onClick={this.getOrderDetialFn}>订单信息 </div>
                                    <ul className="order_info_list">
                                    
                                    
                                        <li><span className="tit">主订单号:</span> {this.state.orderInfo.orderParentNo}</li>
                                        <li><span className="tit">下单时间:</span>  {this.state.orderInfo.createTime}</li>
                                        <li><span className="tit">下单账号:</span>  {this.state.orderInfo.userName}  {this.state.orderInfo.userTel}</li>
                                        <li><span className="tit">客户信息:</span>
                                        {this.state.orderInfo.name} {this.state.orderInfo.mobile} {this.state.orderInfo.provice}{this.state.orderInfo.city}{this.state.orderInfo.area} {this.state.orderInfo.address}
                                        </li>
                                        <li><span className="tit">应付总额:</span> <span className="total_money">¥ {this.state.orderInfo.payPrice}</span></li>
                                    </ul>

                                    <div className="operate_btn_list">
                                        {this.showPayBtnFn(this.state.orderInfo.status) && <div to="/pay" className="btn" onClick={this.goPayFn}>去付款</div>}
                                        {this.showCancelBrnFn(this.state.orderInfo.status) && <div className="btn" onClick={this.cancelOrderFn}>取消订单</div>}

                                        {/* <div className="btn">导出订单</div> */}
                                        {/* <div className="btn">再次购买</div> */}
                                    </div>
                                </li>


                                <li>
                                <div className="title">订单跟踪</div>
                                    {this.state.orderInfo && <Steps direction="vertical" current={this.state.orderInfo.messages.length} className="vertical_step">
                                        { this.state.orderInfo.messages.map((item, index)=> {
                                            return (<Step key={index} title={item.messageContent} description={new Date(item.createTime).toLocaleString()} />)
                                        })}
                                        
                                    </Steps>}
                                </li>
                            </ul>

                            <ul className="order_collapse_info_list">
                                <li>
                                    <div className="title">收货信息</div>

                                    <ul className="order_info_list">
                                        <li><span className="tit">收货人:</span> {this.state.orderInfo.name}</li>
                                        <li><span className="tit">手机号:</span> { this.state.orderInfo.mobile }</li>
                                        <li><span className="tit">收货地址:</span>  {this.state.orderInfo.provice}{this.state.orderInfo.city}{this.state.orderInfo.area} {this.state.orderInfo.address}</li>
                                        <li>
                                            <span className="tit">期望发货时间:</span> 
                                            {this.state.orderInfo.expectedDeliveryTime?this.state.orderInfo.expectedDeliveryTime:"--"} 
                                            
                                            {/* <span className="change_time">更改时间</span> */}
                                        </li>
                                    </ul>
                                </li>
                                
                                <li>
                                    <div className="title">付款信息</div>
                                    <ul className="order_info_list">
                                        <li><span className="tit">商品总价:</span> ¥ {this.state.orderInfo.totalPrice}</li>

                                        {/* <li><span className="tit">商品税额:</span> ¥ {this.state.orderInfo.taxation}</li> */}
                                        <li><span className="tit">应付总额:</span> ¥ { this.state.orderInfo.payPrice }</li>
                                        {/* <li><span className="tit">付款时间:</span> {this.state.orderInfo.offlinePayTime?this.state.orderInfo.offlinePayTime:"--"} </li> */}
                                        <li><span className="tit">付款时间:</span> {this.state.orderInfo.prepaymentTime?this.state.orderInfo.prepaymentTime:"--"} </li>
                                        <li><span className="tit">付款方式:</span>  线下汇款 </li>
                                    </ul>
                                </li>

                                {/* <li>
                                    <div className="title">发票信息</div>
                                    <ul className="order_info_list">
                                        <li><span className="tit">发票类型:</span> 202407030000422</li>

                                        <li><span className="tit">发票抬头:</span> 2024-07-03</li>
                                        <li><span className="tit">发票内容类型:</span> 张三 1001000</li>
                                        <li><span className="tit">收货地址:</span> 黄s 1001000 广东省深圳市龙岗区黄屋村</li>                            
                                        <li><span className="tit">纳税人识别号:</span> 11323234545425335</li>
                                    </ul>
                                </li> */}
                            </ul>


                            <div className="order_good_info_list_con">

                                <div className="title">订单商品</div>
                                {this.state.orderArr.length>0 && this.state.orderArr.map((orderItem, index)=>{
                                    return (         
                                        <div className="order_good_table">
                                            <div className="table_title">
                                                <div className="good_info">商品信息</div>
                                                <div className="size">规格</div>
                                                <div className="vol">体积(m³)</div>
                                                
                                                {this.state.userInfo.roleId && <div className="price"> 供货单价 (元)</div>}
                                                {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 && <div className="price"> 供货单价 (元)</div>}
                                                {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" && <div className="price">销售单价(元)</div>}
                                                <div className="count">数量</div>
                                                {/* <div className="return_goods_count">退货数量</div> */}
                                                <div className="total_money">合计金额(元)</div>
                                                <div className="status">状态</div>
                                            </div>
                    

                                            <ul className="good_list">
                                                {orderItem.details.length>0 && orderItem.details.map((goodItem, i)=> {
                                                    return (
                                                        <li>
                                                            <div className="good_info">
                                                                <img src={ goodItem.imgurl } alt="" className="good_img"/>                                        
                                                                <div className="text_con">
                                                                    <div className="tit">{goodItem.productName}</div>
                                                                    <p className="txt">编码: {goodItem.productCode} </p>
                                                                    
                                                                    <p className="txt">型号: {goodItem.marque}</p>
                                                                
                                                                
                                                                </div>
                                                            </div>
                                                            <div className="size"><span>{goodItem.attribute}</span></div>
                                                            <div className="vol">{ goodItem.totalVolume }</div>
                                                            <div className="price">{goodItem.supplierPrice}</div>
                                                            <div className="count">{ goodItem.num }</div>

                                                            {/* <div className="return_goods_count">1</div> */}

                                                            <div className="total_money">{ goodItem.totalSupplierPrice }</div>


                                                            <div className="status">{this.orderStatusFn(goodItem.status)} </div>
                                                        </li>
                                                    )
                                                })}  
                                            </ul>
                                            <p className="time_txt factory_name">生产工厂: { orderItem.mchName }</p>
                                            <p className="time_txt">子订单号: {orderItem.orderNo?orderItem.orderNo:"--"} </p>
                                            
                                            
                                            <p className="time_txt">预计发货时间: {orderItem.estimatedDeliveryTime?orderItem.estimatedDeliveryTime:"--"}</p>
                                            <p className="time_txt">实际发货时间: {orderItem.realDeliveryTime?orderItem.realDeliveryTime:"--"}</p>
                                    
                                            <p className="time_txt">备注信息: {orderItem.remark?orderItem.remark:"--"}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

           
        )
    }
}



export default PeopleOrderDetail;