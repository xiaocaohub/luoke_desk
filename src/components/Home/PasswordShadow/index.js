import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Input, message } from "antd";

import {CHECK_SUPPLY_PRICE, SWITCH_SUPPLY_PRICE} from "../../../actionType/common";

import request from "../../../api/request";
import {setStorageFn, getStorageFn} from "../../../utils/localStorage";
import "./index.css";

function PasswordShadow () {
    let dispatch = useDispatch();
    let [passWord, setPassWordFn] = useState("");
    function hideSupplyPriceFn () {
        dispatch({type: CHECK_SUPPLY_PRICE, payload: false})
    }
    function changePasswordFn (e) {
        setPassWordFn(e.target.value)
    }
    function subMitFn () {
        let _this = this;

        let formData = new FormData();
        let token = getStorageFn("token");
        formData.append("api", "app.login.loginSupplyPassword");    

        formData.append("accessId", token);          
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("password", passWord);
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {

            if (res.data.code == 200) {


                dispatch({type: CHECK_SUPPLY_PRICE, payload: false})
                dispatch({type: SWITCH_SUPPLY_PRICE, payload: true})
                setPassWordFn("")
            } else {

                message.error(res.data.message)
            }  
        })
    }
    return (
        <div className="password_shadow_con">
            <div className="shadow"></div>
            <Form className="form_con" layout="vertical">
                    <div className="title">
                        <span className="tit">B端密码</span>
                        <span className="close_btn" onClick={hideSupplyPriceFn}></span>

                    </div>
                    <Form.Item hasFeedback label="密码">

                        {/* <Input placeholder="请输入密码" className="pass_word"/> */}
                        <input type="password"  placeholder="请输入密码" value={passWord} className="pass_word" onChange={changePasswordFn}/>
                </Form.Item>

                <div className="sub_btn" onClick={subMitFn}>确定</div>
            </Form>
        </div>
    )
}

export default PasswordShadow;