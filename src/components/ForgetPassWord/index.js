import React from "react";
import {Form, Input, Button, message } from "antd";
import "./index.css";

import checkedImg from "../../assets/check_true_icon.png";
import checkedFalseImg from "../../assets/check_false_icon.png";
import request from "../../api/request";
class RegisterPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            count: 60,
            setFlag: false,
            phoneValue: "",
            code: "",

            passWord: "",
            passWordConfirm: ""
        }
    }    
    getCodeFn = () => {
        
        const _this = this;
        this.setState({
            setFlag: true
        })
        const set = setInterval(function () {
            const count = _this.state.count - 1; 
            _this.setState({
                count: count
            })
            if (count === 0) {
                clearInterval(set)
                _this.setState({   
                    setFlag: false,
                    count: 60
                })
            }

        }, 1000)
        let formData = new FormData();
        formData.append("api", "app.user.sendSms");
        formData.append("storeId", 1);
        
        formData.append("storeType", 6);
        formData.append("phone", this.state.phoneValue);
        formData.append("smsType", 4);
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            console.log("code")
            console.log(res)
            console.log("code")

            if (res.data.code == 200) {
                 
            } else {

            }
        })
    }
    phoneFn = (e)=> {
        let value = e.target.value;
        this.setState({
            phoneValue: value
        })
    }
    codeFn = (e)=> {
        let value = e.target.value;
        this.setState({
            code: value
        })
    }
    passWordFn = (e)=> {
        let value = e.target.value;
        this.setState({
            passWord: value
        })
    }
    passWordConfirmFn = (e)=> {
        let value = e.target.value;
        this.setState({       
            passWordConfirm: value
        })
    }
    submitFn = ()=> {
 
        console.log("phoneValue:" + this.state.phoneValue )
        console.log("code:" + this.state.code)
        console.log("passWord:" + this.state.passWord)
        console.log("passWordConfirm:" + this.state.passWordConfirm)
        let formData = new FormData();
        formData.append("api", "app.login.forgotPassword");
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("phone", this.state.phoneValue);
        formData.append("keyCode", this.state.code);
        formData.append("password", this.state.passWord);
      
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            console.log("code")
            console.log(res)
            console.log("code")
            
            let flag = res.data.data;

            if (flag) {
                message.success(res.data.message);
                setTimeout(()=>{
                    window.location.href ="/login";
                }, 2500)
       
            } else {
                message.error(res.data.message);
            }
        })
    }
    render () {
        return (
          <form className="register_form_con">
                <div className="title">设置密码</div>
                <div className="item_put">
                    <input type="text" className="put_val" placeholder="请输入手机号" value={this.state.phoneValue} onChange={this.phoneFn}/>
                    <div className="msg">请输入正确手机号</div>
                </div>
                <div className="item_put">
                    <input type="text" className="put_val code_val" placeholder="请输入验证码" value={this.state.code} onChange={this.codeFn}/>
                    <div className="msg">请输入正确验证码</div>
                    <div className={this.state.setFlag?"code_btn": "code_btn on"} onClick={this.getCodeFn}>{"获取验证码"}</div>  
                    <div className={this.state.setFlag?"code_btn on": "code_btn"}>{"还剩"+this.state.count+"秒"}</div>
                </div>
                <div className="item_put"> 
                    <input type="text" className="put_val" placeholder="设置密码" value={this.state.passWord} onChange={this.passWordFn}/>
                    <div className="msg">请输入设置密码</div>
                </div>
                <div className="item_put">
                    <input type="text" className="put_val" placeholder="确认新密码" value={this.state.passWordConfirm} onChange={this.passWordConfirmFn}/>
                    <div className="msg">密码不一致</div>

                </div>
                <div className="sub_btn" onClick={this.submitFn}>确认重置</div>
            </form>
        )
    }
}


export default RegisterPage;