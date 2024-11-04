import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./index.css"

import logo from "../../../assets/footer_logo.png";

import {setStorageFn, getStorageFn} from "../../../utils/localStorage";
function Header () {
    let [uName, setUnameFn] = useState("");
    function loginOutFn () {
        window.localStorage.clear();
        window.location.href = "/login";
    }
    useEffect (()=>{
        init()
    }, [])
    function init () {
        let userInfo = JSON.parse(getStorageFn("userInfo"));
        setUnameFn(userInfo.phone)
    }
    return (
        <div className="people_header_con">
                <Link to="/" className="logo_a"><img src={logo} alt="" className="logo"/></Link>
                <div className="title">管理后台</div>
                <ul className="top_nav">
                    <li className="on">
                        <Link to="/">
                            <div className="icon"></div>
                            <p>首页</p>
                        </Link>
                    </li>   
                    <li>
                        <div className="icon"></div>
                        <p>店铺</p>
                    </li>




                    <li className="on">
                        <Link to="/people_order_list">
                            <div className="icon"></div>
                            <p>订单</p> 
                        </Link>
                    </li>

                    <li>

                        <div className="icon"></div>
                        <p>财务</p>
                    </li>
                </ul>
                <div className="out_btn" onClick={loginOutFn}>退出</div>

                <div className="phone_con">
                    <div className="phone_title">欢迎您, { uName }</div>
                    <ul className="btn_list">
                        {/* <li><Link to="/login">修改密码</Link></li> */}

                        <li className="out_b" onClick={loginOutFn}>退出登录</li>
                    </ul>
                </div>

                <Link to="/" className="go_index">返回商城</Link>
        </div>
    )
}


export default Header;