import React from "react";
import {Row, Col} from "antd";
import {InfoCircleOutlined} from '@ant-design/icons';

import Header from "../../components/Header";

import Footer from "../../components/Footer";
import Platform from "../../components/Pay/Platform";

import Offline from "../../components/Pay/Offline";
import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import "./index.css";
  
let now = new Date();
let endTime = new Date(now.setDate(now.getDate() + 7));

class Pay extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            dateText: "",
            set: 0,
            orderNumber: "",
            payTotal: {
                totalVolume: 0, 
                totalPrice: 0, 
                taxation: 0 
            },
            // payImg: require("../../assets/pay_instruction.png"),
            payImg: "https://luockoo.oss-cn-shenzhen.aliyuncs.com/file/pay_instruction.png",
            llustrateFlag: false
        }
    }
    componentDidMount () {        
        this.init()
    
        this.ltTime()
    }

    componentWillUnmount () {
        clearInterval(this.state.set)
    }
    init = ()=> {

        let orderNumber = getStorageFn("orderNumber"); 

        let payTotal = this.state.payTotal;
        let payOption = JSON.parse(getStorageFn("payOption"));                
        this.setState({
            orderNumber: orderNumber,
            payTotal: payOption
        })
    }
    ltTime = ()=> {
        let _this = this;
        var curTime = new Date();  
        var leftTime= parseInt((endTime.getTime()-curTime.getTime())/1000);
        var d=parseInt(leftTime/(60*60*24));
        var h=parseInt(leftTime/(60*60)%24);
        var m=parseInt(leftTime/60%60);
        var s=parseInt(leftTime%60);
        if (h<10) {
            h = "0" + h;
        }

        if (m<10) {
            m = "0" + m;
        }
        if (s<10) {
            s = "0" + s;
        }
        let dateText = d + "天" + h + "时" + m + "分" + s + "秒";
        if(leftTime <= 0) {
            dateText = "支付时间";
        }
        this.setState({
            dateText: dateText
        })

        let set = setTimeout(()=>{
            _this.ltTime()
        }, 1000);
        this.setState({
            set: set
        })
    }
    showFn = ()=> {
        this.setState({
            llustrateFlag: true
        })
    }
    hideFn = ()=> {
        this.setState({
            llustrateFlag: false
        })
    }
    render () {
        return (
            <div className="pay_page_con">
                    <Header></Header>
                    <div className="content_common_width">
                        <div className="order_title_con">
                            {/* <div className="order_status"></div> */}
                            <div className="title_con">
                                <div className="last_time_tit">订单提交成功, 请您在 <span className="last_time">{this.state.dateText}</span> <span className="last_txt">内完成支付, 否则订单会被自动取消!</span></div>
                                <div className="txt">
                                    <span className="item">订单编号: {this.state.orderNumber}</span>
                                    <span className="item">应付款金额: {this.state.payTotal.totalPrice}元</span>
                                </div>
                                {/* <div className="txt">本次支付金额: <span className="money"> {this.state.payTotal.totalPrice}元</span> </div> */}
                            </div>
                        </div>

                        <div className="pay_con">
                            <div className="top">
                                <ul className="nav_list">                 
                                    <li style={{display:"none"}}>结算通</li>
                                    <li>线下汇款</li>
                                </ul>

                                <span className="tit" onClick={this.showFn}><InfoCircleOutlined /> 付款说明</span>
                            </div>

                            {/* <Platform ></Platform>  */}

                            <Offline payTotal={this.state.payTotal}></Offline>
                        </div>
                    </div>


                    {this.state.llustrateFlag && <div className="illustrate_con">
                        <div className="shadow">
                            <img src={this.state.payImg}/>
                        </div>
                        <img src={this.state.payImg} className="img" onClick={this.hideFn}/>
                    </div>}


                    <Footer></Footer>
            </div>
        )
    }
}
export default Pay;