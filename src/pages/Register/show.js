import React from "react";
import {Link} from "react-router-dom";
import loginBack from "../../assets/login_small_back.png";

import Register from "../../components/Register";
import "./index.css";
class Show extends React.Component {
    constructor (props) {
        super(props)
        // console.log("props register")
        // console.log(props)
        // console.log("props register")
        this.state = {
            loginFlag: true
        }
    }
    goLoginFn = ()=> {

        this.props.history.push("/login")
    }
    render () {
        return (
            <div className="login_page">
                <div className="login_con">
                    <img src={loginBack} className="login_back"/>
                    <div className="form_con">
                        <Register goLoginFn={this.goLoginFn}/>       
                    </div>
                    <Link to="/" className="home_btn">返回首页</Link>
                </div>
            </div>
        )
    }
}

export default Show;