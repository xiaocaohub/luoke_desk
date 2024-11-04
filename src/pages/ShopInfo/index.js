import React from "react";
import {Select, Input} from "antd";
import provinceData from "../../citys/province";
import cityData from "../../citys/city";
import areaData from "../../citys/area";

import "./index.css";
const { Option } = Select;
let areaList = [];
class ShopInfo extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            userInfoDetail: {
                province: "请选择",
                provinceId: "",           
                city: "请选择",  
                cityId: "",
                cityList: [],
                areaId: "",
                areaList: [],
                
                area: "请选择",
                detailAdress:  "",
                recipient:  "", // 收件人
                phone:  "",
                remark:  ""
            }
        }
    }
    selectProvinceFn = (option)=> {
        console.log(option)
        let userInfoDetail = this.state.userInfoDetail;
        userInfoDetail.province =  option.label;
        userInfoDetail.provinceId = option.value;

        userInfoDetail.cityList = [];

        
        userInfoDetail.city = "请选择";
        userInfoDetail.areaList = [];
        userInfoDetail.area = "请选择";
        areaList = [];
        
        this.setState({

            userInfoDetail: userInfoDetail
        }, function () {
            // console.log("userInfoDetail cityList")
            // console.log(this.state.userInfoDetail)
            // console.log("userInfoDetail cityList")
            
            this.filterCityListFn(cityData, Number(option.value))
        })
    }

    filterCityListFn = (cityData, provinceId)=> {
        // let cityList = this.state.cityList;
        let cityList = [];
        let userInfoDetail = this.state.userInfoDetail;
        let lengthCityArrLength = cityData.length;
        // console.log("provinceId", provinceId)

        for (let i=0; i< lengthCityArrLength; i++) {

            let cityArrItem = cityData[i];
            let length = cityArrItem.length;
            for (let j=0; j<length; j++) {
                if (cityArrItem[j].value.slice(0,2) == provinceId) {
                    cityList.push( cityArrItem[j])
                }
            }
        }
        userInfoDetail.cityList = cityList;
        
        this.setState({
            userInfoDetail: userInfoDetail
        }, function () {

            console.log(cityList)
        })
    }
    selectCityFn = (option)=> {
        console.log(option.value)
        let _this = this;

        let userInfoDetail = this.state.userInfoDetail;
        userInfoDetail.city = option.label;
        userInfoDetail.area = "请选择";
        // userInfoDetail.areaList;
        areaList = [];
        this.filterAreaFn(areaData, option.value)
        setTimeout(()=>{
            console.log("areaList", areaList)
            userInfoDetail.areaList = areaList;
            _this.setState({
                userInfoDetail: userInfoDetail
            })
        })
    }
    filterAreaFn = (arr, cityId)=> {
        let _this = this;
        let numLength = cityId.length;
        // console.log("cityId:", cityId)
        // console.log("length", cityId.length)
        // console.log("flag:", flag)
        let userInfoDetail = this.userInfoDetail;
      

        let length = arr.length;
        for (let i=0; i<length; i++) {
            let flag = Array.isArray(arr[i]);
            if (flag) {
                _this.filterAreaFn(arr[i], cityId)
            } else {
                if (arr[i].value.slice(0, numLength) == cityId){
                    areaList.push(arr[i])
                }
            }
        }
    }

    selectAreaFn = (option)=>{
        let userInfoDetail = this.state.userInfoDetail;
     
        userInfoDetail.area = option.label;
        this.setState({
            userInfoDetail: userInfoDetail
        })

    }
    render () {    
        return (
            <div className="shop_info_con">
                <div className="shop_title">
                    <div className="tit">基本信息</div>
                </div>
                <div className="user_info_con">
                  
                    <div className="title_item">基本信息</div>
                    <ul className="info_list">
                        <li>
                            <div className="title"><span>*</span> 账号</div>
                            <div className="right_txt">13800138000</div>
                        </li>
                        <li>
                            <div className="title"><span>*</span> 真实姓名</div>
                            <div className="right_txt">黄S</div>
                        
                        </li>
                        <li>
                            <div className="title"><span>*</span> 详细地址</div>
                            <div className="right_txt">
                                <div>
                                    <Select
                                        labelInValue  defaultValue={{ key: '请选择' }}
                                        style={{ width:210, marginLeft:20}}
                                        onChange={this.selectProvinceFn}
                                        value={this.state.userInfoDetail.province}
                                        >        
                                        {provinceData.map((item, index)=>{
                                        
                                        
                                            return (<Option value={item.value}>{item.label}</Option>)
                                        })}                            
                                    </Select>


                                    <Select

                                        labelInValue
                                        defaultValue={{ key: '请选择' }} 
                                        style={{ width:210, marginLeft:20}}   
                                        onChange={this.selectCityFn}   
                                        value={this.state.userInfoDetail.city}           
                                    >    
                                        {this.state.userInfoDetail.cityList.length>0 && this.state.userInfoDetail.cityList.map((item, index)=>{
                                            return (<Option value={item.value} key={index}>{item.label}</Option>)
                                        })}
                                    </Select>


                                    <Select
                                        labelInValue
                                        defaultValue={{ key: '请选择' }}                            
                                        style={{ width:210, marginLeft: 20}}

                                        value={ this.state.userInfoDetail.area }
                                        onChange={this.selectAreaFn}
                                    >
                                        {this.state.userInfoDetail.areaList.length>0 && this.state.userInfoDetail.areaList.map((item, index)=>{
                                            return (<Option  value={item.value} key={index}>{item.label}</Option>)
                                        })}
                                    </Select>
                                </div>
                                
                                <Input type="text" className="detail_address"/>

                            </div>
                        </li>
                        <li>
                            <div className="title"><span>*</span> 加盟时间</div>
                            <div className="right_txt">2023-05-23</div>
                        </li>
                        <li>

                            <div className="title"><span>*</span> 加盟时间</div>
                      
                      
                            <div className="right_txt">
                                <Select
                                        labelInValue
                                        defaultValue={{ key: '请选择' }}                            
                                        style={{ width:210, marginLeft: 20}}

                                        value={ this.state.userInfoDetail.area }
                                        onChange={this.selectAreaFn}
                                    >
                                     
                                        <Option  value="jiaju">家具</Option>
                               
                                </Select>
                            </div>
                        </li>
                        <div className="btn_group">
                            <div className="btn">取消</div>
                            <div className="btn">保存</div>
                        </div>
                    </ul>

                    
                </div>

                <div className="user_info_con">
                    <div className="title_item">工商信息</div>

                    <ul className="info_list">
                        <li>

                            <div className="title"><span>*</span> 签名主体</div>
                            <div className="right_txt"></div>
                        </li>
                        <li>

                            <div className="title"><span>*</span> 姓名</div>
                        
                            <div className="right_txt"><Input type="text"/></div>
                        </li>
                        <li>
                            <div className="title"><span>*</span> 身份证号码</div>
                            <div className="right_txt"><Input type="text"/></div>
                        </li>
                        <li>
                            <div className="title"><span>*</span>企业名称</div>
                            <div className="right_txt"><Input type="text"/></div>

                        </li>
                        <li>
                            <div className="title"><span>*</span>企业社会信用代码</div>
                       
                            <div className="right_txt"><Input type="text"/></div>
                        </li>
                        <li>
                            <div className="title"><span>*</span>企业法人姓名</div>
                            <div className="right_txt"><Input type="text"/></div>

                        </li>
                        <li>
                            <div className="title"><span>*</span>法人身份证号码</div>
                            <div className="right_txt"><Input type="text"/></div>
                        </li>
                        <li>
                            <div className="title"><span>*</span> 详细地址</div>
                            <div className="right_txt"></div>
                        </li>
                    
                        <li>
                            <div className="title"><span>*</span> 详细地址</div>
                            <div className="right_txt">
                                <div>
                                    <Select
                                        labelInValue  defaultValue={{ key: '请选择' }}
                                        style={{ width:210, marginLeft:20}}
                                        onChange={this.selectProvinceFn}
                                        value={this.state.userInfoDetail.province}
                                        >        
                                        {provinceData.map((item, index)=>{
                                        
                                        
                                            return (<Option value={item.value}>{item.label}</Option>)
                                        })}                            
                                    </Select>


                                    <Select

                                        labelInValue
                                        defaultValue={{ key: '请选择' }} 
                                        style={{ width:210, marginLeft:20}}   
                                        onChange={this.selectCityFn}   
                                        value={this.state.userInfoDetail.city}           
                                    >    
                                        {this.state.userInfoDetail.cityList.length>0 && this.state.userInfoDetail.cityList.map((item, index)=>{
                                            return (<Option value={item.value} key={index}>{item.label}</Option>)
                                        })}
                                    </Select>


                                    <Select
                                        labelInValue
                                        defaultValue={{ key: '请选择' }}                            
                                        style={{ width:210, marginLeft: 20}}

                                        value={ this.state.userInfoDetail.area }
                                        onChange={this.selectAreaFn}
                                    >
                                        {this.state.userInfoDetail.areaList.length>0 && this.state.userInfoDetail.areaList.map((item, index)=>{
                                            return (<Option  value={item.value} key={index}>{item.label}</Option>)
                                        })}
                                    </Select>
                                </div>
                                
                                <Input type="text" className="detail_address"/>

                                <div className="title_msg">注: 工商信息提交后。不允许再次自行修改；如需更新信息，请联系平台客服协助处理。</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default ShopInfo;