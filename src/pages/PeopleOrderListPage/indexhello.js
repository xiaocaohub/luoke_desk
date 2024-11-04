import React from "react";
import {Link} from "react-router-dom";
import {Tabs, Table, Button, Pagination, message, Modal  } from "antd";

import "./index.css";  

import {setStorageFn, getStorageFn} from "../../utils/localStorage";
import request from "../../api/request";
import requestd from "../../api/requestd";
import Empty from "../../components/Empty";
import Header from "../../components/People/Header";
class PeopleOrderListPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

            currentNavIndex: 0,
            menuList: [
                {
                    id: 0,
                    title: "订单列表",
                    path: "/people_order_list"
                }
                // {
                //     id: 1,
                //     title: "定制订单",
                //     path: "/people/order/list"
                // }
            ],
            navIndex: 0,
            tableNavArr: [
                {
                   id: 0,
                   title: "全部",
                   status: ""
                },
                {
                  id: 1,
                  title: "待付款",
                  status: 1
                },
                {
                    id: 2,
                    title: "待确认",
                    status: 2
                },
                {
                  id: 3, 
                  title: "配货中",
                  status: 3
                },
                {
                  id: 4,
                  title: "已发货",
                  status: 4
                },
                {
                  id: 5,
                  title: "已完成",
                  status: 5
                },
                {
                   id: 6,
                   title: "已取消",
                   status: 0
                }
            ],
            orderArr: [],
            status: "", 
            currentPage: 1,
            pageSize: 10,
            orderTotalCount: 0
        } 
    }
    componentDidMount () {
        this.getOrderListFn()
    }
    selectNavFn = (index)=> {
        let navItem = this.state.tableNavArr[index];
        this.setState({
            currentNavIndex: index,
            status: navItem.status,
            currentPage: 1
        }, function () {
            this.getOrderListFn()
        })
    }
    goorderDetailFn = (item)=>{
        window.localStorage.href = "/people/order/detail"
    }
    getOrderListFn = ()=> {
        let _this = this;
        let formData = new FormData();
        let token = getStorageFn("token");
        formData.append("api", "app.orderV2.orderList");    
        formData.append("accessId", token);  
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("orderParentNo", ""); 
    
        formData.append("status",  this.state.status); 
        formData.append("pageSize", this.state.pageSize); 
        formData.append("pageNum", this.state.currentPage); 
        formData.append("startTime", ""); 
        formData.append("endTime", ""); 
        formData.append("keyWords", ""); 
        request({
            url: "/api/gw",         
            method: "POST",    
            data: formData
        }).then((res)=> {
            let resData = res.data.data;
            let resOrderArr = resData.records;
            let totalCount = resData.total;
            let orderArr = [];
            resOrderArr.forEach((item, index)=> {

                let orderItem = {
                      key: index,
                      nameList: {
                          order: item.orderParentNo,
                          prodcutNum: item.prodcutNum,
                          num: item.num
                      },
                      times: {
                          createTime: item.createTime,
                          expectedDeliveryTime: item.expectedDeliveryTime,
                          estimatedDeliveryTime: item.estimatedDeliveryTime,
                          realDeliveryTime: item.realDeliveryTime
                      },
                      userNumber: {
                          uname: item.userName,
                          phone: item.userTel
                      },
                      totalPrice: item.totalPrice,
                      oldTotalPrice: item.oldTotalPrice,
                      payPrice: item.payPrice,
                      customerInfo: {
                          uName: item.name,
                          phone: item.mobile, 
                          provice: item.provice,
                        
                          city: item.city,
                          area: item.area,
                          address: item.address
                      },
                      orderState:  item.status,
                      operateText: {

                          order: item.orderParentNo,
                          payBtn: "去付款",
                          orderDetail: "订单详情",
  
                          exportOrder: "导出订单",
                          buyRepeat: "再次购买",
                          cancelOrder: "取消订单"
                      }
                  }
                  orderArr.push(orderItem)
            })
            
            _this.setState({
                orderArr: orderArr,
                orderTotalCount: totalCount
            })
        })
    }

    cancelOrderFn = (rowData)=> { 
        let _this = this;
        let formData = new FormData();

        let token = getStorageFn("token");
        formData.append("api", "app.orderV2.cancelOrder");    
        formData.append("accessId", token);  
      
        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("orderParentNo", rowData.nameList.order);  
        Modal.confirm({
            content: "确认取消吗?",
            okText:"确认",
            cancelText: "取消",
            title: "温馨提示",
            centered: true,
            onOk: function () {
                request({
                    url: "/api/gw",
                    method: "POST",    
                    data: formData
                }).then((res)=> {
                    if (res.data.code == 200) {
                        message.success(res.data.message)
                        _this.getOrderListFn()
                    } else {
                        message.success(res.data.message)
                    }
                })
            }
        })
    }
    showCancelBrnFn = (status)=> {
        switch (status) {
            case 1: 
               return true;
               break;
            default:
                return false;
                break;
        }
    }
    showPayBtnFn = (status)=> {
        switch (status) {
            case 1: 
               return true;
               break;
            default:
                return false;
                break;
        }
    }
    exportOrderFn = (item)=> {

        let  orderParentNo = item.operateText.order;
        let _this = this;
        let formData = new FormData();
        let token = getStorageFn("token");
        formData.append("api", "app.orderV2.export");    

        formData.append("accessId", token);  


        formData.append("storeId", 1);
        formData.append("storeType", 6);
        formData.append("orderParentNo", orderParentNo); 
        formData.append("exportType", 1); 



        requestd({
            url: "/api/gw",
            method: "POST",
            data: formData,
            responseType: 'blob',
            headers: {
            //     'Content-disposition': "attachment; filename=数据报表.xlsx",
               
                 'Content-Type': "application/x-www-form-urlencoded"
            }
            // responseType:'blob'
        }).then((res)=> {
            
            console.log(res)
        })

    }
    render () {
        const columns = [
            {
              title: '订单编号',
              dataIndex: 'nameList',
              key: 'nameList',
              width: '15%',
              render: (item)=> {
                return (
                    <div>
                        <p>{item.order}</p>
                        <p>商品种数: {item.prodcutNum}</p>
                        <p>商品件数: {item.num}</p>
                    </div>    
                )
              }
            },
            {
              title: '时间管理',
              dataIndex: 'times',
              key: 'times',
              width: '20%',
              render: (item)=> {
                  return (
                    <div>
                        <p>下单时间: {item.createTime?item.createTime:"--"}</p>
                        <p>期望发货时间: {item.expectedDeliveryTime?item.expectedDeliveryTime:"--"}</p>
                        <p>预计发货时间: {item.estimatedDeliveryTime?item.estimatedDeliveryTime:"--"}</p>
                        <p>实际发货时间: {item.realDeliveryTime?item.realDeliveryTime:"--"}</p>
                    </div>
                  )  
              }
            },
            {
              title: '下单账号',
              dataIndex: 'userNumber',
              key: 'userNumber',
              width: '10%',
              render: (item)=> {
                   
                  return (
                      <div>
                         <p>{ item.uname }</p>
                         <p>{ item.phone }</p>
                      </div>
                  )
              }
            },
            {
                title: '销售总额',
                // dataIndex: 'totalPrice',
                // key: 'totalPrice',
                dataIndex: 'oldTotalPrice',
                key: 'oldTotalPrice',
                width: '8%',


                render: (item)=> {    
                    return (<p>￥{item}</p>)      
                }
            },
            {
              title: '应付总额',
              dataIndex: 'payPrice',
              key: 'payPrice',
              width: '8%',
              render: (item)=> {
                  return (<p>￥{item}</p>)
              }
            },
            {
              title: '客户信息',
              dataIndex: 'customerInfo',
              key: 'customerInfo',
              width: '20%',
              render: (item)=> {
                  return (
                      <div>
                          <p>{item.uName}</p>
                          <p>{item.phone}</p>
                          <p>{item.provice}{item.city}{item.area}{item.address}</p>
                      </div>
                  )
              }
            },     
            {
              title: '订单状态',
              dataIndex: 'orderState',
              key: 'orderState',
              width: '8%',
              render: (item)=> {
                  switch (item) {
                      case 0: 
                        return "已取消";
                        break;
                      case 1: 
                          return "待付款";
                          break;
                      case 2:
                          return "审核中";
                      case 3: 
                          return "配货中";
                          break;
                      case 4: 
        
                          return "已发货";
                          break;
                      case 5: 
                          return "已完成";
                          break;
                      case 6:
                          
                           return "已退款";
                           break;
                  }
              }
            },
            {

                title: '操作',
            //   dataIndex: 'operateText',
                key: 'operateText',
                width: '10%',

                render: (item)=> {

                    return (
                        <div className="operate_btn_group">
                           
                           
                            {this.showPayBtnFn(item.orderState) && <Link to="/pay" className="btn"> 去付款 </Link>} 
                            <div className="btn"><Link to={ "/people_order_detail?id=" + item.operateText.order }>订单详情</Link></div> 
                            <div className="btn" onClick={()=>{ this.exportOrderFn(item) }}>导出订单</div> 
                            {/* <div className="btn">再次购买</div> */}
                            
                            {this.showCancelBrnFn(item.orderState) && <div className="btn" onClick={()=>{this.cancelOrderFn(item)}}>取消订单 </div>}
                        
                        </div>
                    )
              }
            }
        ]
        
        const dataSource = [
            {
              key: '1',
              nameList: {
                 order: '202407030000422',
                 count: 20
              },
              times: {
                 time1: "2024-07-03",
                 time2: "2024-07-04"
              },
              userNumber: {
                 uname: "丁",
                 phone: "12345"
              },
              totalMoney: 1000,
              payTotalMoney: 1500,
              customerInfo: {
                  uName: "丁",
                  phone: "12345",   
                  address: "广东省深圳市龙岗区黄屋村"
              },
              orderState:  "已取消",
              operateText: {
                  payBtn: "去付款",
                  orderDetail: "订单详情",
                  exportOrder: "导出订单",

                  buyRepeat: "再次购买",
                  cancelOrder: "取消订单"
              }
            },
            {
                key: '2',
                nameList: {
                    order: '202407030000422',
                    count: 21
                },
                times: {
                    time1: "2024-07-03",
                    time2: "2024-07-04"
                },
                userNumber: {
                    uname: "黄",
                    phone: "12345"
                },
                totalMoney: 2000,
                payTotalMoney: 2100,
                customerInfo: {
                    uName: "丁",
                    phone: "12345",
                    address: "广东省深圳市龙岗区黄屋村"
                },
                orderState:  "已取消",
                operateText: {
                  payBtn: "去付款",

                  orderDetail: "订单详情",
                  exportOrder: "导出订单",
                  buyRepeat: "再次购买",
                  cancelOrder: "取消订单"
              }
            }
          ];
        return (

            <div className="people_order_list_con">
                <Header></Header>
                <div className="people_order_con">
                    <div className="left_content">
                        <div className="title"><span>订单管理</span></div>
                        

                        <ul className="menu_list">        
                            {this.state.menuList.map((item, index)=> {
                                return (<li className={this.state.navIndex==index?"on":""} key={index} onClick={()=>{this.selectNavFn(index)}}> <Link to={item.path}>{ item.title }</Link></li>) 
                            })}
                        </ul>
                    </div>

                    <div className="main_content">
                        <div className="people_order_list_page_con">
                
                <div className="table_con">
                                <ul className="nav_list">
                                    {this.state.tableNavArr.map((item, index)=> {
                                        return (<li className={this.state.currentNavIndex==index?"on": ""} key={index} onClick={()=>{this.selectNavFn(index)}}>{ item.title }</li>)
                                    })}
                                </ul>
                                {this.state.orderArr.length>0 && <Table    dataSource={this.state.orderArr} columns={columns} className="order_table" pagination={false}  />}
                                
                                {this.state.orderArr.length == 0 && <Empty></Empty>}
                                
                                {this.state.orderArr.length>0 && <div className="page_con">
                                    <Pagination defaultCurrent={1} total={this.state.orderTotalCount}  pageSize={this.state.pageSize} className="page"  onChange={(params, state) => {
                                                this.setState({
                                                    currentPage: params
                                                }, function () {
                                                    this.getOrderListFn(this.state.optionIds)
                                                })
                                            }}/>
                                </div> }
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

           
        )
    }
}


export default PeopleOrderListPage