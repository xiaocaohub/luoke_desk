import React from "react";
import {Link} from "react-router-dom";
import loginBack from "../../assets/login_small_back.png";

import LoginPage from "../../components/Login";
import ForgetPassWord from "../../components/ForgetPassWord";
import "./index.css";
class Show extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loginFlag: true
        }
    }
    forgetFn = ()=> {

        this.setState({
            
            loginFlag: false
        })
    }
    render () {
        return (
            <div className="login_page">
                <div className="login_con">
                    <img src={loginBack} className="login_back"/>
                    <div className="form_con">
                        {this.state.loginFlag?<LoginPage loginFlag={this.state.loginFlag} forgetFn={this.forgetFn}/>:<ForgetPassWord /> }           
                    </div>
                    <Link to="/" className="home_btn">返回首页</Link>
                </div>
            </div>
        )
    }
}


export default Show;