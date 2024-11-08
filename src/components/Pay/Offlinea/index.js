import React from "react";
import {Input, DatePicker, Upload, Modal, message} from "antd";
import {setStorageFn, getStorageFn} from "../../../utils/localStorage";
import {DeleteOutlined} from '@ant-design/icons';
import request from "../../../api/request";

import "./index.css";
class Offlinea extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            title: "结算通",
            balanceFlag: false,
            payList: [
                {

                    id: 0,
                    txt: "微信支付",
                    imgSrc: require("../../../assets/icon/pay_wechat.png"),
                    selectFlag: true
                },
                {

                    id: 1,
                    txt: "支付宝支付",
                    imgSrc: require("../../../assets/icon/pay_alipay_pay.png"),
                    selectFlag: false
                },
                {
                    id: 2,
                    txt: "网银支付",
                    imgSrc: require("../../../assets/icon/pay_unionpay.png"),
                    selectFlag: false
                }
            ],

            payTypeIndex: 0,
            
            
            uploadImg: require("../../../assets/icon/add_pic.png"),


            date: "",
            fileList: [],
            uploadFlag: true,
            orderNumber: "",

            bankText: "",

            codeImg: require("../../../assets/footer_code1.png")
        }
    }

    componentDidMount () {
        this.init()
    }
    init = ()=> {
        let orderNumber = getStorageFn("orderNumber");
        this.setState({
            orderNumber: orderNumber
        })
    }
    selectBalanceFn = ()=> {
        let balanceFlag = !this.state.balanceFlag;
        this.setState({
            balanceFlag: balanceFlag
        })
    }

    selectPayFn (index) {
        let payList = this.state.payList;
        payList.forEach((item, i)=>{            
            item.selectFlag = false;               
            if (i===index) {
                item.selectFlag = true
            }
        })
        this.setState({
            payList: payList,
            payTypeIndex: index
        })
    }

    // selectDateFn = (date, dateString)=> {
    //     this.setState({
    //         date: dateString
    //     })
    // }
    selectDateFn = (e)=> {
        let value = e.target.value;        
        this.setState({
            date: value
        })
    }
    selectImgFn = (e) => {
        let _this = this;
        if (e.target.files.length === 0) return false;
        const fileArr = e.target.files;
        for (let key in fileArr) {


            if (fileArr[key].type) {
                console.log("fileArr[key]")
                console.log(fileArr[key])    
                _this.uploadImgFn(fileArr[key])
            }
        }
    }
    uploadImgFn = (file) => {
        let _this = this;
        let token = getStorageFn("token");
        let formData = new FormData();
        let fileList = this.state.fileList;
        formData.append("api", "resources.file.uploadFiles");
        formData.append("accessId", token);  
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("title", file.name );
        formData.append("file", file)
        
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            let imgSrc = res.data.data.imgUrls[0];
            if (fileList.length <5) {
                fileList.push(imgSrc)
                _this.setState({
                    fileList: fileList
                })
            }
        })
    };

    deleteImgFn = (item, index)=> {
        let _this = this;
        let fileList = this.state.fileList;
        Modal.confirm({
            title: '温馨提示',
            content: "确认删除吗?",
            cancelText: "取消",
            okText: "确定",
            onOk: function () {
                fileList.splice(index, 1)   
                _this.setState({
                    fileList: fileList
                })
            }
        })   
    }
    bankFn = (e)=> {
        let value = e.target.value;
        // console.log(value)
        this.setState({
            bankText: value
        })
    }
    submitFn = ()=> {
        let _this = this;
        let token = getStorageFn("token");
        let orderNumber = this.state.orderNumber;
        let formData = new FormData();
        
        let imgStr = "";
        let fileList = this.state.fileList;
        fileList.forEach((item)=>{
            imgStr += item;
        })
        formData.append("api", "app.orderV2.balancePay");
        formData.append("accessId", token);  
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("orderParentNo",  orderNumber);
        formData.append("offlinePayBank", this.state.bankText);
        formData.append("offlinePayImg", imgStr)
        formData.append("offlinePayTime", this.state.date)
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            if (res.data.code == 200) {
                message.success(res.data.message)
                setTimeout(()=>{
                    window.location.href = "/payover"
                }, 2000)
            } else {
                message.error(res.data.message)
            }
        })
    }
    render () {
        return (
            <div className="offline_con">
                <div className="balance_con">
                    <div className={this.state.balanceFlag?"balance on":"balance"} onClick={this.selectBalanceFn}>
                        <div className="title">账户余额</div>
                        <div className="money"><span className="unit">￥</span> 21005.00</div>
                    </div>
                    <div className="balance_pay">账户余额支付: <span>1000 元 </span></div>
                </div>


                <ul className="pay_list">
                    {this.state.payList.map((item, index)=> {
                        return (<li className={item.selectFlag?"on":""} key={index} onClick={()=>{this.selectPayFn(index)}}> 
                                    <img src={item.imgSrc} alt=""/>
                                    <span className="txt"> {item.txt} </span>
                                </li>)
                    })}
                    <div className="money">转账支付: <span>{this.props.payTotal.totalPrice} 元</span></div>
                </ul>
                <div className="line"></div>
 
               {/*  <div className="pay_btn">立即支付</div> */}
                
                {this.state.payTypeIndex != 2 && <div className="bank_info_con">
                   
                     <img src={this.state.codeImg} alt="" className="code_img"/>
                </div>}

                {this.state.payTypeIndex != 2 && <div className="sub_btn_dis"></div>}
                {this.state.payTypeIndex == 2 && <div className="sub_btn" onClick={this.submitFn}>提交</div>}
            </div>
        )
    }
}
export default Offlinea;