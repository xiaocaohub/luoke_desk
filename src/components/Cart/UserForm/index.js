import React from "react";
import {Form, Select, Input, Button} from "antd";
import {setStorageFn, getStorageFn} from "../../../utils/localStorage";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
      xs: { span: 1 },
      sm: { span: 1 },
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
        offset: 4,
      }
    }
  }
const {TextArea} = Input;
class UserForm extends React.Component {
    constructor (props) {
        super(props)
        console.log("props userForm")
        console.log(props)
        console.log("props userForm")

       
        this.state = { 
            userInfo: {
                province: "",
                city:  "",

                area: "",

                detailAdress:  "",
                recipient:  "", 
                phone:  "",
                remark:  ""
            }
        }
    }
    detailAdressFn = (e)=> {
        let value = e.target.value;
     
        let userInfo = this.state.userInfo;
        userInfo.detailAdress = value;
        this.setState({

            userInfo: userInfo
        })
    }
    recipientFn = (e)=> {
        let value = e.target.value;
        
        let userInfo = this.state.userInfo;
        userInfo.recipient = value;
        this.setState({
            userInfo: userInfo
        })
    }
    phoneFn = (e)=> {
        let value = e.target.value;
        let userInfo = this.state.userInfo;
        userInfo.phone = value;
        this.setState({
            userInfo: userInfo
        })
    }

    remarkFn = (e)=> {
        let value = e.target.value;
        let userInfo = this.state.userInfo;
        userInfo.remark = value;
        this.setState({
            userInfo: userInfo
        })
    }
    submitFn = ()=> {
        this.props.changeInfo(this.state.userInfo)
        let UserInfo = this.state.userInfo;
        setStorageFn("UserInfo", UserInfo)
    }
    render () {
        return (
            <div>        
                <div className="title">            
                    <div className="tit">客户信息</div>
                    <div className="txt">（注：客户收货地址信息）</div>
                </div>

                <Form className="form_con"  {...formItemLayout}>
                    <Form.Item label="所在地区" >
                        <Select
                            labelInValue  defaultValue={{ key: 'lucy' }}
                            style={{ width:210, marginLeft:20}}>                             
                            <Option value="jack">Jack (100)</Option>
                            <Option value="lucy">Lucy (101)</Option>
                        </Select>

                        <Select
                            labelInValue
                            defaultValue={{ key: 'lucy' }}
                            style={{ width:210, marginLeft: 20}}                    
                        >
                            <Option value="lucy">Lucy (101)</Option>
                            <Option value="jack">jack (102)</Option>
                        </Select>

                        <Select
                            labelInValue
                            defaultValue={{ key: 'lucy' }}                            
                            style={{ width:210, marginLeft: 20}}
                        >
                            <Option value="jack">Jack (100)</Option>
                            <Option value="lucy">Lucy (101)</Option>
                        </Select>
                    </Form.Item>



                    <Form.Item label="详细地址">
                        <Input style={{ width:670, marginLeft:20}} value={this.state.userInfo.detailAdress} onChange={this.detailAdressFn}/> 
                    </Form.Item>

                    <Form.Item label="收件人" >
                        <Input style={{ width:670, marginLeft:20}} value={this.state.userInfo.recipient} onChange={this.recipientFn}/> 
                    </Form.Item>

                 
                    <Form.Item label="手机号" >

                        <Input style={{ width:670, marginLeft:20}} value={this.state.userInfo.phone} onChange={this.phoneFn}/> 
                  
                  
                    </Form.Item>
 
                    <Form.Item label="备注">
                        <TextArea rows={5} style={{ width:670, marginLeft: 20}} value={this.state.userInfo.remark} onChange={this.remarkFn}/>
                  
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.submitFn} className="submit_btn">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default UserForm;