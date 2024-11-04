import React from "react";
import {Row, Col, Breadcrumb, Pagination,   ConfigProvider} from "antd";
import zh_CN from 'antd/es/locale/zh_CN';

import {getStyleApi, getStyleGoodArrApi} from "../../api/Artist";
import { getStorageFn } from "../../utils/localStorage";
import Nav from "../../components/SeriesSet/Nav";
import Good from "../../components/Artist/Good";
import "./index.css";

class Artist extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            styleNav: [
                {id: 0, text:"奶油"}
            ],
            styleIndex: 0,
            styleId: 0,
            styleGoodArr: []
        }
    }

    componentDidMount () {
        this.getStyleFn()
    }
    getStyleFn = ()=> {
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        formData.append("api", "saas.dic.getDictionaryInfo");
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        formData.append("key", "");

        
        formData.append("pageSize", 10);
        getStyleApi(formData).then((res)=>{  
            console.log(res.data)   
            let styleArr = res.data.data.list;
            let styleId = styleArr[0].value;
            this.setState({
                styleNav: styleArr,
                styleId: styleId
            }, function () {
              
               this.getStyleGoodArrFn()
            })
        })
    }
    styleNavSelectFn = (index)=> {
        let styleNav = this.state.styleNav;
        let item = styleNav[index];

        this.setState({ 
            styleIndex: index,
            styleId: item.value
        }, function () {
           
            this.getStyleGoodArrFn()
        })
    }
    getStyleGoodArrFn = ()=> {   
        let formData = new FormData();
        let storeId = getStorageFn("storeId") || 1;
        let storeType = getStorageFn("storeType") || 6;
        let styleId = this.state.styleId;
       
        formData.append("api", "app.product.listProduct"); 
        formData.append("storeId", storeId);
        formData.append("storeType", storeType);
        formData.append("page", 1);
        formData.append("pageSize", 6);
        // formData.append("productLabel", 102);
        formData.append("styleIds", styleId);
        getStyleGoodArrApi(formData).then((res)=>{
            let goodArr = res.data.data.goodsList;

            
            console.log(goodArr)
            this.setState({
                styleGoodArr: goodArr
            })
        })
    }
    render () {
        return (
            <Row className="artist_con">
                <Col span={3}></Col>

                <Col span={18}>
                    <Breadcrumb separator=">" className="breadcrumb_con">
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item> 艺术家</Breadcrumb.Item>

                        <Breadcrumb.Item>共4564款宝贝</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="artist_nav_con">
                        <ul className="tab_nav_list">
                            {this.state.styleNav.map((item,index)=>{
                                return (<li className={this.state.styleIndex==index?"on":""} onClick={()=>{this.styleNavSelectFn(index)}}>{item.text}</li>)
                            })}
                        </ul>
                    </div>

                    <ul className="good_list">
                        {this.state.styleGoodArr.length>0 && this.state.styleGoodArr.map((item, index)=>{
                            return (<Good styleGood={item} key={index}></Good>)
                        })}
                    </ul>

                    <div className="page_con"> 
                            
                            <ConfigProvider locale={zh_CN}>
                                <Pagination
                                    className="page"
                                    style={{ textAlign: "right" }}
                                    total={1000}
                                    defaultCurrent={1}
                                    showSizeChanger
                                    showQuickJumper
                                    showTotal={totalCount => `共 1000 条`}
                                    onChange={(params, state) => {
                                        // pageParams.pageIndex = params;
                                        // pageParams.pageSize = 10;
                                        // pageParams.id = props.policyid;
                                        // setPage(params);
                                        // setSize(10)
                                        // getDataByPage(pageParams)
                                    }}
                                    />
                            </ConfigProvider>
                    </div>
                </Col>
                <Col span={3}></Col>
            </Row>
        )
    }
}




export default Artist;