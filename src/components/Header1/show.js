import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./index.css";

import {Row, Col, Badge} from "antd";
import logo from "../../assets/logo.png";
import topcart from "../../assets/shopping_cart.png";

function Header () {
    const navList = [
        {id: 0, title: "首页", path: "/"},
        {id: 1, title: "新品鉴", path: "/recommendegood"},
        {id: 2, title: "产品仓", path: "/productroom"},
        {id: 3, title: "系列集", path: "/series"},

        // {id: 4, title: "艺术家", path: "/artist"},

        // {id: 5, title: "云设计"},
        {id: 6, title: "认识我"}
    ]
    const [currentIndex, setIndexFn] = useState(0);
    
    const history = useHistory();
    function selectNavFn (index) { 
        setIndexFn(index)
        const url = navList[index].path;
        history.push(url)
    } 
    return (
        <div className="header_con">
            <Row className="header_top">
                <Col span={3}></Col>
                <Col span={18}>
                    <span className="title">更懂年轻人的国潮家居品牌</span>
                    <Link to="/login" className="login_btn">登录</Link>
                    <Link to="/login" className="login_btn">注册</Link>
                </Col>
                <Col span={3}></Col>


            </Row>
            <Row className="header_bottom">
                <Col span={3}></Col>
                <Col span={18}>

                    <Link to="/" className="logo"><img src={logo} className="logo_img" alt=""/></Link>
                    
                    <ul className="nav_list">
                       {navList.map((item, index)=>{
                            return (<li key={item.id} className={currentIndex==index?"on":""} onClick={()=>{selectNavFn(index)}}>{item.title}</li>)
                       })}
                    </ul>
             
                    <Badge count={5} className="cart_logo" offset={[-15, -10]}>
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