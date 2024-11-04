import React from "react";
import {Link} from "react-router-dom";
import {Input} from "antd";
import EmptyPage from "../../Empty";
import {setStorageFn, getStorageFn} from "../../../utils/localStorage";

import "./index.css";
import goodImg from "../../../assets/recomend_good1.png";
class GoodTable extends React.Component {
    constructor (props) {
        super(props)
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
    reduceFn = (item, index)=> {
        this.props.reduceFn(item, index)
    }
    addFn = (item, index)=> {

        this.props.addFn(item, index)
    }
    selectGoodFn = (item, index)=> {
        this.props.selectGoodFn(item, index)
    }
    putCountFn = (e, item, index)=> {
       this.props.putCountFn(e, item, index)
    }

    blurGoodCountFn = (goodItem)=> {
       this.props.blurGoodCountFn(goodItem)
    }
    deleteGoodConfirmFn = (item, index)=> {
        this.props.deleteGoodConfirmFn(item, index)
    }
    render () {
        return (
            <div className="good_table">       
                <ul className="header_top">
                    <li className="select"></li>
     
     
                    <li className="info">商品信息 </li>
                    <li className="good_code">商品编码</li>
                    <li className="vol">体积(m³)</li>

                    

                    {this.state.userInfo.roleId && <li className="price"> 供货单价 (元)</li>}
                    {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 && <li className="price"> 供货单价 (元)</li>}
                    {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" && <li className="price">销售单价(元)</li>}
                    <li className="count">数量</li>
                    <li className="sub_total">小计(元)</li>
                    <li className="operate">操作</li>
                </ul>
          
                {/* {this.props.totalSelectGoodCount==0 && <EmptyPage></EmptyPage>} */}
            
                <ul className="good_list">
                    {this.state.userInfo && this.props.cartArr.length>0 && this.props.cartArr.map((item, index)=>{
                        return (
                            
                            <li key={item.id}>
                                <div className={item.checked?"select on":"select"} onClick={()=>{this.selectGoodFn(item, index)}}></div>
          
                                <div className="info">          
                                    <Link to={"/productroomdetail?id=" + item.goods_id } className="good_img">
                                        <img src={item.imgurl} alt=""/>
                                    </Link>
                        
                                    <div className="intro">
                                        <div className="txt"> { item.product_title } </div>
                                        <div className="size"> { item.skuName } </div>
                                    </div>

                                </div>
                                <div className="good_code"> {item.productCode} </div>
                             
                                <div className="vol"> {item.capacity} </div>
                          

                                {this.state.userInfo.roleId && <div  className="price">{ item.discountPrice }</div>}
                                {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 && <div  className="price">{ item.discountPrice }</div>}
                                {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" && <div  className="price">{ item.price }</div>}
                                <div className="count_con">

                                    <div className="btn" onClick={()=>{this.reduceFn(item, index)}}> - </div>
                                    <Input className="count" value={item.goods_num} onChange={(e)=>{this.putCountFn(e, item, index)}} onBlur={()=>{this.blurGoodCountFn(item)}}/>
                                    <div className="btn" onClick={()=>{this.addFn(item, index)}}> + </div>
                                </div>
        
                                <div className="sub_total">
                                    {this.state.userInfo.roleId && <span>{ item.discountPrice * item.goods_num }</span>}                          
                                 
                                    {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue==1 &&<span>{ item.discountPrice * item.goods_num }</span>}
                                    {!this.state.userInfo.roleId && this.state.supplyPriceStatusValue != null && this.state.supplyPriceStatusValue=="" &&<span>{ item.price * item.goods_num}</span>}
                                </div>
                                <div className="operate" onClick={()=>{this.deleteGoodConfirmFn(item, index)}}></div>
                            </li>
                        )
                    })}
                </ul>
                {this.props.cartArr.length == 0 && <EmptyPage></EmptyPage>}
            </div>
        )
    }
}

export default GoodTable;