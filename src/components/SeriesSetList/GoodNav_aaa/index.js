import React from "react";
import {Breadcrumb } from "antd";
import { CaretRightOutlined , UpOutlined,  DownOutlined } from '@ant-design/icons';

import "./index.css";
import request from "../../../api/request";
class GoodNav extends React.Component {
    constructor (props) {
        super(props)
        // console.log("props nav")

        // console.log(props)
        // console.log("props nav")
        this.state = {
            styleHover: true,
            styleNavArr: [
                {
                    id: 0,
                    title: "现代",

                    checked: false
                },
                {
                    id: 1,
                    title: "极简",                

                    checked: false
                },
                {
                    id: 2,
                    title: "轻奢",
                    checked: false
                },
                {
                    id: 3,
                    title: "中式",
                    checked: false
                },
                {
                    id: 4,
                    title: "新中式",


                    checked: false
                },
                {
                    id: 5,

                    title: "欧美",
                    checked: false
                },
                {
                    id: 6,
                    title: "北欧",
                    checked: false
                },
                {
                    id: 7,
                    title: "中古风",
                    checked: false
                },
                {
                    id: 8,
                    title: "其他",
                    checked: false
                }
            ],
            spaceNavArr: []
        }
    }

    componentDidMount () {
        this.getSpaceNavFn()
    }
    styleSelectMoreFn = ()=> {
        let styleHover = !this.state.styleHover;
        this.setState({
            styleHover: styleHover
        })
    }

    selectStyleFn = (index)=> {
        let styleNavArr = this.state.styleNavArr;
        styleNavArr[index].checked = !styleNavArr[index].checked;
        this.setState({
            styleNavArr: styleNavArr
        })
    }
    cancelStyleFn = ()=> {
        this.setState({
            styleHover: true
        })
    }

    getSpaceNavFn = ()=> {
        let _this = this;
        let formData = new FormData();
        formData.append("api", "app.product.getSpaceClassList");
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        // formData.append("page", this.state.currentPage);
        // formData.append("pageSize", this.state.pageSize);
        // formData.append("styleIds", "")
        // formData.append("sortCriteria", "");
        // formData.append("sort", "");
        
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            let resData =  res.data.data;
            _this.setState({
                spaceNavArr: resData
            })
        })
    }
    render () {
        return (
            <div className="good_nav_con">
                <div className="breadcrumb_con">
                    <Breadcrumb  separator={<CaretRightOutlined />} className="breadcrumb">
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">艺术家</a></Breadcrumb.Item>
                        <Breadcrumb.Item>共100款宝贝</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="show_btn_a">收起筛选 <UpOutlined /></div>
                </div>


                <div className="good_nav">
                    <div className="nav_list_con">
                        <div className="title">空间</div>
                        <ul className="nav_list">
                        


                            {this.state.spaceNavArr.map((item, index)=> {
                                return (<li key={item.cid}> {item.pname} </li>)
                            })}
                        </ul>

                        {/* <div className="slect_more">+多选</div>
                        <div className="show_btn">收起 <DownOutlined /></div> */}
                    </div>

                    <div className="nav_list_con">
                        <div className="title">品类</div>
                        <ul className="nav_list">
                            <li>沙发</li>
                            <li>茶几</li>
                            <li>电视柜</li>
                            <li>床</li>

                            <li>床垫</li>
                            <li>床头柜</li>
                            <li>餐桌</li>
                            <li>餐椅</li>
                            <li>餐椅</li>
                            <li>休闲椅</li>
                            <li>卧室套装</li>
                        </ul>
{/* 
                        <div className="slect_more">+多选</div>
                        <div className="show_btn">收起 <DownOutlined /></div> */}
                    </div>

                    <div className= {this.state.styleHover?"nav_list_con":"nav_list_con on"}>
                        <div className="title">风格</div>                      


                        <ul className = "nav_list on">
                            {this.state.styleNavArr.map((item, index)=>{
                                return ( this.state.styleHover? (<li key={index}>{item.title}</li>) : 
                                            (<li onClick={()=>{this.selectStyleFn(index)}} key={index}>
                                                
                                                <div className = {item.checked?"select on": "select"}></div>
                                                <span>{item.title}</span>
                                            </li>)
                                )
                            })}
                            
                            {this.state.styleHover?
                               "":
                                (<div className="btn_group">
                                    <div className="btn sub_btn">提交</div>
                                    <div className="btn cancel_btn" onClick={this.cancelStyleFn}>取消</div>
                                </div>)
                            }       
                        </ul>

                        <div className="slect_more" onClick={this.styleSelectMoreFn}>+多选</div>
                        <div className="show_btn">收起 <DownOutlined /></div>
                    </div>

                    {/* <div className="nav_list_con">
                        <div className="title">系列</div>
                        <ul className="nav_list">                        
                            <li> 全屋·柏林M1</li>
                            <li>全屋·柏林M2</li>
                            <li>全屋·柏林M3</li>
                            <li>全屋·伦敦L2</li>
                            <li>全屋·伦敦L1</li>
                            <li>全屋·纽约N1</li>
                            <li>全屋·云想Y2</li>
                            <li>全屋·云想Y1</li>
                        </ul>

                        <div className="slect_more">+多选</div>
                        <div className="show_btn">收起 <DownOutlined /></div>
                    </div> */}
                </div>
            </div>
        )
    }
}


export default GoodNav;