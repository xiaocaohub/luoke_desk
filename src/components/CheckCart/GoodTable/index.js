import React from "react";
import {Link} from "react-router-dom";
import {Input, Row, Col} from "antd";

import {setStorageFn, getStorageFn} from "../../../utils/localStorage";

import "./index.css";
import goodImg from "../../../assets/recomend_good1.png";
const { TextArea } = Input;
class GoodTable extends React.Component {
    constructor (props) {
        super(props)
        // console.log("props props")
        // console.log(props)
        // console.log("props props")
        this.state = {
            supplyPriceStatus: false,
            supplyPriceStatusValue: null,
            userInfo: ""
        }
    }
    componentDidMount () {
        this.initFn()
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
    
    remarkFn = (e)=> {
    
        let value = e.target.value;    
        this.props.remarkFn(this.props.index, value)
    }
    render () {
        return (
            <div className="good_table">
                <ul className="header_top">
                    <li className="select"></li>
                    <li className="info">商品信息</li>

                    <li className="good_code">商品编码</li>
                    <li className="vol">体积(m³)</li>
                

                    {this.state.userInfo.roleId && <li className="price"> 供货单价 (元)</li>}
                    {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 && <li className="price"> 供货单价 (元)</li>}
        
                    {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" && <li className="price">销售单价(元)</li>}
                    <li className="count">数量</li>
                    <li className="sub_total">小计(元)</li>
                </ul>
                <ul className="good_list">
                    {this.props.orderItem.details.length>0 && this.props.orderItem.details.map((item, index)=>{
                        return (
                            <li key={index}>
                                <div className="select"></div>
                                <div className="info">
                                                
                                    
                                    <div className="good_img">
                                    
                                        <img src={item.imgurl} alt=""/>
                                    </div>
                                    <div className="intro">
                                        <div className="txt"> {item.productName}  </div>
                                        <div className="size"> {item.attribute} </div>
                                    </div>
                                </div>
                                <div className="good_code">{ item.productCode }</div>


                                <div className="vol">{item.volume}</div>
                                <div className="price">{item.supplierPrice}</div>                            
                                <div className="count_con">{item.num}</div>
                                <div className="sub_total">{item.totalSupplierPrice}</div>
                            </li>
                        )
                    })}
               
                    <div className="remark_con ">
                       
                        <div className="title">特殊信息备注:</div>
                        <TextArea    
                            placeholder="若延期发货, 请自行修改期望发货时间, 若定制, 请填写定制信息, 否则按常规产品出货。"
                            autoSize={{ minRows: 5, maxRows: 10 }}
                            className="text_area"
                            onChange={this.remarkFn} 
                        />
                    </div>
                </ul>
            </div>
        )
    }
}




export default GoodTable;