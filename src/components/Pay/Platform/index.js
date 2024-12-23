import React from "react";
import "./index.css";
import phoneImg from "../../../assets/icon/wechat_example.png";

import applyImg from "../../../assets/icon/alipay_example.png";
import code from "../../../assets/icon/ewm.png";
class Platform extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            title: "结算通",
            balanceFlag: false,
            payList: [
                {
                    id: 0,
                    txt: "微信扫码付",
                    imgSrc: require("../../../assets/icon/pay_wechat.png"),
                    selectFlag: true
                },
                {
                    id: 1,
                    txt: "支付宝扫码付",
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
            payTypeIndex: 0
        }
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
    render () {
        return (
            <div className="platform_con">
                {/* <div className="balance_con">
                    <div className={this.state.balanceFlag?"balance on":"balance"} onClick={this.selectBalanceFn}>
                        <div className="title">    
                            账户余额
                        </div>
                        <div className="money"><span className="unit">￥</span> 21005.00</div>
                    </div>
                    <div className="balance_pay">账户余额支付: <span>21005.00</span></div>
                </div> */}
                <ul className="pay_list">
                    {this.state.payList.map((item, index)=> {
                        return (<li className={item.selectFlag?"on":""} onClick={()=>{this.selectPayFn(index)}}> <img src={item.imgSrc} /> {item.txt}</li>)
                    })}

                    {/* <div className="money">其他支付: <span>22005.00</span></div> */}
                    <div className="money">转账支付: <span>{this.props.payTotal.totalPrice} 元</span></div>
                </ul>
                <div className="line"></div>
 
               {/*  <div className="pay_btn">立即支付</div> */}
                
               {this.state.payTypeIndex == 0 && <div className="code_con">
                    <div className="title">微信支付</div>                   
                    <div className="tit">微信支付二维码将在<span> { this.props.dateText } </span> 后失效, 请尽快完成支付, 转发无效! 如您在操作过程中出现问题, 请刷新页面重新完成支付, 谢谢!</div>
                    <div className="code_img_con">
                        <div className="left">
                            <div className="code">
                                <img src={code} alt=""/>
                            </div>
                            <div className="txt">请使用微信扫一扫 扫描二维码支付</div>
                           
                        </div>
                        <img src={phoneImg} className="phone_img"/>  
                    </div>
                </div>}


                {this.state.payTypeIndex == 1  && <div className="code_con">
                    <div className="title">支付宝支付</div>                   
                    <div className="tit">支付宝支付二维码将在<span> { this.props.dateText } </span> 后失效, 请尽快完成支付, 转发无效! 如您在操作过程中出现问题, 请刷新页面重新完成支付, 谢谢!</div>
                    <div className="code_img_con">
                        <div className="left">
                            <div className="code">
                                <img src={code} alt=""/>
                            </div>
                          
                             <div className="txt">请使用支付宝扫一扫 扫描二维码支付</div>
                        </div>
                      
                        <img src={applyImg} className="phone_img"/> 
                         
                    </div>
                </div>}

                {this.state.payTypeIndex == 2 && <div className="sub_btn" onClick={this.submitFn}>立即支付</div>}
            </div>
        )
    }
}



export default Platform;