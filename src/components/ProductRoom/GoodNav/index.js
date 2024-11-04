import React from "react";
import {Breadcrumb, Input } from "antd";


import { CaretRightOutlined , UpOutlined,  DownOutlined, DeleteOutlined, CloseOutlined, ArrowUpOutlined, ArrowDownOutlined  } from '@ant-design/icons';

import "./index.css";

import request from "../../../api/request";
import {getStorageFn} from "../../../utils/localStorage";
class GoodNav extends React.Component {
    constructor (props) {
        super(props)
        // console.log("goodNav props")
        // console.log(props)
        // console.log("goodNav props")
        this.state = {
            spaceNavArr: [],
            currentSpaceId: "",
            currentSpaceSid: "",
            currentSpacePname: "",
            categoryNavArr: [],  
            currentCategoryId: "",
            navOption: {
                spacePname: "",
                spaceSid: "",  
                spaceId: "",
                categoryId:  "",
                categoryPname: "",
                styleId: "",
                stylePname: "", 
                sortCriteria: "",   
                productLabel: "",   
                sort: "asc",
                productClass: "",
 
                keyWord: "",
 
 
                keyword: "",
                lowPrice: 0,
                hightPrice: 0
            },
            styleHover: true,
            styleNavArr: [
                // {   id: 0, text: "现代", checked: false }
            ],
            styleIdSelectArr: [],  
            styleNameSelectArr: [],
            categoryUlShowFlag: true,
            sortArr: [
                {
                    id: 0,
                    title: "综合"
                },
                {
                    id: 1,
                    title: "销量",
                    sort: "asc"
                },
                {
                    id: 2,
                    title: "价格",
                    sort: "asc"
                }
            ],
            currentSortIndex: 0,
            filterArr: [
                {
                    id: 0,
                    title: "全部",
                    goodId: ""
                },
                {
                    id: 1,
                    title: "好物榜",
                    goodId: 101
                },
                {
                    id: 2,
                    title: "找新品",
                    goodId: 102
                },
                {
                    id: 3,
                    title: "找现货",
                    goodId: 10
                }
            ],
            currentFilterIndex:0
        }
    }
    componentDidMount () {
        this.getSpaceNavFn()
        this.getStyleNavFn()
        this.init()
    }

    init = ()=> {
        let _this = this;
        let productLabel = this.props.optionIds.productLabel;
        let currentFilterIndex = 0;
        let optionIds = this.props.optionIds;

        //  console.log("location window --------- goodNav")
        // console.log(optionIds)
        // console.log("location window -------- goodNav")
        if (productLabel) {
            if (productLabel == 101) {
                currentFilterIndex = 1;
            } 
            if (productLabel == 102) {
                currentFilterIndex = 2;
            }
            if (productLabel == 103) {
                currentFilterIndex = 3;
            }
        }
        // let search = window.location.search;
      
        // if (search) {
        //     let keywordStr = search.split("keyword=")[1];
        //     let keyword = decodeURIComponent(keywordStr);
            
        //     optionIds.keyword = keyword;
        //     optionIds.keyWord = keyword;
        // }
        
        // if (search && search.indexOf("keyword")!=-1) {
         


        
        //     let keywordStr = search.split("keyword=")[1];
        //     let keyword = decodeURIComponent(keywordStr);
        //     optionIds.keyWord = keyword;
        //     optionIds.keyword = keyword;
        // } 

        // if (search && search.indexOf("keyword") == -1) {

        //     console.log("keyword ----------------")
        //     optionIds.keyWord = "";
        //     optionIds.keyword = "";
        //     console.log("optionIds optionIds")
        //     console.log(optionIds)
        //     console.log("optionIds optionIds")
        // }
        this.setState({
            currentFilterIndex: currentFilterIndex,
            navOption: optionIds
        })

        setTimeout(()=>{
            _this.clickNav()
        }, 1500)
       
    }
    clickNav = ()=> {
        let btnArr = document.querySelectorAll(".space_list > li");
       
        let search = window.location.search;
        let index = null;
        if (search) {
            if (search.indexOf("navBtn") != -1) {
                index = parseInt(search.split("navBtn=")[1]);
                // console.log("location window index")
                // console.log(typeof index)
                // console.log( index)
                // console.log("location window index")
                btnArr[index].click()
            }
        }
        // console.log("location window")
        // console.log(window.location)
        // console.log("location window")
        // btnArr[1].click()
    }

    styleSelectMoreFn = ()=> {
        let styleHover = !this.state.styleHover; 
        this.setState({
            styleHover: styleHover
        })
    }
    selectStyleHoverFn = (index)=> {   
        let styleNavArr = this.state.styleNavArr;
        let styleId = parseInt(styleNavArr[index].value);
    
        let navOption = this.state.navOption;
        navOption.styleId = styleId;
        navOption.stylePname = styleNavArr[index].text;
        this.getSpaceGoodListFn(navOption);
        this.setState({
            styleNavArr: styleNavArr,
            navOption: navOption
        })
    }
    
    selectStyleFn = (index)=> {
        let styleNavArr = this.state.styleNavArr;
        styleNavArr[index].checked = !styleNavArr[index].checked;
        let navOption = this.state.navOption;
        let styleIdSelectArr = [];
        let styleNameSelectArr = [];    
        styleNavArr.forEach((item, i)=>{
            if (item.checked) {
                let styleId = parseInt(item.value);
                styleIdSelectArr.push(styleId);
                styleNameSelectArr.push(item.text);
            }
        })
        this.setState({
            styleNavArr: styleNavArr,
            styleIdSelectArr: styleIdSelectArr,
            styleNameSelectArr: styleNameSelectArr
            // navOption: navOption
        })
    }
    cancelStyleFn = ()=> {
        let styleNavArr = this.state.styleNavArr;
        styleNavArr.forEach((item)=> {
            item.checked = false;
        })
        this.setState({
            styleHover: true,
            styleNavArr: styleNavArr
        })
    }
    submitStyleFn = ()=> {
        let navOption = this.state.navOption;
        let styleIdSelectArr =  this.state.styleIdSelectArr;
        let styleNameSelectArr = this.state.styleNameSelectArr;
        let styleId = styleIdSelectArr.join(",");
        let stylePname = styleNameSelectArr.join(", ");
        navOption.styleId = styleId;
        navOption.stylePname = stylePname;
        this.setState({
            styleHover: true,   
            navOption: navOption
        }, function () {
            this.getSpaceGoodListFn(navOption);
        })
    }
    getSpaceNavFn = ()=> {
        let _this = this;
        let formData = new FormData();
        formData.append("api", "app.product.getSpaceClassList");
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            let resData =  res.data.data;
            let currentSpaceId = resData[0].cid;
            let currentSpaceSid = resData[0].sid;
            let currentSpacePname = resData[0].pname;
            _this.setState({
                spaceNavArr: resData,
                currentSpaceId: currentSpaceId,
                currentSpaceSid: currentSpaceSid,
                currentSpacePname: currentSpacePname
            }, function () {
                _this.getCategoryNavFn()
                let btnArr = document.querySelectorAll(".space_list > li");
                btnArr.forEach((btnItem, i)=> {
                    btnItem.click =   function() { _this.selectSpaceFn(_this.state.spaceNavArr[i])}
                })
            })
        })
    }
    getCategoryNavFn = ()=> {
        let _this = this;
        let formData = new FormData();
        formData.append("api", "app.product.getSecondClassList");
        formData.append("parentId", this.state.currentSpaceId);
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            let resData =  res.data.data;  
            resData.forEach((item, index)=> {
                item.checked = false;
            }) 
            _this.setState({
                categoryNavArr: resData
            })
        })
    }
    getStyleNavFn = ()=> {
        let _this = this;
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
        request({
            url: "/api/gw",
            method: "POST",
            data: formData
        }).then((res)=> {
            let resData =  res.data.data.list;
            resData.forEach((item, index)=>{
                item.checked = false;
            })
            _this.setState({
                styleNavArr: resData
            })
        })
    }
    selectSpaceFn = (item)=> {   
        let _this = this;
        let navOption = this.state.navOption;
        navOption.spacePname = item.pname;
        navOption.spaceSid = item.sid;
        navOption.spaceId = item.cid;
        navOption.categoryId = "";
        navOption.categoryPname = "";
        this.setState({
            currentSpaceId: item.cid,
            currentSpaceSid: item.sid,
            currentSpacePname: item.pname,
            navOption: navOption
        
        }, function () {
        
        
            this.getCategoryNavFn()
            _this.getSpaceGoodListFn(navOption)
        })
    }
    getSpaceGoodListFn = (option)=> {
        console.log("navOption")
        console.log(option)
        console.log("navOption")
        this.props.getGoodListFn(option)
    }

    selectCategoryNavFn = (item, index)=> {
        // console.log("item cate")
        // console.log(item)
        // console.log("item cate")
        let _this = this;
        let navOption = this.state.navOption;
        if (!navOption.spaceSid) {
            navOption.spaceSid = _this.state.currentSpaceSid;
        }
        if (!navOption.spaceId) {
            navOption.spaceId = _this.state.currentSpaceId;
        }


        if (!navOption.spacePname) {
            navOption.spacePname = _this.state.currentSpacePname;
        }
        let categoryNavArr = this.state.categoryNavArr;
        
        categoryNavArr.forEach((item, i)=>{
            item.checked = false;
        })
      
        categoryNavArr[index].checked = true;
        navOption.categoryPname = item.pname;
        navOption.categoryId =  item.cid;
        this.setState({
            currentCategoryId: item.cid,
            categoryPname: item.pname,
            navOption: navOption,

            categoryNavArr: categoryNavArr
        }, function () {
            _this.getSpaceGoodListFn(_this.state.navOption)
        })
    }

    clearNavFn = ()=> {
        let navOption = {
            // spacePname: "",
            // spaceSid: "",  
            // spaceId: "",
            // categoryId:  "",
            // categoryPname: "",
            // styleId: "",
            // stylePname: "",

            // productLabel: "",
            // sort: "",
            // sortCriteria: "",
            // productClass: "",
            // keyword: "",




            categoryId: "",
            categoryPname: "",
            productLabel: "",
            sort: "",
            sortCriteria: "",
            spaceId: "",
            spacePname: "",
            spaceSid: "",

            productClass: "",
            styleId: "",


            stylePname: "",
            keyword: ""
        }
        let styleNavArr = this.state.styleNavArr;
        let currentSpaceId = this.state.spaceNavArr[0].cid;

        styleNavArr.forEach((item, index)=> {
        
            item.checked = false;
        })
        this.setState({
            navOption: navOption,
            currentSpaceId: currentSpaceId,

            styleNavArr: styleNavArr,
            
            styleIdSelectArr: [],
            styleNameSelectArr: []
        }, function () {
            this.getCategoryNavFn()

            this.getSpaceGoodListFn(this.state.navOption)
           
            
        })
    }
    clearSpaceFn = ()=> {
        let navOption =  {
            spacePname: "",
            spaceSid: "",  
            spaceId: "",
            categoryId:  "",
            categoryPname: "",
            styleId: "",
            stylePname: "",
            productLabel: "",
            sort: "",
            sortCriteria: "",
            productClass: "",
            keyword: ""
        }
        // console.log("spaceNavArr")
        // console.log(this.state.spaceNavArr)
        // console.log("spaceNavArr")
        let currentSpaceId = this.state.spaceNavArr[0].cid;
        this.setState({
            navOption: navOption,
            styleIdSelectArr: [],
            styleNameSelectArr: [],
            currentSpaceId: currentSpaceId
        }, function () {
            this.getCategoryNavFn()
            this.getSpaceGoodListFn(navOption)
        })
    }
    clearCategoryFn = ()=> {
        let navOption = this.state.navOption;
        navOption.categoryId = "";
        navOption.categoryPname = "";
        let categoryNavArr = this.state.categoryNavArr;
        categoryNavArr.forEach((item)=> {
            item.checked = false;
        })
        this.setState({
            navOption: navOption,
            categoryNavArr: categoryNavArr
        })
        this.getSpaceGoodListFn(navOption)
    }
    clearStyleFn = ()=> {
        let navOption = this.state.navOption;
        navOption.styleId = "";
        navOption.stylePname = "";
        this.setState({
            navOption: navOption
        })
        this.getSpaceGoodListFn(navOption)
    }
    categoryUlShowFn = ()=> {
        let categoryUlShowFlag = !this.state.categoryUlShowFlag;
        this.setState({
            categoryUlShowFlag: categoryUlShowFlag
        })
    }

    selectSortFn = (item, index)=> {
        
        
        
        let navOption = this.state.navOption;
        let _this = this;
        let sortArr = this.state.sortArr;
        if ( item.sort == "asc") {
        
            sortArr[index].sort = "desc";
        
        } else {
            sortArr[index].sort = "asc";
        }

        if (index == 0) {
            navOption.sortCriteria = "";
        }

        if (index == 1) {
            navOption.sortCriteria = "volume";
            navOption.sort =  sortArr[index].sort;
        }

        
        if (index == 2) {
            navOption.sortCriteria = "price";
            navOption.sort =  sortArr[index].sort;
        }

        
        this.setState({
            currentSortIndex: index,
            navOption: navOption,
            sortArr: sortArr
        }, function () {
            // console.log("this.state.currentSortIndex:" + this.state.currentSortIndex)
            // console.log("index:" + index)
            // console.log("sort:"+ item.sort)
            this.getSpaceGoodListFn(navOption)
        })    
    }
    selectFilterFn = (index)=>{
        let navOption = this.state.navOption;
        if (index == 0) {
            navOption.productLabel = "";
        }
        if (index == 1) {
            navOption.productLabel = 101;
        }
        if (index == 2) {
            navOption.productLabel = 102;
        }
        
        if (index == 3) {
            navOption.productLabel = 103;
        }
        this.setState({
            currentFilterIndex: index,
            navOption: navOption
        }, function () {
            this.getSpaceGoodListFn(navOption)
        })
    }
    changeLowPrice = (e)=> {
   
        let navOption = this.state.navOption;
        navOption.lowPrice = e.target.value;
        this.setState({
            navOption: navOption
        })
    }
    changeHeightPrice = (e)=> {
   
        let navOption = this.state.navOption;
        navOption.hightPrice = e.target.value;
        this.setState({
            navOption: navOption
        })
    }
    selectPriceFn = ()=> {
        console.log(this.state.navOption)
    }
    render () { 
        return (
            <div className="product_nav_con">
                <div className="breadcrumb_con">
                    <Breadcrumb  separator={<CaretRightOutlined />} className="breadcrumb">     
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
            
                        <Breadcrumb.Item><a href="">产品仓</a></Breadcrumb.Item>
                        <Breadcrumb.Item>共 {this.props.total} 款宝贝</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="select_nav_con">
                        {(this.state.navOption.spacePname || this.state.navOption.categoryPname || this.state.navOption.stylePname) &&  <div className="clear_all" onClick={this.clearNavFn}>清空 <DeleteOutlined /></div>}
                        {this.state.navOption.spacePname &&  <div className="select_nav_item" onClick={this.clearSpaceFn}>{this.state.navOption.spacePname} <CloseOutlined /></div>}
                     
                     
                        {this.state.navOption.categoryPname && <div className="select_nav_item" onClick={this.clearCategoryFn}>{this.state.navOption.categoryPname} <CloseOutlined /></div>}
                        {this.state.navOption.stylePname && <div className="select_nav_item" onClick={this.clearStyleFn}> {this.state.navOption.stylePname} <CloseOutlined /></div>}
                    </div>
                    {/* <div className="show_btn_a">收起筛选 <UpOutlined /></div> */}

                </div>
                <div className="good_nav">
                    {   !this.state.navOption.spacePname &&
                        <div className="nav_list_con">
                            <div className="title">空间</div>
                            <ul className="nav_list space_list"> 
                                {this.state.spaceNavArr.map((item, index)=> {
                                    return (<li key={item.cid} onClick={()=>{this.selectSpaceFn(item)}}> {item.pname}
                                        {/* sid{item.sid} =  cid -{item.cid} */}
                                    </li>)
                                })}
                            </ul>
                            {/* <div className="slect_more">+多选</div>
                                <div className="show_btn">收起 <DownOutlined /></div> */}
                        </div>
                    }

                    <div className="nav_list_con">
                        <div className="title">品类</div>
                        <ul className={this.state.categoryUlShowFlag?"nav_list category_ul_on": "nav_list"}>
                            {this.state.categoryNavArr.length>0 && this.state.categoryNavArr.map((item, index)=> {
                                return (<li className={item.checked?"category_item on": "category_item"} key={item.cid} onClick={()=>{this.selectCategoryNavFn(item, index)}} data-id= {item.cid}>{ item.pname }</li>)
                            })}
                        </ul>
 
                        {/*  <div className="slect_more">+多选</div> */}
                        {/* {this.state.categoryUlShowFlag && <div className="show_btn" onClick={this.categoryUlShowFn}>  展开 <DownOutlined /></div>} 

                        {!this.state.categoryUlShowFlag && <div className="show_btn" onClick={this.categoryUlShowFn}>收起 <UpOutlined /></div>}  */}
                 
                 
                        {this.state.categoryUlShowFlag && <div className={this.state.categoryUlShowFlag?"show_btn on":"show_btn"} onClick={this.categoryUlShowFn}>  展开 </div>} 
                        {!this.state.categoryUlShowFlag && <div className={this.state.categoryUlShowFlag?"show_btn on":"show_btn"} onClick={this.categoryUlShowFn}>收起 </div>} 
                    </div>

                    
                    {!this.state.navOption.stylePname &&
                        <div className= {this.state.styleHover?"nav_list_con":"nav_list_con on"}>
                            <div className="title">风格</div>
                            <ul className = "nav_list on">
                                {this.state.styleNavArr.map((item, index)=>{
                                    return ( this.state.styleHover? (<li key={index} onClick={()=>{this.selectStyleHoverFn(index)}} data-id={item.id}>{item.text} </li>) : 
                                                (<li onClick={()=>{this.selectStyleFn(index)}} key={index}>                                                
                                                    <div className = {item.checked?"select on": "select"}></div>
                                                    <span data-id={item.id}>{item.text}</span>
                                                </li>)
                                    )
                                })}
                                
                                {this.state.styleHover?
                                "":
                                    (<div className="btn_group">     
                                        <div className="btn cancel_btn" onClick={this.cancelStyleFn}>取消</div>
                                        <div className="btn sub_btn" onClick={this.submitStyleFn}>确定</div>
                                    </div>)
                                }       
                            </ul>

                            <div className="slect_more" onClick={this.styleSelectMoreFn}>+多选</div>
                            {/* <div className="show_btn">收起 <DownOutlined /></div> */}
                        </div>
                    }

                    {/* <div className="nav_list_con">
                        <div className="title">系列</div>
                        <ul className="nav_list">                        
                            <li> 全屋·柏林M1</li>
                        </ul>

                        <div className="slect_more">+多选</div>
                        <div className="show_btn">收起 <DownOutlined /></div>
                    </div> */}
                </div>

                <div className="sort_con">
                    
                    <div className="sort_list_con">
                        <div className="title sort_tit">排序</div>
                        <ul className="sort_list sort_ul">
                            { this.state.sortArr.map((item, index)=> {
                                return (<li className={this.state.currentSortIndex==index?"on":""} key={index} onClick={()=>{
                                    this.selectSortFn(item, index)
                                }}>
                                    
                                    {item.title} {index != 0 && item.sort=="asc"&&<ArrowUpOutlined/>} {(index != 0 && item.sort=="desc")&&<ArrowDownOutlined />}
                                </li>)
                            })}       
                        </ul>

                        {/* <div className="select_price_con">

                            <div className="price_con"><span className="unit">￥</span><Input className="price" placeholder="最低价" onChange={ this.changeLowPrice }/></div>
                            <div className="line">-</div>
                            <div className="price_con"><span className="unit">￥</span><Input  className="price" placeholder="最高价" onChange={this.changeHeightPrice}/></div>
                            <div className="sub_btn" onClick={this.selectPriceFn}>确定</div>
                        </div> */}
                    </div>
                    <div className="sort_list_con filter_ul">
                        <div className="title filter_tit">筛选</div>
                        
                 
                        <ul className="sort_list filter_sort">
                            {this.state.filterArr.map((item, index)=> {
                                return (<li className={this.state.currentFilterIndex == index?"on": ""} key={index} onClick={()=>{this.selectFilterFn(index)}}>{item.title}</li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default GoodNav;