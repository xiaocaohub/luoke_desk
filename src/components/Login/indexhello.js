import React from "react";
import {Form, Input, Button} from "antd";
import "./index.css";

import checkedImg from "../../assets/check_true_icon.png";
import checkedFalseImg from "../../assets/check_false_icon.png";
import {loginApi} from "../../api/login";

import {setStorageFn} from "../../utils/localStorage";
class LoginPage extends React.Component {
    constructor (props) {
        super(props)
        // console.log("props login")
        // console.log(props)
        // console.log("props login")
        
        this.state = {
            autoLoginFlag: false
        }
    }
    autoLoginFn = ()=> { 
        const flag = this.state.autoLoginFlag;
        this.setState({
            autoLoginFlag: !flag
        })
    }

    loginFn = ()=> {
        let formData = new FormData();
        formData.append("api", "app.login.login");
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("phone", "000000");
        formData.append("password", "000000");
      
        loginApi(formData).then(function (res) {
            // console.log(res)
            let data = res.data.data;
            setStorageFn("token", data.access_id)
        })
    }


    render () {
        return (
            <Form className="login_form_con login-form" >   
                <div className="title">账号密码登录</div>
                
                <Form.Item  >
                    <Input placeholder="请输入账号" className="put_val"></Input>
                </Form.Item>
                
                <Form.Item>
                    <Input placeholder="请输入密码" className="put_val"></Input>
                </Form.Item>
             
                <Form.Item>
                    <div className="sub_btn" onClick={this.loginFn}>登 录</div>

                </Form.Item>

                <Form.Item>    

                    <div className={this.state.autoLoginFlag?"select_con on":"select_con"} onClick={this.autoLoginFn}>下次自动登录</div>                   
                    <div className="forget_btn" onClick={this.props.forgetFn}>忘记密码</div>
                </Form.Item>
            </Form>
        )
    }
}



export default LoginPage;


 