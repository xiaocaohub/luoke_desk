import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./index.css";
import {Row, Col, Badge, message} from "antd";
import logo from "../../assets/logo.png";
import topcart from "../../assets/shopping_cart.png";
import { getStorageFn } from "../../utils/localStorage";

function Header () {
    const dispatch = useDispatch();
    const navList = [
        {id: 0, title: "首页", path: "/"},
        {id: 1, title: "新品鉴", path: "/recommendegood"},

        {id: 2, title: "产品仓", path: "/productroom"},
        {id: 3, title: "系列集", path: "/series"},
        // {id: 4, title: "艺术家", path: "/artist"},
        // {id: 5, title: "云设计"},
        {id: 6, title: "认识我", path: "/us"}
    ]
    const [currentIndex, setIndexFn] = useState(0);
    const [userInfo, setUserInfoFn] = useState("");
    let [goodCount, setGoodCountFn] = useState(1);

    const history = useHistory();
    const storeData = useSelector(state=>state)
    function getUserInfoFn () {
        let userInfo = JSON.parse(getStorageFn("userInfo"));
        setUserInfoFn(userInfo)
    }

    function selectNavFn (index) { 
        setIndexFn(index)
    
        const url = navList[index].path;
        history.push(url)
    } 



    function showSmallCartFn () {
        dispatch({type:"show_small_cart", payload: true})
    }


    function loginOutFn () {

        window.localStorage.clear()
        message.success('退出成功');
        setTimeout(()=>{
            history.push("/login")
        }, 2000)
    } 

    useEffect(()=>{
        getGoodListFn()
        getUserInfoFn()

        console.log("effect---")
    }, [storeData.commonState.goodCount])

    function getGoodListFn () {
        // console.log("storeData-------------")
        // console.log(storeData.commonState.goodCount)
        // console.log("storeData---------")
        let goodCount = storeData.commonState.goodCount;
        setGoodCountFn(goodCount)
    }
    return (
        <div className="header_con">
            <Row className="header_top">
                <Col span={3}></Col>
                <Col span={18}>

                    <span className="title" onClick={getUserInfoFn}>更懂年轻人的国潮家居平台</span>
                    {userInfo && <div className="login_btn" onClick={loginOutFn}>退出</div>}
                    {userInfo && <span className="header_img">{userInfo.phone}</span>}     
                    {/* {userInfo && <img src={userInfo.headimgurl} alt="" className="header_img"/>}          */}
                    {!userInfo && <Link to="/login" className="login_btn">登录</Link>}
                    {!userInfo && <Link to="/register" className="login_btn">注册</Link>}
                </Col>
                <Col span={3}></Col>
            </Row>
            <Row className="header_bottom">
          
                <Col span={3}></Col>
                <Col span={18} style={{width:"1px solid brown"}}>
                    <Link to="/" className="logo">
                        {/* <img src={logo} className="logo_img" alt=""/> */}
                    </Link>
                    <ul className="nav_list">
                       {navList.map((item, index)=>{
                            return (<li key={item.id} className={currentIndex==index?"on":""} onClick={()=>{selectNavFn(index)}}>{item.title}</li>)
                       })}
                    </ul>
             
                    <Badge count={goodCount} className="cart_logo" offset={[-10, 0]} onClick={showSmallCartFn}>           
                      
                        <img src={topcart}/>    
                        {/* <Link to="/cart">
                            <img src={topcart}/>      
                        </Link> */}
                    </Badge>
                    <div className="search_con">
                        <div className="btn"></div>
                        <input type="text" placeholder="搜索商品名称" className="search"/>
                    </div>
                </Col>
                <Col span={3}></Col>
            </Row>
        </div>
    )
}


export default Header;