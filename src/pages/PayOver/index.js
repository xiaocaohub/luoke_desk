import React from "react";
import {Row, Col} from "antd";
import {Link} from "react-router-dom";

import Header from "../../components/Header";

import Footer from "../../components/Footer";
import {getStorageFn} from "../../utils/localStorage";

import {scrollTopFn} from "../../utils/imgAuto";
import "./index.css";
class PayOver extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

            orderNumber: ""
        }
    }
    componentDidMount () {
        this.init()

        scrollTopFn()
    }
    init () {

        let  orderNumber = getStorageFn("orderNumber");
        this.setState({
            orderNumber: orderNumber
        })
    }
    render () {
        return (
            <div className="pay_over_con">





                    <Header></Header>  
                    <div className="content_common_width">
                        <div className="pay_over_text_con">
                            <div className="pay_over_text">

                                <div className="icon"></div>
                                
                                <div className="text_con">
                                    <div className="big_tit">您已成功付款，我们尽快为您处理</div>    
                                    <p>订单编号: {this.state.orderNumber}</p>
                                    <p><Link to={ "/people_order_detail?id=" + this.state.orderNumber }>查看订单详情</Link> <Link to="/">继续逛逛</Link></p>
                                    <div className="line"></div>
                                    <p>重要提示：下单后, <span>珞珂平台及销售商不会以订单异常、系统升级为由, 要求您点任何链接进行退款！</span></p>
                                    <p>请提高警惕，谨防假冒客服电话诈骗</p>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
            </div>
        )
    }
}


export default PayOver;