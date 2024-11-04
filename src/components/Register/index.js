import React from "react";
import {Link} from "react-router-dom";
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

            readFlag: false,
            phoneValue: "",
            code: "",
            passWord: ""
            // passWord: "abc123abc"
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
        formData.append("smsType", 2);
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            console.log("code")

            console.log(res)
            console.log("code")
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
    registerFn = ()=> {
        let _this = this;
       
        let formData = new FormData(); 
        let readFlag = this.state.readFlag;
        formData.append("api", "app.login.register");
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("phone", this.state.phoneValue);
        formData.append("keyCode", this.state.code);
        formData.append("password", this.state.passWord);
        if (!readFlag) {

            message.error("请选择同意")
            return ;
        }
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            if (res.data.code == 200) {
                message.success('注册成功');
                setTimeout(()=>{
                    _this.props.goLoginFn()
                }, 2000)
            } else {
                let msg = res.data.message;
                message.error(msg);
                
                if (msg == "该账号已被注册") {
                    setTimeout(()=>{
                        _this.props.goLoginFn()
                    }, 2000)
                }
            }
        })
    }
    readoverFn = ()=> {
        let readFlag = !this.state.readFlag;
        this.setState({
            readFlag: readFlag
        })
    }
    render () {
        return (  
          <form className="register_form_con">
                <div className="title">注册</div>
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
                    <input type="password" className="put_val" placeholder="设置密码" value={this.state.passWord} onChange={this.passWordFn}/>
                 
                    <div className="msg">请输入设置密码</div>
                
                </div>
                {/* <div className="item_put">
                    <input type="text" className="put_val" placeholder="确认新密码"/>
                    <div className="msg">密码不一致</div>
                </div> */}
                <div className="sub_btn" onClick={this.registerFn}>注册</div>
                <div className="agreement_text">
                    <span className={this.state.readFlag?"tit on": "tit"} onClick={this.readoverFn}>我已阅读并同意</span>
                   
                    <Link to="/luoke/agreement" className="txt">《珞珂用户服务协议》</Link>
                    <Link to="/info/agreement" className="txt">《信息数据收集协议》</Link>

                </div>
            </form>
        )
    }
}


export default RegisterPage;