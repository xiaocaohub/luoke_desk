import {useState} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input, Button, message, Modal} from "antd";

import "./index.css";
import checkedImg from "../../assets/check_true_icon.png";
import checkedFalseImg from "../../assets/check_false_icon.png";
import {loginApi} from "../../api/login";
import {setStorageFn} from "../../utils/localStorage";

function LoginPage (props) {
    const [messageApi, contextHolder] = message.useMessage();
    const [autoLoginFlag, setAutoLognFn] = useState(false);
    const [phoneValue, setPhoneFn] = useState("");
    const [passWord, setPassWordFn] = useState("")

    // let userType = window.location.href.split("id=")[1];
    const history = useHistory();
 
    function autoLoginFn () { 
        const flag = autoLoginFlag;
        setAutoLognFn(!flag)
    }

    function phoneFn (e) {
        let value = e.target.value;
        setPhoneFn(value);
    }
    function passWordFn (e) {
        let value = e.target.value;
        setPassWordFn(value)
    }
    function loginFn () {
        let usertypeStr = props.usertype;
        let currentUsertype = "";
      
        


        if (usertypeStr == 'B') {
            currentUsertype = 2 ;
        } else if (usertypeStr == 'C') {
            currentUsertype = 1;
        }
        let formData = new FormData();
        formData.append("api", "app.login.login");
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("phone", phoneValue);


        formData.append("password", passWord);
        formData.append("usertype",  props.usertype)



        loginApi(formData).then(function (res) {  

            let data = res.data.data;
            
            // console.log("login")
            // console.log(res)
            // console.log("currentUsertype", currentUsertype)
            // console.log("data.userType", data.userType)
            if (!data) {

                message.error("用户名或密码错")
                return ;
            }
            if (data.userType != currentUsertype) {
                 let titleMsgType = "";
                 if (data.userType == 1) {
                      
                      Modal.info({
                          title: "提示",
                          content: "您是 C 端用户,请去 C 端登录",
                          centered: true,
                          onOk: function (res) {
                               console.log(res)
                                window.location.href = "/login?id=C";
                          }
                      })

                      return ;
                 }
                 if (data.userType == 2) {
                    Modal.info({
                        title: "提示",
                        content: "您是 B 端用户,请去 B 端登录",
                        centered: true,
                        onOk: function (res) {
                            window.location.href = "/login?id=B";
                        }
                    })
                    return ;
                }
            }
            setStorageFn("storeId", 1)
            setStorageFn("storeType", 6) 
            if (data && data.access_id) {
                messageApi.open({
                    type: 'success',
                    content: '登录成功',
                    duration: 10,
                });
                setStorageFn("token", data.access_id); 
                setStorageFn("userInfo", JSON.stringify(data))

                setStorageFn("usertype", props.usertype);

                setTimeout(()=>{
                    window.location.href = "/";

                }, 2500)
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.data.message,
                    duration: 10,
                }); 
            }
        })
    }
    return (
        <Form className="login_form_con login-form" >   
            <div className="title"> {props.usertype} 端用户账号密码登录</div>        
            <div className="put_item">
                <Input placeholder="请输入账号" className="put_val" value={phoneValue} onChange={phoneFn}></Input>
            </div>
            
            <div className="put_item">
                <Input placeholder="请输入密码" className="put_val" type="password" value={passWord} onChange={passWordFn}></Input>
            </div>
            
    
            <div className="sub_btn" onClick={loginFn}>登 录</div>
         

            <div className="put_item">
                <div className={autoLoginFlag?"select_con on":"select_con"} onClick={autoLoginFn}>下次自动登录</div>                   
                <div className="forget_btn" onClick={props.forgetFn}>忘记密码</div>
            </div>
            {contextHolder}
        </Form>
    )
    
}

export default LoginPage;