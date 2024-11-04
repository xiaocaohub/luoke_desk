import React from "react";
import {Form, Select, Input, Button, message} from "antd";
import {setStorageFn, getStorageFn} from "../../../utils/localStorage";
import UserForm from "../UserForm";
import UserInfoText from "../UserInfoText";


import provinceData from "../../../citys/province";
import cityData from "../../../citys/city";
import areaData from "../../../citys/area";
import "./index.css";
const { Option } = Select;
let areaList = [];

const formItemLayout = {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 },
    },

    wrapperCol: {
      xs: { span: 21 },
      sm: { span: 21 },
    }
  };

  const tailFormItemLayout = {  
    wrapperCol: {
      xs: {

        span: 24,
        offset: 4,
      },
      sm: {
        span: 20,

        offset: 8,
      }
    }
  }


const {TextArea} = Input;
class UserInfo extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
        
            changeFlag: true,
            userInfoDetail: {
                province: "请选择",
                provinceId: "",           
                city: "请选择",  
                cityId: "",
                cityList: [
                    
                
                ],
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
    componentDidMount () {
        this.init()
    }
    init = ()=> {
        let userInfoDetail = getStorageFn("userInfoDetail");
        console.log("init userInfoDetail")
        console.log(userInfoDetail)
        if (userInfoDetail) {
            this.setState({
                
                userInfoDetail: userInfoDetail
            })
        }
    }
    changeInfoFn = (userInfoDetail)=> {
        let changeFlag = !this.state.changeFlag;
        this.setState({
     
            changeFlag: changeFlag
        })
    }
    detailAdressFn = (e)=> {   
        let value = e.target.value;

        let userInfoDetail = this.state.userInfoDetail;
        userInfoDetail.detailAdress = value;
        this.setState({
            userInfoDetail: userInfoDetail
        })
    }
    recipientFn = (e)=> {
        let value = e.target.value;
        let userInfoDetail = this.state.userInfoDetail;

        userInfoDetail.recipient = value;
        this.setState({
            userInfoDetail: userInfoDetail
        })
    }
    phoneFn = (e)=> {
        let value = e.target.value;
        let userInfoDetail = this.state.userInfoDetail;
        userInfoDetail.phone = value;
        this.setState({
            userInfoDetail: userInfoDetail
        })
    }
    remarkFn = (e)=> {
        let value = e.target.value;
        let userInfoDetail = this.state.userInfoDetail;
        userInfoDetail.remark = value;
        this.setState({
            userInfoDetail: userInfoDetail
        })
    }
    submitFn = ()=> {
        let userInfoDetail = this.state.userInfoDetail;
 
        if (!userInfoDetail.province || userInfoDetail.province == "请选择") {
            message.error("请选择省份");

            return ;
        }
        if (!userInfoDetail.city || userInfoDetail.city == "请选择") {
            message.error("请选择城市");
            return ;
        }
        if (!userInfoDetail.area || userInfoDetail.area == "请选择") {
            message.error("请选择地区");
            return ;
        }
        if (!userInfoDetail.detailAdress) {
            message.error("请填写详细地址")
            return ;
        }
        if (!userInfoDetail.recipient) {
            message.error("请填写收件人")
            return ;
        }
        if (!userInfoDetail.phone) {
            message.error("请填写手机号")
            return ;
        }

        setStorageFn("userInfoDetail", userInfoDetail)
        this.props.setKeepFn(true)
        this.setState({
            changeFlag: false
        })
    }
    changeFn = ()=> {
     
        this.props.setKeepFn(false)
        this.setState({
            changeFlag: true
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
            <div className="user_info_con">        
                {/* {this.state.changeFlag && <UserForm userInfo={this.props.userInfo} changeInfo={this.changeInfoFn}></UserForm>}

                {!this.state.changeFlag && <UserInfoText userInfo={this.props.userInfo} changeInfo={this.changeInfoFn}></UserInfoText>} */}
                <div className={this.state.changeFlag?"user_form_com on":"user_form_com"}>

                    <div className="title">            
                        <div className="tit">客户信息</div>
                        <div className="txt">（注：客户收货地址信息）</div>
                    </div>

                    <Form className="form_con"  {...formItemLayout}>
                        <Form.Item label="所在地区" width="150px">
                       
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
                        </Form.Item>

                        <Form.Item label="详细地址">
                            <Input style={{ width:670, marginLeft:20}} className="put_val" value={this.state.userInfoDetail.detailAdress} onChange={this.detailAdressFn}/> 
                        </Form.Item>

                        <Form.Item label="收件人" >
                            <Input style={{ width:670, marginLeft:20}} className="put_val" value={this.state.userInfoDetail.recipient} onChange={this.recipientFn}/> 
                        </Form.Item>

                    
                        <Form.Item label="手机号" >
                            <Input style={{ width:670, marginLeft:20}} className="put_val" value={this.state.userInfoDetail.phone} onChange={this.phoneFn}/> 
                        </Form.Item>
    


                        {/* <Form.Item label="备注">
                            <TextArea rows={5} style={{ width:670, marginLeft: 20}} className="put_val" value={this.state.userInfoDetail.remark} onChange={this.remarkFn}/>
                        </Form.Item> */}

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.submitFn} className="submit_btn">保存</Button>

                        </Form.Item>
                    </Form>
                </div>

                <div className={!this.state.changeFlag?"user_info_text_con on":"user_info_text_con"}>
                    <div className="title">
                        <div className="tit">客户信息</div>
                        
                        <div className="txt">（注：客户收货地址信息）</div>
                    </div>

                    <ul className="user_info_text">
                        <li><span className="title_tit">收 货 人:</span><span className="title_txt">{this.state.userInfoDetail.recipient}</span> <div className="change_btn" onClick={this.changeFn}>修改</div></li>
                        <li><span className="title_tit">联系电话:</span><span className="title_txt">{this.state.userInfoDetail.phone}</span></li>
                        <li><span className="title_tit">收货地址:</span>
                            <span className="title_txt">
                                {  this.state.userInfoDetail.province }       
                                {  this.state.userInfoDetail.city }
                                { this.state.userInfoDetail.area }
                                { this.state.userInfoDetail.detailAdress }
                            </span>
                        </li>

                        <li>
                            <span className="title_tit">备 注:</span>
                            <span className="title_txt">{this.state.userInfoDetail.remark }</span>    
                        </li>
                    </ul>
                </div>

                {/* <div className="message_title">
                    <div className="title">物流提示</div>
                    <div className="txt">1.本产品不包含物流费用。</div>
                    <div className="txt">2.发货前物流公司会与你沟通物流相关费用。</div>
                </div> */}
            </div>
        )
    }
}

export default UserInfo;