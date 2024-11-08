import React from "react";
import {Select, Button, message} from "antd";
import request from "../../../api/request";

import { getStorageFn, setStorageFn } from "../../../utils/localStorage";

import "./index.css";
import provinceData from "../../../citys/province";
import cityData from "../../../citys/city";
import areaData from "../../../citys/area";
const { Option } = Select;
let areaList = [];
class UserInfoForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            userTypeArr: [
                {
                    id: 0,
                    label: "企业"
                },
                {
                    id: 1,
                    label: "个体工商户"
                }
            ],
            userTypeIndex: 0,
            companyName: "",
            code: "",
            uName: "",
            userId: "",
            detailAddress: "",
            userInfoDetail: {
                province: "请选择",
                provinceId: "",           

                city: "请选择",
                
                
                cityId: "",
                cityList: [],
                areaId: "",
                areaList: [],
                
                area: "请选择"

                // detailAddress:  ""
                // recipient:  "", // 收件人
                // phone:  "",
                // remark:  ""
            }

        }
    }

    componentDidMount () {
        let userInfo = JSON.parse(getStorageFn("userInfo"))
        this.setState({
            userInfo: userInfo
        })
    }
    companyNameFn =  (e)=> {
        let companyName = e.target.value;
        this.setState({
            companyName: companyName
        })

    }
    codeFn = (e)=> {
        let code = e.target.value;

        this.setState({
            code: code
        })
    }
    uNameFn = (e)=> {
       let uName = e.target.value;
       this.setState({
          uName: uName
       })
    }
    userIdFn = (e)=> {
        let userId = e.target.value;

        this.setState({
            userId: userId
        })
    }
    detailAddressFn = (e)=> {
        let detailAddress = e.target.value;
        this.setState({       
            detailAddress: detailAddress
        })
    }
    selectTypeFn = (index)=> {
        this.setState({
            userTypeIndex: index
        })
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

            console.log("userInfoDetail cityList")
            console.log(this.state.userInfoDetail)
            console.log("userInfoDetail cityList")
            
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
    submitFn = ()=> {
        let _this = this; 
        let formData = new FormData();
        let userInfo = this.state.userInfo;
        let token = getStorageFn("token");
        let signatoryType = "";
        let userTypeIndex = this.state.userTypeIndex;
        let companyName = this.state.companyName;
        let code = this.state.code;
        let uName = this.state.uName;
        let userId = this.state.userId;
        let userInfoDetail = this.state.userInfoDetail;
        let detailedAddress = this.state.detailAddress;
        if (userTypeIndex == 0) {
            signatoryType = 2;
        } else if (userTypeIndex = 1) {
            signatoryType = 3;
        }
        if (!companyName) {
            message.error("请输入签约主体名称")

            return ;
        }
        if (!code) {
            message.error("请输入企业社会信用代码")
            return ;
        }
        if (!uName) {
            message.error("请输入企业法人姓名")
            return ;
        }
        if (!userId) {
            message.error("请输入企业法人身份证号码")
            return ;
        }

        if (!userInfoDetail.province ||  userInfoDetail.province == "请选择") {
            message.error("请选择省份")
            return ;
        }
        if (!userInfoDetail.city ||  userInfoDetail.city == "请选择" ) {
            
            message.error("请选择城市")


            return ;
        }
        if (!userInfoDetail.area ||  userInfoDetail.area == "请选择") {
            message.error("请选择地区")
        
            return ;
        }
        if (!detailedAddress) {
            message.error("请输入详细地址")
            return ;
        }
        formData.append("api", "app.user.submitInformation");
        formData.append("accessId", token);
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("signatoryType", signatoryType)
        formData.append("signatoryName", companyName)
        formData.append("companyCreditCode", code)
        formData.append("userName", uName)
        formData.append("idCard", userId)
        formData.append("province", userInfoDetail.province)
        formData.append("city", userInfoDetail.city)

        formData.append("area", userInfoDetail.area)
        formData.append("detailedAddress", detailedAddress)
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData


        }).then((res)=> {



            
            if (res.data.code == 200) {
                message.success(res.data.message)
                userInfo.submitFlag = 1;
                userInfo.examineFlag = 0;
                _this.props.userInfoHideFn()
                setStorageFn("userInfo", JSON.stringify(userInfo))
                 
            } else {
                message.error(res.data.message)
            }
        })
    }
    render () {
 
        return (
            <div className="user_info_form">
                <div className="top_title">申请信息</div>
                <div className="item">
                    <div className="title"><span>*</span> 签约主体: </div>
                    <div className="value_con"> 
                        {this.state.userTypeArr.map((item, index)=>{                       
                            return (<div className={this.state.userTypeIndex == index?"select_item on": "select_item"} key={index} onClick={()=>{this.selectTypeFn(index)}}>{ item.label }</div>)
                       })}

                    </div>
                </div>
                <div className="item">
                    <div className="title"><span>*</span> 签约主体名称:</div>
                    <div className="value_con"><input type="text" className="put_val" value={ this.state.companyName } onChange={this.companyNameFn} placeholder="请填写签约主体名称"/></div>
                </div>
                <div className="item">
               
                    <div className="title"><span>*</span> 企业社会信用代码: </div>
               
               
                    <div className="value_con"><input type="text" className="put_val" value={ this.state.code } onChange={ this.codeFn } placeholder="请填写企业社会信用代码"/></div>
                </div>
                <div className="item">
                    <div className="title"><span>*</span> 企业法人姓名: </div>
                    <div className="value_con"><input type="text" className="put_val" value={ this.state.uName } onChange={ this.uNameFn } placeholder="请填写企业法人姓名"/></div>
                </div>
                <div className="item">
                    
                    <div className="title"><span>*</span> 企业法人身份证号码: </div>
                    <div className="value_con"><input type="text" className="put_val" value={ this.state.userId } onChange={ this.userIdFn } placeholder="请填写企业法人身份证号码"/></div>

                </div>

                {/* <Form className="form_con"  {...formItemLayout}>
                        <Form.Item label="所在地区" width="150px">
                        */}
                             
                <div className="item">
                    <div className="title"><span>*</span> 联系地址:</div>
                    <div className="value_con">
                        <Select
                                labelInValue  defaultValue={{ key: '请选择' }}

                                style={{ width:210, marginTop:5}}
                                
                                
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
                                style={{ width:210, marginLeft:20, marginTop:5}}   
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
                                style={{ width:210, marginLeft: 20, marginTop:5,color:"#f5f5f5"}}
                                value={ this.state.userInfoDetail.area }
                                onChange={this.selectAreaFn}
                            >
                                {this.state.userInfoDetail.areaList.length>0 && this.state.userInfoDetail.areaList.map((item, index)=>{
                                    return (<Option  value={item.value} key={index}>{item.label}</Option>)
                                })}
                        
                            </Select>
                    </div>
                </div>
                <div className="item">
                    <div className="title"><span>*</span> 详细地址:</div>
                    <div className="value_con"><input type="text" className="put_val" value={ this.state.detailAddress } onChange={ this.detailAddressFn } placeholder="请填写详细地址"/></div>
                </div>




                <div className="btn_group">
                  
                    <Button type="primary" className="btn" onClick={ this.submitFn }>提交</Button>
                    <Button className="btn" onClick={this.props.userInfoHideFn}>取消</Button>
                </div>
            </div>
        )
    }
}


export default UserInfoForm;