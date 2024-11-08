import React from "react";
import {Input, Modal, message} from "antd";
import {Link} from "react-router-dom";

import "./index.css";

import imgGood from "../../assets/recomend_good1.png";
import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import {setImgAutoHeightFn} from "../../utils/imgAuto";
import request from "../../api/request";
import requestd from "../../api/requestd";
import Empty from "../Empty";
class CartSmall extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            cartArr: [],
            selectAllFlag: 0,
            totalMoney: 0,
            totalSelectCount: 0,
            setImgHeight: 0,
            supplyPriceStatus: false,
            supplyPriceStatusValue: null
        }
    }
    componentDidMount () {
        this.getCartInfoFn()
    }
    initFn = ()=> {
        let cartArr = this.state.cartArr;
        if (cartArr.length>0) {
            this.setImgHeightFn()
        }
        let supplyPriceStatus = getStorageFn("supplyPriceStatus");   
        let supplyPriceStatusValue = "";
        if (supplyPriceStatus == true) {

            
            supplyPriceStatusValue = 1;
        } else {
            supplyPriceStatusValue = ""
        } 
        this.setState({
            supplyPriceStatus: supplyPriceStatus,
            supplyPriceStatusValue: supplyPriceStatusValue
        })
    }
    setImgHeightFn = ()=> {
        let img = document.querySelectorAll(".info_con .img")[0];
        let setImgHeight = setImgAutoHeightFn(img);
        this.setState({
            setImgHeight: setImgHeight
        })
    }
    selectGoodFn = (item, index)=> {
        let cartArr = this.state.cartArr;

        item.checked = item.checked==1?0:1;
        cartArr[index] = item;
        setStorageFn("cartArr", cartArr)
        this.selectGoodRequestFn(item.id)
        this.setState({
            cartArr: cartArr
        }, function () {
            this.totalAll()
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
            if (res.data) {
     
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
        formData.append("checked", checked);
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {
            if (res.data) {
     
            }
        })
    }
    totalAll = ()=> {
        let cartArr = this.state.cartArr;
        let selectAllFlag = 1;
        let totalMoney = 0;
        let totalSelectCount = 0;
        let supplyPriceStatusValue = this.state.supplyPriceStatusValue;
        if (cartArr.length>0) {
            cartArr.forEach((item,index)=> {
                if (item.checked == 0 || !item.checked) {            
                    selectAllFlag = 0;
                }
                if (item.checked == 1) {
                    if (supplyPriceStatusValue == 1) {
                        totalMoney += item.discountPrice * item.goods_num;
                    } else {
                        totalMoney += item.price * item.goods_num;
                    }
                    totalSelectCount += 1;
                }
            })
        } else {
            selectAllFlag = 0;
            totalMoney = 0;
            totalSelectCount = 0;
        }
        this.setState({
            selectAllFlag: selectAllFlag,
            totalMoney: totalMoney,
            totalSelectCount: totalSelectCount
        })
    }

    selectAllFn = ()=> { 
        let cartArr = this.state.cartArr;
        let selectAllFlag = this.state.selectAllFlag==1?0:1;
        let ids = "";
        cartArr.forEach((item,index)=> {
            item.checked = selectAllFlag ;
            ids += item.id + ",";
        })
     
        this.selectAllGoodRequestFn(ids, selectAllFlag)
        this.setState({
            cartArr: cartArr,
            selectAllFlag: selectAllFlag
        }, function () {
            this.totalAll()
        })
    }
    reduceFn = (item, index)=> {
        let cartArr = this.state.cartArr; 
        if (item.goods_num > 1) {
            cartArr[index].goods_num = item.goods_num - 1;
        }
        this.changeGoodCountFn(cartArr[index])
        this.setState({ 
            cartArr: cartArr

        }, function () {
            this.totalAll()
        })
    }
    addFn = (item, index)=> {
        let cartArr = this.state.cartArr;
        cartArr[index].goods_num = item.goods_num + 1;
        this.changeGoodCountFn(cartArr[index])
        this.setState({
            cartArr: cartArr
        }, function () {
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
            if (res.data.data == true) {
                _this.getCartInfoFn()
            }
        })
    }
    putCountFn = (e, item, index)=> {
        let value = e.target.value;
        item.goods_num = value;
        let cartArr = this.state.cartArr;
        cartArr[index] = item;
        this.setState({
            cartArr: cartArr
        })
    }
    blurGoodCountFn = (goodItem)=> {
        this.changeGoodCountFn(goodItem)
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
            okText: "确认",
            centered: true,
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
    deleteSelectAllFn = ()=> {
     
        let _this = this;
        let cartArr = this.state.cartArr;
        let length = cartArr.length;   
        if (length > 0) {
            let selectCount = 0;
            cartArr.forEach((item)=> {
                if (item.checked == 1) {
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
                            if (cartArr[i].checked == 1) {                        
                                deleteIds += cartArr[i].id + ",";
                            }
                        } 
                        _this.deleteGoodFn(deleteIds)
                    }
                })
            }
        }
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
            _this.setState({
                cartArr: resData
            }, function () {
                _this.totalAll()
                _this.initFn()
                _this.props.totalCartGoodCountFn()
            })
            setStorageFn("cartArr", resData)
        })
    }
    goCartFn = ()=> {
        let token = getStorageFn("token");
        if (!token) {
            message.error("未登录")
            return ;
        }
        let cartArr = this.state.cartArr;
        let selectCount = 0;
        let userInfo = JSON.parse(getStorageFn("userInfo"));
        // let roleId = userInfo.roleId;
        // setStorageFn("supplyPriceStatus", true)

        cartArr.forEach((item, index)=> {
            if (item.checked == 1) {
                selectCount += 1;
            } 
        })
        if (selectCount == 0) {
            message.error("请选择商品")
            return  ;
        }
        if(selectCount > 100){
            message.error("最多选择100件商品")
            return ;
        }
        this.props.hideSmallCart()
        window.location.href = "/cart"; 
    }  
    exportCartFn = ()=> {
        let _this = this;

        let formData = new FormData();
        
        
        let token = getStorageFn("token");
        let cartArr = this.state.cartArr;
        let exportArr = [];
        if (!token) {
              
              message.error("请登录")

              setTimeout(()=> {

                   window.location.href = "/login";
              }, 2000)
              return ;
        }
        if (cartArr.length == 0) {
            message.error("没有商品")
            return ;
        }
        cartArr.forEach((goodItem, index)=>{

            if (goodItem.checked == 1) {
            
                let item = {};
                item.area = goodItem.areaName;
                item.picture = goodItem.imgurl;    
                item.categoryName = goodItem.categoryName;
                item.productCode = goodItem.productCode;
                item.parameters = goodItem.skuName;
                item.marque = goodItem.marque;

                item.material = goodItem.material;
                item.num = goodItem.goods_num ;
                item.price = goodItem.price ;
                exportArr.push(item);
            }
        })
        if (exportArr.length == 0) {

            message.error("请选择商品")

            return ;
        }

        let exportArrStr = JSON.stringify(exportArr);

        formData.append("api", "app.cart.exportGoodsExcel"); 

        formData.append("accessId", token);
        
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("supplierOpen", this.state.supplyPriceStatusValue);
        formData.append("content", exportArrStr)
        formData.append("exportType", 1)
        requestd({
            url: "/api/gw",         
            method: "POST",
            data: formData,
            responseType:'blob'
        }).then((res)=> {
            let blob = new Blob([res.data], {type: "application/actet-stream;charset=utf-8"})
            if ('download' in document.createElement("a")) {
                const elink = document.createElement("a");
                elink.download = "产品销售表"  + ".xls"
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href)
                document.body.removeChild(elink)
            } else {
                navigator.msSaveBlob(blob, "购物车订单"  + ".xls")
            }
        })
    }
    render () { 
        return (
            <div className="show_small_cart">
                <div className="shadow"></div>    
                <div className="cart_small_con">
                    <div className="top_title">
                        <span className="title" onClick={this.setImgHeightFn}>购物车商品</span>
                        <span className="close" onClick={this.props.hideSmallCart}>继续购物</span>
                    </div>    
                    <div className="good_list_con">
                        <ul className="table_title">
                            <li className="select_con"></li>
                            <li className="info_con">商品信息</li>
                             
                            {this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 &&<li className="price">供货价(元)</li>}
                            {this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" &&<li className="price">单价(元)</li>}

                            <li className="count_con">数量</li>
                            <li className="sub_total">金额(元)</li>
                            <li className="operate">操作</li>
                        </ul>

                        <ul className="good_list">
                            {
                                this.state.cartArr.length>0 && this.state.cartArr.map((item, index)=> {
                                    return (
                                        <li key={index}> 
                                            <div className="select_con">

                                                <div className={item.checked==1?"select on":"select"} onClick={()=>{this.selectGoodFn(item, index)}}></div>
                                            </div>
                                            <div className="info_con">
                                                
                                                <div className="img" style={{height: this.state.setImgHeight + "px"}}>
                                                    <img src={item.imgurl} alt=""/>  
                                                </div>

                                                <div className="info">
                                                    <div className="txt"> { item.product_title } </div>
                                                    <div className="tit">{ item.skuName }</div>
                                                </div>
                                            </div>
            
                                            {this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 &&<div className="price">{ item.discountPrice }</div>}
                                            {this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" &&<div className="price">{ item.price }</div>}
                                            <div className="count_con">
                                                    <div className="btn reduce" onClick={()=>{this.reduceFn(item, index)}}>-</div>
                                                    <Input className="count" value={item.goods_num} onChange={(e)=> {this.putCountFn(e, item, index)}} onBlur={()=>{this.blurGoodCountFn(item)}}/>
                                                    <div className="btn" onClick={()=>{this.addFn(item, index)}}>+</div>      
                                            </div>


                                            {this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 && <div className="sub_total"> { item.discountPrice * item.goods_num } </div> }
                                            {this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" &&  <div className="sub_total"> { item.price * item.goods_num } </div>}

                                            
                                            <div className="operate_con">
                                                <div className="delete" onClick={()=>{this.deleteGoodConfirmFn(item, index)}}></div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        {this.state.cartArr.length == 0 && <Empty></Empty>}
                    </div>    

                    <div className="total_con">
                        <div className={this.state.selectAllFlag?"select_all on":"select_all"} onClick={this.selectAllFn}>全选</div>
                        <span className="delete_all" onClick={this.deleteSelectAllFn}>删除选中商品</span>
                        {/* <Link to="/cart" className="go_cart_btn">下单采购</Link> */}

                        <div className="go_cart_btn" onClick={this.goCartFn}>下单采购</div>

                        {/* <div className="go_cart_btn" onChange={this.props.goCartFn}>下单采购</div> */}
                        <div className="down_btn" onClick={this.exportCartFn}>导出清单</div>
                      
                        <div className="total">合计<span className="money">￥{this.state.totalMoney}</span></div>
                        <div className="total_good">已选 <span className="count">{this.state.totalSelectCount}</span> 件商品</div>
                    </div>  
                </div>
            </div>
        )
    }
}


export default CartSmall;